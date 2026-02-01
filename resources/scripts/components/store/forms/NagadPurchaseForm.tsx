import tw from 'twin.macro';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import useFlash from '@/plugins/useFlash';
import nagad, { NagadPurchaseResponse } from '@/api/store/gateways/nagad';
import nagadVerify from '@/api/store/gateways/nagadVerify';
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
    const [purchaseData, setPurchaseData] = useState<NagadPurchaseResponse | null>(null);
    const [trxId, setTrxId] = useState('');
    const [walletNumber, setWalletNumber] = useState('');
    const nagadGateway = useStoreState((state) => state.storefront.data?.gateways?.nagad);

    const initiatePurchase = () => {
        clearFlashes('store:nagad');
        setSubmitting(true);

        nagad(amount)
            .then((data) => {
                setPurchaseData(data);
                setSubmitting(false);
            })
            .catch((error) => {
                setSubmitting(false);
                clearAndAddHttpError({ key: 'store:nagad', error });
            });
    };

    const verifyPayment = () => {
        if (!purchaseData || !trxId) return;

        clearFlashes('store:nagad');
        setSubmitting(true);

        nagadVerify({
            transaction_id: purchaseData.transaction_id,
            nagad_transaction_id: trxId,
            wallet_number: walletNumber,
        })
            .then((response) => {
                setSubmitting(false);
                addFlash({
                    key: 'store:nagad',
                    type: 'success',
                    message: response.message,
                });
                setPurchaseData(null);
                setTrxId('');
            })
            .catch((error) => {
                setSubmitting(false);
                clearAndAddHttpError({ key: 'store:nagad', error });
            });
    };

    if (!nagadGateway?.enabled) return null;

    return (
        <TitledGreyBox title={'Purchase via Nagad'}>
            <FlashMessageRender byKey={'store:nagad'} css={tw`mb-4`} />

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
                            <option key={'nagad:placeholder'} hidden>
                                Choose an amount...
                            </option>
                            <option key={'nagad:buy:100'} value={100}>
                                Purchase 100 credits
                            </option>
                            <option key={'nagad:buy:200'} value={200}>
                                Purchase 200 credits
                            </option>
                            <option key={'nagad:buy:500'} value={500}>
                                Purchase 500 credits
                            </option>
                            <option key={'nagad:buy:1000'} value={1000}>
                                Purchase 1000 credits
                            </option>
                        </Select>
                        <div css={tw`mt-6`}>
                            <Button type={'submit'} disabled={submitting}>
                                Initiate Nagad Payment
                            </Button>
                        </div>
                    </Form>
                </Formik>
            ) : (
                <div css={tw`space-y-4`}>
                    <div css={tw`bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded p-4`}>
                        <p css={tw`text-sm text-green-300 mb-2`}>
                            <strong>Amount:</strong> {purchaseData.amount} Credits
                        </p>
                        <p css={tw`text-sm text-green-300 mb-2`}>
                            <strong>Cost:</strong> {purchaseData.cost_bdt} BDT
                        </p>
                        <p css={tw`text-sm text-green-300`}>
                            <strong>Nagad Number:</strong> {purchaseData.nagad_number}
                        </p>
                    </div>
                    <p css={tw`text-xs text-neutral-400`}>{purchaseData.message}</p>

                    <div css={tw`mt-4`}>
                        <Label>Your Nagad Wallet Number</Label>
                        <Input
                            type={'text'}
                            value={walletNumber}
                            onChange={(e) => setWalletNumber(e.target.value)}
                            disabled={submitting}
                            placeholder={'01XXXXXXXXX'}
                        />
                    </div>

                    <div css={tw`mt-4`}>
                        <Label>Nagad Transaction ID</Label>
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
