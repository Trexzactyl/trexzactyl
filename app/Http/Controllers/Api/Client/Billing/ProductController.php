<?php

namespace Trexz\Http\Controllers\Api\Client\Billing;

use Trexz\Models\Billing\Product;
use Trexz\Models\Billing\Category;
use Trexz\Models\Billing\BillingException;
use Trexz\Transformers\Api\Client\ProductTransformer;
use Trexz\Http\Controllers\Api\Client\ClientApiController;

class ProductController extends ClientApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Returns all the products that have been configured.
     */
    public function index(int $id): array
    {
        $category = Category::findOrFail($id);
        $products = Product::where('category_uuid', $category->uuid)->get();

        if ($products->count() == 0) {
            BillingException::create([
                'title' => 'No products in category ' . $category->name . ' are visible',
                'exception_type' => BillingException::TYPE_STOREFRONT,
                'description' => 'Go to this category and create a visible product',
            ]);
        }

        return $this->fractal->collection($products)
            ->transformWith(ProductTransformer::class)
            ->toArray();
    }

    /**
     * View a specific product.
     */
    public function view(int $id)
    {
        $product = Product::findOrFail($id);

        return $this->fractal->item($product)
            ->transformWith(ProductTransformer::class)
            ->toArray();
    }
}
