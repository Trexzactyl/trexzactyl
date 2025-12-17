<?php

namespace Trexz\Http\Controllers\Api\Client\Billing;

use Trexz\Models\Node;
use Stripe\StripeClient;
use Trexz\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Trexz\Models\Billing\Order;
use Illuminate\Http\JsonResponse;
use Trexz\Models\Billing\Product;
use Trexz\Exceptions\DisplayException;
use Trexz\Models\Billing\BillingException;
use Trexz\Services\Billing\CreateOrderService;
use Trexz\Services\Billing\CreateServerService;
use Trexz\Http\Controllers\Api\Client\ClientApiController;

class PaymentController extends ClientApiController
{
    private ?StripeClient $stripe = null;

    public function __construct(
        private CreateOrderService $orderService,
        private CreateServerService $serverCreation,
    ) {
        parent::__construct();
    }

    /**
     * Get or initialize the Stripe client.
     */
    private function getStripeClient(): StripeClient
    {
        if ($this->stripe === null) {
            $secret = config('modules.billing.keys.secret');
            if (empty($secret)) {
                throw new DisplayException('Stripe API key is not configured.');
            }
            $this->stripe = new StripeClient($secret);
        }

        return $this->stripe;
    }

    /**
     * Send the Stripe public key to the frontend.
     */
    public function publicKey(Request $request, int $id): JsonResponse
    {
        $publicKey = (string) config('modules.billing.keys.publishable') ?? null;

        if (!$publicKey) {
            BillingException::create([
                'exception_type' => BillingException::TYPE_STOREFRONT,
                'title' => 'The Stripe Public API key is missing',
                'description' => 'Add the Stripe \'publishable\' key to your billing panel',
            ]);
        }

        return response()->json(['key' => $publicKey]);
    }

    /**
     * Create a Stripe payment intent.
     */
    public function intent(Request $request, int $id): JsonResponse
    {
        $paymentMethodTypes = ['card'];
        $product = Product::findOrFail($id);

        if (config('modules.billing.paypal')) {
            $paymentMethodTypes[] = 'paypal';
        }

        if (config('modules.billing.link')) {
            $paymentMethodTypes[] = 'link';
        }

        $paymentIntent = $this->getStripeClient()->paymentIntents->create([
            'amount' => $product->price * 100,
            'currency' => strtolower(config('modules.billing.currency.code')),
            'payment_method_types' => array_values($paymentMethodTypes),
            'capture_method' => 'manual',
        ]);

        if (!$paymentIntent->client_secret) {
            BillingException::create([
                'exception_type' => BillingException::TYPE_STOREFRONT,
                'title' => 'The PaymentIntent client secret was not generated',
                'description' => 'Double check your billing API keys and Stripe Dashboard',
            ]);
        }

        return response()->json([
            'id' => $paymentIntent->id,
            'secret' => $paymentIntent->client_secret,
        ]);
    }

    /**
     * Update a Payment Intent with new data from the UI.
     */
    public function updateIntent(Request $request, ?int $id = null): Response
    {
        $product = Product::findOrFail($id);
        $intent = $this->getStripeClient()->paymentIntents->retrieve($request->input('intent'));

        if (!config('modules.billing.enabled')) {
            throw new DisplayException('The billing module is not enabled.');
        }

        if (!Node::findOrFail($request->input('node_id'))->deployable) {
            throw new DisplayException('Paid servers cannot be deployed to this node.');
        }

        if (!$intent) {
            BillingException::create([
                'exception_type' => BillingException::TYPE_STOREFRONT,
                'title' => 'The PaymentIntent requested does not exist',
                'description' => 'Check Stripe Dashboard and ask in the Trexz Discord for support',
            ]);
        }

        $metadata = [
            'customer_email' => $request->user()->email,
            'customer_name' => $request->user()->username,
            'product_id' => (string) $id,
            'node_id' => (string) ($request->input('node_id') ?? ''),
            'server_id' => (string) ($request->input('server_id') ?? 0),
        ];

        $variables = $request->input('variables') ?? [];
        $metadata['variables'] = !empty($variables) ? json_encode($variables) : '';

        $intent->metadata = $metadata;
        $intent->save();

        // Create the order
        $this->orderService->create(
            $intent->id,
            $request->user(),
            $product,
            Order::STATUS_PENDING,
            $this->getOrderType($request),
        );

        return $this->returnNoContent();
    }

    /**
     * Process a successful subscription purchase.
     */
    public function process(Request $request): Response
    {
        $order = Order::where('user_id', $request->user()->id)->latest()->first();
        $intent = $this->getStripeClient()->paymentIntents->retrieve($request->input('intent'));

        if (!config('modules.billing.enabled')) {
            if (!$intent) {
                throw new DisplayException('Unable to fetch payment intent from Stripe.');
                BillingException::create([
                    'order_id' => $order->id,
                    'exception_type' => BillingException::TYPE_DEPLOYMENT,
                    'title' => 'Unable to fetch PaymentIntent while processing order',
                    'description' => 'Check Stripe Dashboard and ask in the Trexz Discord for support',
                ]);
            }
        }

        // Check if order has already been processed
        if (
            $order->status === Order::STATUS_PROCESSED
            && $intent->id === $order->payment_intent_id
        ) {
            throw new DisplayException('This order has already been processed.');
        }

        // If the payment wasn't successful, mark the order as failed
        if ($intent->status !== 'requires_capture') {
            $order->update(['status' => Order::STATUS_FAILED]);
            throw new DisplayException('The order has been canceled.');
        }

        // Process the renewal or product purchase
        if ($order->type === Order::TYPE_REN && ((int) $intent->metadata->server_id != 0)) {
            $server = Server::findOrFail((int) $intent->metadata->server_id);

            $server->update([
                'renewal_date' => $server->renewal_date->addDays(30)->toDateTimeString(),
                'status' => $server->isSuspended() ? null : $server->status,
            ]);
        } else {
            $product = Product::findOrFail($intent->metadata->product_id);

            $metadata = $intent->metadata;
            if (!empty($metadata->variables)) {
                $metadata->variables = json_decode($metadata->variables, true) ?? [];
            }

            $server = $this->serverCreation->process($request, $product, $metadata, $order);
        }

        // Capture the payment after processing the order
        if ($intent->status === 'requires_capture') {
            try {
                $intent->capture(); // Capture the payment now that the order is processed
            } catch (DisplayException $ex) {
                $server->delete();

                BillingException::create([
                    'order_id' => $order->id,
                    'exception_type' => BillingException::TYPE_PAYMENT,
                    'title' => 'Failed to capture payment via Stripe',
                    'description' => 'Check Stripe Dashboard and ask in the Trexz Discord for support',
                ]);

                throw new DisplayException('Unable to capture payment for this order.');
            }
        }

        // Mark the order as processed
        $order->update(['status' => Order::STATUS_PROCESSED, 'name' => $order->name]);

        return $this->returnNoContent();
    }

    /**
     * Determine whether an order is a NEW, UPGRADE or RENEWAL.
     */
    private function getOrderType(Request $request): mixed
    {
        $type = null;

        if ($request->has('renewal') && $request->boolean('renewal')) {
            $type = Order::TYPE_REN;
        } else {
            $type = Order::TYPE_NEW;
        }

        return $type;
    }
}
