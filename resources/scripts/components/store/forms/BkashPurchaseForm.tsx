import tw from 'twin.macro';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import useFlash from '@/plugins/useFlash';
import bkash, { BkashPurchaseResponse } from '@/api/store/gateways/bkash';
import bkashVerify from '@/api/store/gateways/bkashVerify';
import Select from '@/components/elements/Select';
import Field from '@/components/elements/Field';
import Label from '@/components/elements/Label';
import Input from '@/components/elements/Input';
import { Button } from '@/components/elements/button/index';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import FlashMessageRender from '@/components/FlashMessageRender';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import { useStoreState } from '@/state/hooks';

export default () => {
    const { clearAndAddHttpError, clearFlashes, addFlash } = useFlash();
    const [amount, setAmount] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [purchaseData, setPurchaseData] = useState<BkashPurchaseResponse | null>(null);
    const [trxId, setTrxId] = useState('');
    const [walletNumber, setWalletNumber] = useState('');
    const bkashGateway = useStoreState((state) => state.storefront.data?.gateways?.bkash);

    const initiatePurchase = () => {
        clearFlashes('store:bkash');
        setSubmitting(true);

        bkash(amount)
            .then((data) => {
                setPurchaseData(data);
                setSubmitting(false);
            })
            .catch((error) => {
                setSubmitting(false);
                clearAndAddHttpError({ key: 'store:bkash', error });
            });
    };

    const verifyPayment = () => {
        if (!purchaseData || !trxId) return;

        clearFlashes('store:bkash');
        setSubmitting(true);

        bkashVerify({
            transaction_id: purchaseData.transaction_id,
            bkash_transaction_id: trxId,
            wallet_number: walletNumber,
        })
            .then((response) => {
                setSubmitting(false);
                addFlash({
                    key: 'store:bkash',
                    type: 'success',
                    message: response.message,
                });
                setPurchaseData(null);
                setTrxId('');
            })
            .catch((error) => {
                setSubmitting(false);
                clearAndAddHttpError({ key: 'store:bkash', error });
            });
    };

    if (!bkashGateway?.enabled) return null;

    return (
        <TitledGreyBox title={'Purchase via bKash'}>
            <FlashMessageRender byKey={'store:bkash'} css={tw`mb-4`} />

            {!purchaseData ? (
                <Formik
                    onSubmit={initiatePurchase}
                    initialValues={{
                        amount: 100,
                    }}
                >
                    <Form>
                        <SpinnerOverlay size={'large'} visible={submitting} />
                        <Select
                            name={'amount'}
                            disabled={submitting}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                        >
                            <option key={'bkash:placeholder'} hidden>
                                Choose an amount...
                            </option>
                            <option key={'bkash:buy:100'} value={100}>
                                Purchase 100 credits
                            </option>
                            <option key={'bkash:buy:200'} value={200}>
                                Purchase 200 credits
                            </option>
                            <option key={'bkash:buy:500'} value={500}>
                                Purchase 500 credits
                            </option>
                            <option key={'bkash:buy:1000'} value={1000}>
                                Purchase 1000 credits
                            </option>
                        </Select>
                        <div css={tw`mt-6`}>
                            <Button type={'submit'} disabled={submitting}>
                                Initiate bKash Payment
                            </Button>
                        </div>
                    </Form>
                </Formik>
            ) : (
                <div css={tw`space-y-4`}>
                    <div css={tw`bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded p-4`}>
                        <p css={tw`text-sm text-blue-300 mb-2`}>
                            <strong>Amount:</strong> {purchaseData.amount} Credits
                        </p>
                        <p css={tw`text-sm text-blue-300 mb-2`}>
                            <strong>Cost:</strong> {purchaseData.cost_bdt} BDT
                        </p>
                        <p css={tw`text-sm text-blue-300`}>
                            <strong>bKash Number:</strong> {purchaseData.bkash_number}
                        </p>
                    </div>
                    <p css={tw`text-xs text-neutral-400`}>{purchaseData.message}</p>

                    <div css={tw`mt-4`}>
                        <Label>Your bKash Wallet Number</Label>
                        <Input
                            type={'text'}
                            value={walletNumber}
                            onChange={(e) => setWalletNumber(e.target.value)}
                            disabled={submitting}
                            placeholder={'01XXXXXXXXX'}
                        />
                    </div>

                    <div css={tw`mt-4`}>
                        <Label>bKash Transaction ID</Label>
                        <Input
                            type={'text'}
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value)}
                            disabled={submitting}
                        />
                    </div>

                    <div css={tw`flex gap-2 mt-4`}>
                        <Button onClick={verifyPayment} disabled={submitting || !trxId || !walletNumber}>
                            Submit for Verification
                        </Button>
                        <Button.Text onClick={() => setPurchaseData(null)} disabled={submitting}>
                            Cancel
                        </Button.Text>
                    </div>
                </div>
            )}
        </TitledGreyBox>
    );
};
