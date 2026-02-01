import React, { useState } from 'react';
import { Button, Card, Table, Tag, Space, Modal, Input, message, Tabs, Alert, Tooltip } from 'antd';
import { 
    CheckOutlined, 
    CloseOutlined, 
    ClockCircleOutlined, 
    ReloadOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    DollarOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { usePaymentManagement } from '@/hooks/admin/usePaymentManagement';
import type { AdminPayment, BkashTransaction, NagadTransaction } from '@/hooks/admin/usePaymentManagement';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { confirm } = Modal;

interface PaymentManagementProps {}

const PaymentManagement: React.FC<PaymentManagementProps> = () => {
    const {
        manualPayments,
        bkashTransactions,
        nagadTransactions,
        loading,
        actionLoading,
        error,
        clearError,
        loadData,
        approveManualPayment,
        rejectManualPayment,
        processManualPayment,
        approveBkash,
        rejectBkash,
        processBkash,
        approveNagad,
        rejectNagad,
        processNagad,
    } = usePaymentManagement();

    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [currentRejectItem, setCurrentRejectItem] = useState<{
        type: 'manual' | 'bkash' | 'nagad';
        id: number;
        amount: number;
        user?: string;
    } | null>(null);

    const showConfirm = (
        title: string,
        content: string,
        onOk: () => Promise<void>,
        type: 'approve' | 'process' = 'approve'
    ) => {
        confirm({
            title,
            content,
            icon: type === 'approve' ? <CheckOutlined /> : <ClockCircleOutlined />,
            okText: type === 'approve' ? 'Approve' : 'Process',
            okType: type === 'approve' ? 'primary' : 'default',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    await onOk();
                    message.success(`Payment ${type}d successfully`);
                } catch (error) {
                    message.error(`Failed to ${type} payment`);
                }
            },
        });
    };

    const showRejectModal = (
        type: 'manual' | 'bkash' | 'nagad', 
        id: number, 
        amount: number, 
        user?: string
    ) => {
        setCurrentRejectItem({ type, id, amount, user });
        setRejectModalVisible(true);
        setRejectReason('');
    };

    const handleReject = async () => {
        if (!currentRejectItem || !rejectReason.trim()) {
            message.error('Please provide a reason for rejection');
            return;
        }

        try {
            const { type, id } = currentRejectItem;
            switch (type) {
                case 'manual':
                    await rejectManualPayment(id, rejectReason);
                    break;
                case 'bkash':
                    await rejectBkash(id, rejectReason);
                    break;
                case 'nagad':
                    await rejectNagad(id, rejectReason);
                    break;
            }
            message.success('Payment rejected successfully');
            setRejectModalVisible(false);
            setCurrentRejectItem(null);
            setRejectReason('');
        } catch (error) {
            message.error('Failed to reject payment');
        }
    };

    const getStatusTag = (status: string) => {
        const statusConfig = {
            pending: { color: 'orange', icon: <ClockCircleOutlined /> },
            approved: { color: 'green', icon: <CheckOutlined /> },
            rejected: { color: 'red', icon: <CloseOutlined /> },
            processing: { color: 'blue', icon: <ClockCircleOutlined /> },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return (
            <Tag color={config.color} icon={config.icon}>
                {status.toUpperCase()}
            </Tag>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const formatCurrency = (amount: number, currency?: string) => {
        if (currency) {
            return `${amount} ${currency.toUpperCase()}`;
        }
        return `${amount} Credits`;
    };

    const manualPaymentColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (id: number) => <Tag color="blue">#{id}</Tag>,
        },
        {
            title: 'User',
            dataIndex: 'userId',
            key: 'userId',
            width: 100,
            render: (userId: number) => (
                <Tooltip title={`User ID: ${userId}`}>
                    <Tag icon={<UserOutlined />} color="purple">
                        {userId}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'creditAmount',
            key: 'creditAmount',
            width: 120,
            render: (amount: number) => (
                <Tag icon={<DollarOutlined />} color="green">
                    {amount} Credits
                </Tag>
            ),
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: 100,
            render: (currency: string) => (
                <Tag color="cyan">{currency.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
            key: 'transactionId',
            width: 150,
            render: (id: string) => (
                <Tooltip title={id}>
                    <code style={{ fontSize: '12px' }}>
                        {id.length > 15 ? `${id.substring(0, 15)}...` : id}
                    </code>
                </Tooltip>
            ),
        },
        {
            title: 'Sender',
            dataIndex: 'senderNumber',
            key: 'senderNumber',
            width: 120,
            render: (number: string) => <code>{number}</code>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date: string) => (
                <Tooltip title={formatDate(date)}>
                    <Tag icon={<CalendarOutlined />} color="default">
                        {new Date(date).toLocaleDateString()}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (_: any, record: AdminPayment) => (
                record.status === 'pending' ? (
                    <Space size="small">
                        <Button
                            type="primary"
                            size="small"
                            icon={<CheckOutlined />}
                            onClick={() => showConfirm(
                                'Approve Payment',
                                `Are you sure you want to approve ${record.creditAmount} credits for user ${record.userId}?`,
                                () => approveManualPayment(record.id)
                            )}
                            loading={actionLoading}
                        >
                            Approve
                        </Button>
                        <Button
                            size="small"
                            icon={<ClockCircleOutlined />}
                            onClick={() => showConfirm(
                                'Process Payment',
                                `Mark payment as processing for user ${record.userId}?`,
                                () => processManualPayment(record.id),
                                'process'
                            )}
                            loading={actionLoading}
                        >
                            Process
                        </Button>
                        <Button
                            danger
                            size="small"
                            icon={<CloseOutlined />}
                            onClick={() => showRejectModal('manual', record.id, record.creditAmount, `User ${record.userId}`)}
                            loading={actionLoading}
                        >
                            Reject
                        </Button>
                    </Space>
                ) : (
                    <Tag color="default">No actions available</Tag>
                )
            ),
        },
    ];

    const bkashColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (id: number) => <Tag color="green">#{id}</Tag>,
        },
        {
            title: 'User',
            dataIndex: 'user_id',
            key: 'user_id',
            width: 100,
            render: (userId: number) => (
                <Tag icon={<UserOutlined />} color="purple">
                    {userId}
                </Tag>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            render: (amount: number) => (
                <Tag icon={<DollarOutlined />} color="green">
                    {amount} Credits
                </Tag>
            ),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
            key: 'transaction_id',
            width: 150,
            render: (id: string) => id ? (
                <Tooltip title={id}>
                    <code style={{ fontSize: '12px' }}>
                        {id.length > 15 ? `${id.substring(0, 15)}...` : id}
                    </code>
                </Tooltip>
            ) : <Tag color="orange">Pending</Tag>,
        },
        {
            title: 'Client Number',
            dataIndex: 'client_number',
            key: 'client_number',
            width: 120,
            render: (number: string) => number ? <code>{number}</code> : <Tag color="default">N/A</Tag>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag,
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
            render: (date: string) => (
                <Tag icon={<CalendarOutlined />} color="default">
                    {new Date(date).toLocaleDateString()}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (_: any, record: BkashTransaction) => (
                record.status === 'pending' ? (
                    <Space size="small">
                        <Button
                            type="primary"
                            size="small"
                            icon={<CheckOutlined />}
                            onClick={() => showConfirm(
                                'Approve bKash Payment',
                                `Approve ${record.amount} credits for user ${record.user_id}?`,
                                () => approveBkash(record.id)
                            )}
                            loading={actionLoading}
                        >
                            Approve
                        </Button>
                        <Button
                            size="small"
                            icon={<ClockCircleOutlined />}
                            onClick={() => showConfirm(
                                'Process bKash Payment',
                                `Mark as processing for user ${record.user_id}?`,
                                () => processBkash(record.id),
                                'process'
                            )}
                            loading={actionLoading}
                        >
                            Process
                        </Button>
                        <Button
                            danger
                            size="small"
                            icon={<CloseOutlined />}
                            onClick={() => showRejectModal('bkash', record.id, record.amount, `User ${record.user_id}`)}
                            loading={actionLoading}
                        >
                            Reject
                        </Button>
                    </Space>
                ) : (
                    <Tag color="default">No actions available</Tag>
                )
            ),
        },
    ];

    const nagadColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (id: number) => <Tag color="red">#{id}</Tag>,
        },
        {
            title: 'User',
            dataIndex: 'user_id',
            key: 'user_id',
            width: 100,
            render: (userId: number) => (
                <Tag icon={<UserOutlined />} color="purple">
                    {userId}
                </Tag>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            render: (amount: number) => (
                <Tag icon={<DollarOutlined />} color="green">
                    {amount} Credits
                </Tag>
            ),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
            key: 'transaction_id',
            width: 150,
            render: (id: string) => id ? (
                <Tooltip title={id}>
                    <code style={{ fontSize: '12px' }}>
                        {id.length > 15 ? `${id.substring(0, 15)}...` : id}
                    </code>
                </Tooltip>
            ) : <Tag color="orange">Pending</Tag>,
        },
        {
            title: 'Client Number',
            dataIndex: 'client_number',
            key: 'client_number',
            width: 120,
            render: (number: string) => number ? <code>{number}</code> : <Tag color="default">N/A</Tag>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: getStatusTag,
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
            render: (date: string) => (
                <Tag icon={<CalendarOutlined />} color="default">
                    {new Date(date).toLocaleDateString()}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (_: any, record: NagadTransaction) => (
                record.status === 'pending' ? (
                    <Space size="small">
                        <Button
                            type="primary"
                            size="small"
                            icon={<CheckOutlined />}
                            onClick={() => showConfirm(
                                'Approve Nagad Payment',
                                `Approve ${record.amount} credits for user ${record.user_id}?`,
                                () => approveNagad(record.id)
                            )}
                            loading={actionLoading}
                        >
                            Approve
                        </Button>
                        <Button
                            size="small"
                            icon={<ClockCircleOutlined />}
                            onClick={() => showConfirm(
                                'Process Nagad Payment',
                                `Mark as processing for user ${record.user_id}?`,
                                () => processNagad(record.id),
                                'process'
                            )}
                            loading={actionLoading}
                        >
                            Process
                        </Button>
                        <Button
                            danger
                            size="small"
                            icon={<CloseOutlined />}
                            onClick={() => showRejectModal('nagad', record.id, record.amount, `User ${record.user_id}`)}
                            loading={actionLoading}
                        >
                            Reject
                        </Button>
                    </Space>
                ) : (
                    <Tag color="default">No actions available</Tag>
                )
            ),
        },
    ];

    const getPendingCount = (type: 'manual' | 'bkash' | 'nagad') => {
        switch (type) {
            case 'manual':
                return manualPayments.filter(p => p.status === 'pending').length;
            case 'bkash':
                return bkashTransactions.filter(t => t.status === 'pending').length;
            case 'nagad':
                return nagadTransactions.filter(t => t.status === 'pending').length;
            default:
                return 0;
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    closable
                    onClose={clearError}
                    style={{ marginBottom: '16px' }}
                />
            )}

            <Card 
                title={
                    <Space>
                        <DollarOutlined />
                        Payment Management
                    </Space>
                } 
                extra={
                    <Button 
                        onClick={loadData} 
                        loading={loading}
                        icon={<ReloadOutlined />}
                        type="primary"
                    >
                        Refresh
                    </Button>
                }
            >
                <Tabs defaultActiveKey="manual" type="card">
                    <TabPane 
                        tab={
                            <Space>
                                Manual Payments
                                {getPendingCount('manual') > 0 && (
                                    <Tag color="orange">{getPendingCount('manual')}</Tag>
                                )}
                            </Space>
                        } 
                        key="manual"
                    >
                        <Table
                            columns={manualPaymentColumns}
                            dataSource={manualPayments}
                            rowKey="id"
                            loading={loading}
                            pagination={{ 
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => 
                                    `${range[0]}-${range[1]} of ${total} payments`
                            }}
                            scroll={{ x: 1200 }}
                        />
                    </TabPane>
                    
                    <TabPane 
                        tab={
                            <Space>
                                bKash Payments
                                {getPendingCount('bkash') > 0 && (
                                    <Tag color="green">{getPendingCount('bkash')}</Tag>
                                )}
                            </Space>
                        } 
                        key="bkash"
                    >
                        <Table
                            columns={bkashColumns}
                            dataSource={bkashTransactions}
                            rowKey="id"
                            loading={loading}
                            pagination={{ 
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => 
                                    `${range[0]}-${range[1]} of ${total} transactions`
                            }}
                            scroll={{ x: 1200 }}
                        />
                    </TabPane>
                    
                    <TabPane 
                        tab={
                            <Space>
                                Nagad Payments
                                {getPendingCount('nagad') > 0 && (
                                    <Tag color="red">{getPendingCount('nagad')}</Tag>
                                )}
                            </Space>
                        } 
                        key="nagad"
                    >
                        <Table
                            columns={nagadColumns}
                            dataSource={nagadTransactions}
                            rowKey="id"
                            loading={loading}
                            pagination={{ 
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => 
                                    `${range[0]}-${range[1]} of ${total} transactions`
                            }}
                            scroll={{ x: 1200 }}
                        />
                    </TabPane>
                </Tabs>
            </Card>

            <Modal
                title={
                    <Space>
                        <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                        Reject Payment
                    </Space>
                }
                visible={rejectModalVisible}
                onOk={handleReject}
                onCancel={() => {
                    setRejectModalVisible(false);
                    setCurrentRejectItem(null);
                    setRejectReason('');
                }}
                okText="Reject Payment"
                okButtonProps={{ 
                    danger: true,
                    loading: actionLoading,
                    disabled: !rejectReason.trim()
                }}
                cancelButtonProps={{ disabled: actionLoading }}
                width={600}
            >
                {currentRejectItem && (
                    <div style={{ marginBottom: '16px' }}>
                        <Alert
                            message="Payment Rejection"
                            description={
                                <div>
                                    <p><strong>Payment ID:</strong> #{currentRejectItem.id}</p>
                                    <p><strong>Amount:</strong> {currentRejectItem.amount} Credits</p>
                                    <p><strong>User:</strong> {currentRejectItem.user}</p>
                                    <p><strong>Type:</strong> {currentRejectItem.type.toUpperCase()}</p>
                                </div>
                            }
                            type="warning"
                            showIcon
                        />
                    </div>
                )}
                
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Reason for rejection: <span style={{ color: '#ff4d4f' }}>*</span>
                    </label>
                    <TextArea
                        rows={4}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Please provide a detailed reason for rejecting this payment..."
                        maxLength={500}
                        showCount
                    />
                </div>
            </Modal>
        </div>
    );
};

export default PaymentManagement;