import { ReactNode } from 'react';
import PageContentBlock, { PageContentBlockProps } from '@/components/elements/PageContentBlock';

interface Props extends PageContentBlockProps {
    children?: ReactNode;
    title: string;
}

const ServerContentBlock: React.FC<Props> = ({ title, children, ...props }) => (
    <PageContentBlock title={title} {...props}>
        {children}
    </PageContentBlock>
);

export default ServerContentBlock;
