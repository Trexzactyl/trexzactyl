import { Trans, useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface Props {
    ns?: string | string[];
    children?: ReactNode;
    [key: string]: any;
}

export default ({ ns, children, ...props }: Props) => {
    const { t } = useTranslation(ns);

    return (
        <Trans t={t} {...props}>
            {children}
        </Trans>
    );
};
