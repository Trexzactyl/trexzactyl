import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Application, Actions } from '@/api/admin/getOverview';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Spinner from '@/components/elements/Spinner';
import FlashMessageRender from '@/components/FlashMessageRender';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import Field from '@/components/elements/Field';
import SaveButton from '@/components/elements/SaveButton';
import Switch from '@/components/elements/Switch';
import getRegistrationSettings from '@/api/admin/registration/getRegistrationSettings';
import updateRegistrationSettings, { RegistrationSettings } from '@/api/admin/registration/updateRegistrationSettings';
import useFlash from '@/plugins/useFlash';
import tw from 'twin.macro';

export default () => {
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const [settings, setSettings] = React.useState<RegistrationSettings>();

    useEffect(() => {
        clearFlashes('registration');
        getRegistrationSettings().then((data) => setSettings(data));
    }, []);

    if (!settings) return <Spinner centered size={'large'} />;

    const submit = (values: RegistrationSettings, { setSubmitting }: any) => {
        clearFlashes('registration');

        updateRegistrationSettings(values)
            .then(() => {
                setSubmitting(false);
            })
            .catch((error) => {
                setSubmitting(false);
                clearAndAddHttpError({ key: 'registration', error });
            });
    };

    return (
        <div css={tw`mb-10`}>
            <FlashMessageRender byKey={'registration'} css={tw`mb-4`} />

            <Formik
                onSubmit={submit}
                initialValues={{
                    enabled: settings.enabled,
                    verification: settings.verification,
                    discord_enabled: settings.discord_enabled,
                    discord_id: settings.discord_id,
                    discord_secret: settings.discord_secret,
                    cpu: settings.cpu,
                    memory: settings.memory,
                    disk: settings.disk,
                    slot: settings.slot,
                    port: settings.port,
                    backup: settings.backup,
                    database: settings.database,
                }}
            >
                {({ isSubmitting, isValid, values }) => (
                    <Form>
                        <div css={tw`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6`}>
                            <TitledGreyBox title={'Email Registration'} css={tw`mb-0`}>
                                <div css={tw`flex items-center justify-between mb-4`}>
                                    <div>
                                        <label css={tw`font-bold text-neutral-200`}>Enable Registration</label>
                                        <p css={tw`text-sm text-neutral-400`}>Allow new users to register via email.</p>
                                    </div>
                                    <Switch
                                        name={'enabled'}
                                        defaultChecked={values.enabled}
                                    />
                                </div>

                                <div css={tw`flex items-center justify-between`}>
                                    <div>
                                        <label css={tw`font-bold text-neutral-200`}>Email Verification</label>
                                        <p css={tw`text-sm text-neutral-400`}>Require email verification before account activation.</p>
                                    </div>
                                    <Switch
                                        name={'verification'}
                                        defaultChecked={values.verification}
                                    />
                                </div>
                            </TitledGreyBox>

                            <TitledGreyBox title={'Discord Integration'} css={tw`mb-0`}>
                                <div css={tw`flex items-center justify-between mb-6`}>
                                    <div>
                                        <label css={tw`font-bold text-neutral-200`}>Enable Discord</label>
                                        <p css={tw`text-sm text-neutral-400`}>Allow login and registration via Discord.</p>
                                    </div>
                                    <Switch
                                        name={'discord_enabled'}
                                        defaultChecked={values.discord_enabled}
                                    />
                                </div>

                                <div css={tw`grid grid-cols-1 gap-4`}>
                                    <Field
                                        name={'discord_id'}
                                        label={'Client ID'}
                                        description={'Your Discord OAuth Application Client ID.'}
                                    />
                                    <Field
                                        name={'discord_secret'}
                                        label={'Client Secret'}
                                        type={'password'}
                                        description={'Your Discord OAuth Application Client Secret.'}
                                    />
                                </div>
                            </TitledGreyBox>
                        </div>

                        <TitledGreyBox title={'Default Resources'} css={tw`mb-6`}>
                            <div css={tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                                <Field name={'cpu'} label={'CPU (%)'} type={'number'} />
                                <Field name={'memory'} label={'Memory (MB)'} type={'number'} />
                                <Field name={'disk'} label={'Disk (MB)'} type={'number'} />
                                <Field name={'slot'} label={'Slots'} type={'number'} />
                                <Field name={'port'} label={'Ports'} type={'number'} />
                                <Field name={'backup'} label={'Backups'} type={'number'} />
                                <Field name={'database'} label={'Databases'} type={'number'} />
                            </div>
                        </TitledGreyBox>

                        <div css={tw`flex justify-end`}>
                            <SaveButton type={'submit'} disabled={isSubmitting || !isValid} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
