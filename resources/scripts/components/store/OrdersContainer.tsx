import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import useFlash from '@/plugins/useFlash';
import PageContentBlock from '@/components/elements/PageContentBlock';
import FlashMessageRender from '@/components/FlashMessageRender';
import Spinner from '@/components/elements/Spinner';
import getOrders, { Order } from '@/api/store/getOrders';
import { format } from 'date-fns';
import TitledGreyBox from '@/components/elements/TitledGreyBox';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return '#f59e0b'; // Amber
        case 'processing':
            return '#3b82f6'; // Blue
        case 'approved':
        case 'completed':
            return '#10b981'; // Green
        case 'rejected':
            return '#ef4444'; // Red
        default:
            return '#6b7280'; // Gray
    }
};

export default () => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { clearAndAddHttpError } = useFlash();

    useEffect(() => {
        getOrders()
            .then((data) => setOrders(data))
            .catch((error) => clearAndAddHttpError({ error }))
            .then(() => setLoading(false));
    }, []);

    if (!orders && loading) {
        return <Spinner size={'large'} centered />;
    }

    return (
        <PageContentBlock title={'My Orders'}>
            <FlashMessageRender />
            <div css={tw`flex flex-col gap-4`}>
                {!orders || orders.length === 0 ? (
                    <TitledGreyBox title={'Order History'} css={tw`text-center p-8`}>
                        <p css={tw`text-neutral-400`}>No orders found.</p>
                    </TitledGreyBox>
                ) : (
                    <div css={tw`overflow-x-auto rounded-lg border border-neutral-700`}>
                        <table css={tw`w-full text-left`}>
                            <thead css={tw`bg-neutral-900 font-semibold text-neutral-200`}>
                                <tr>
                                    <th css={tw`p-4`}>ID</th>
                                    <th css={tw`p-4`}>Gateway</th>
                                    <th css={tw`p-4`}>Amount</th>
                                    <th css={tw`p-4`}>Status</th>
                                    <th css={tw`p-4`}>Date</th>
                                    <th css={tw`p-4`}>Details</th>
                                </tr>
                            </thead>
                            <tbody css={tw`divide-y divide-neutral-800`}>
                                {orders.map((order) => (
                                    <tr key={`${order.gateway}-${order.id}`} css={tw`hover:bg-neutral-800 bg-neutral-800/50 transition-colors`}>
                                        <td css={tw`p-4 font-mono text-sm`}>#{order.id}</td>
                                        <td css={tw`p-4`}>{order.gateway}</td>
                                        <td css={tw`p-4 font-bold`}>{order.amount_display}</td>
                                        <td css={tw`p-4`}>
                                            <span css={tw`px-2 py-1 text-xs font-bold text-white rounded`} style={{ backgroundColor: getStatusColor(order.status) }}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td css={tw`p-4 text-neutral-300`}>
                                            {format(new Date(order.created_at), 'MMM do, yyyy h:mm a')}
                                        </td>
                                        <td css={tw`p-4 max-w-xs`}>
                                            {order.status === 'rejected' && order.rejection_reason && (
                                                <div css={tw`text-red-400 text-sm`}>
                                                    <span css={tw`font-semibold`}>Reason:</span> {order.rejection_reason}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </PageContentBlock>
    );
};
