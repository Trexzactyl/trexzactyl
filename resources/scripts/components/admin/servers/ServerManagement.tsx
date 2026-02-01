import React, { useState, useEffect } from 'react';
import { 
    Card, 
    Table, 
    Button, 
    Space, 
    Tag, 
    Modal, 
    Form, 
    Input, 
    Select, 
    InputNumber,
    message, 
    Popconfirm,
    Alert,
    Tooltip,
    Progress,
    Descriptions
} from 'antd';
import { 
    HddOutlined, 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    ReloadOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    StopOutlined,
    UserOutlined,
    NodeIndexOutlined,
    DatabaseOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import getServers from '@/api/admin/servers/getServers';
import getServer from '@/api/admin/servers/getServer';
import createServer from '@/api/admin/servers/createServer';
import { updateDetails } from '@/api/admin/servers/updateServer';
import deleteServer from '@/api/admin/servers/deleteServer';
import toggleServerSuspension from '@/api/admin/servers/toggleServerSuspension';
import reinstallServer from '@/api/admin/servers/reinstallServer';
import { Server } from '@/api/server/getServer';

interface ServerFormData {
    name: string;
    description?: string;
    ownerId: number;
    nodeId: number;
    allocationId?: number;
    eggId: number;
    dockerImage?: string;
    startup: string;
    environment: Record<string, string>;
    limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    };
    featureLimits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    startOnCompletion: boolean;
}

const ServerManagement: React.FC = () => {
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [currentServer, setCurrentServer] = useState<Server | null>(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchQuery, setSearchQuery] = useState('');

    const [createForm] = Form.useForm<ServerFormData>();
    const [editForm] = Form.useForm<Partial<ServerFormData>>();

    const loadServers = async (page = 1, query?: string) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await getServers(page, query);
            setServers(response.data || []);
            setPagination({
                current: response.meta?.current_page || 1,
                pageSize: response.meta?.per_page || 10,
                total: response.meta?.total || 0,
            });
        } catch (err: any) {
            console.error('Servers loading error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to load servers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServers();
    }, []);

    const handleSearch = () => {
        loadServers(1, searchQuery);
    };

    const handleCreateServer = async (values: ServerFormData) => {
        setActionLoading(true);
        try {
            await createServer(values);
            message.success('Server created successfully');
            setCreateModalVisible(false);
            createForm.resetFields();
            loadServers(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to create server');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditServer = async (values: Partial<ServerFormData>) => {
        if (!currentServer) return;
        
        setActionLoading(true);
        try {
            await updateDetails(currentServer.id, values);
            message.success('Server updated successfully');
            setEditModalVisible(false);
            setCurrentServer(null);
            editForm.resetFields();
            loadServers(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to update server');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteServer = async (serverId: number) => {
        setActionLoading(true);
        try {
            await deleteServer(serverId);
            message.success('Server deleted successfully');
            loadServers(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to delete server');
        } finally {
            setActionLoading(false);
        }
    };

    const handleToggleSuspension = async (serverId: number, suspended: boolean) => {
        setActionLoading(true);
        try {
            await toggleServerSuspension(serverId);
            message.success(`Server ${suspended ? 'unsuspended' : 'suspended'} successfully`);
            loadServers(pagination.current);
        } catch (err: any) {
            message.error(`Failed to ${suspended ? 'unsuspend' : 'suspend'} server`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReinstallServer = async (serverId: number) => {
        setActionLoading(true);
        try {
            await reinstallServer(serverId);
            message.success('Server reinstall initiated');
            loadServers(pagination.current);
        } catch (err: any) {
            message.error('Failed to reinstall server');
        } finally {
            setActionLoading(false);
        }
    };

    const showEditModal = async (server: Server) => {
        try {
            const fullServer = await getServer(server.id);
            setCurrentServer(fullServer);
            editForm.setFieldsValue({
                name: fullServer.name,
                description: fullServer.description,
                ownerId: fullServer.user,
            });
            setEditModalVisible(true);
        } catch (err: any) {
            message.error('Failed to load server details');
        }
    };

    const showDetailModal = async (server: Server) => {
        try {
            const fullServer = await getServer(server.id);
            setCurrentServer(fullServer);
            setDetailModalVisible(true);
        } catch (err: any) {
            message.error('Failed to load server details');
        }
    };

    const getStatusTag = (status: string, suspended: boolean) => {
        if (suspended) {
            return <Tag color="orange" icon={<PauseCircleOutlined />}>SUSPENDED</Tag>;
        }
        
        switch (status?.toLowerCase()) {
            case 'running':
                return <Tag color="green" icon={<PlayCircleOutlined />}>RUNNING</Tag>;
            case 'offline':
                return <Tag color="red" icon={<StopOutlined />}>OFFLINE</Tag>;
            case 'starting':
                return <Tag color="blue" icon={<PlayCircleOutlined />}>STARTING</Tag>;
            case 'stopping':
                return <Tag color="orange" icon={<StopOutlined />}>STOPPING</Tag>;
            default:
                return <Tag color="default">{status?.toUpperCase() || 'UNKNOWN'}</Tag>;
        }
    };

    const getResourceUsage = (used: number, limit: number) => {
        const percentage = limit > 0 ? (used / limit) * 100 : 0;
        return (
            <Progress
                percent={Math.min(percentage, 100)}
                size="small"
                status={percentage > 90 ? 'exception' : percentage > 75 ? 'active' : 'success'}
                format={() => `${used}/${limit}`}
            />
        );
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (id: number) => <Tag color="blue">#{id}</Tag>,
        },
        {
            title: 'Server',
            key: 'server',
            width: 200,
            render: (_: any, record: Server) => (
                <Space direction="vertical" size="small">
                    <Space>
                        <HddOutlined />
                        <strong>{record.name}</strong>
                    </Space>
                    <Space>
                        <span style={{ color: '#8c8c8c', fontSize: '12px' }}>
                            {record.identifier}
                        </span>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Owner',
            dataIndex: 'user',
            key: 'user',
            width: 100,
            render: (userId: number) => (
                <Tag icon={<UserOutlined />} color="purple">
                    User {userId}
                </Tag>
            ),
        },
        {
            title: 'Node',
            dataIndex: 'node',
            key: 'node',
            width: 100,
            render: (nodeId: number) => (
                <Tag icon={<NodeIndexOutlined />} color="cyan">
                    Node {nodeId}
                </Tag>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 120,
            render: (_: any, record: Server) => getStatusTag(record.status, record.suspended),
        },
        {
            title: 'Resources',
            key: 'resources',
            width: 150,
            render: (_: any, record: Server) => (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>
                        <small>Memory:</small>
                        {getResourceUsage(0, record.limits.memory)} {/* Would need actual usage data */}
                    </div>
                    <div>
                        <small>Disk:</small>
                        {getResourceUsage(0, record.limits.disk)} {/* Would need actual usage data */}
                    </div>
                </Space>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (date: string) => (
                <Tooltip title={new Date(date).toLocaleString()}>
                    <Tag icon={<CalendarOutlined />} color="default">
                        {new Date(date).toLocaleDateString()}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 250,
            render: (_: any, record: Server) => (
                <Space size="small" wrap>
                    <Tooltip title="View Details">
                        <Button
                            size="small"
                            icon={<HddOutlined />}
                            onClick={() => showDetailModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Server">
                        <Button
                            type="primary"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title={record.suspended ? "Unsuspend" : "Suspend"}>
                        <Button
                            size="small"
                            icon={record.suspended ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                            onClick={() => handleToggleSuspension(record.id, record.suspended)}
                            style={{ 
                                color: record.suspended ? '#52c41a' : '#faad14',
                                borderColor: record.suspended ? '#52c41a' : '#faad14'
                            }}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Reinstall Server"
                        description="This will reinstall the server. All data will be lost!"
                        onConfirm={() => handleReinstallServer(record.id)}
                        okText="Reinstall"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Reinstall">
                            <Button
                                size="small"
                                icon={<ReloadOutlined />}
                                danger
                            />
                        </Tooltip>
                    </Popconfirm>
                    <Popconfirm
                        title="Delete Server"
                        description="Are you sure? This action cannot be undone!"
                        onConfirm={() => handleDeleteServer(record.id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Delete Server">
                            <Button
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    closable
                    onClose={() => setError(null)}
                    style={{ marginBottom: '16px' }}
                />
            )}

            <Card
                title={
                    <Space>
                        <HddOutlined />
                        Server Management
                    </Space>
                }
                extra={
                    <Space>
                        <Input.Search
                            placeholder="Search servers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSearch={handleSearch}
                            style={{ width: 200 }}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setCreateModalVisible(true)}
                        >
                            Create Server
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => loadServers(pagination.current, searchQuery)}
                            loading={loading}
                        >
                            Refresh
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={columns}
                    dataSource={servers}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} of ${total} servers`,
                        onChange: (page, pageSize) => {
                            setPagination({ ...pagination, current: page, pageSize });
                            loadServers(page, searchQuery);
                        },
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            {/* Server Detail Modal */}
            <Modal
                title={`Server Details - ${currentServer?.name}`}
                open={detailModalVisible}
                onCancel={() => {
                    setDetailModalVisible(false);
                    setCurrentServer(null);
                }}
                footer={[
                    <Button key="close" onClick={() => setDetailModalVisible(false)}>
                        Close
                    </Button>
                ]}
                width={800}
            >
                {currentServer && (
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Server ID">{currentServer.id}</Descriptions.Item>
                        <Descriptions.Item label="UUID">{currentServer.uuid}</Descriptions.Item>
                        <Descriptions.Item label="Name">{currentServer.name}</Descriptions.Item>
                        <Descriptions.Item label="Identifier">{currentServer.identifier}</Descriptions.Item>
                        <Descriptions.Item label="Description" span={2}>
                            {currentServer.description || 'No description'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Owner">User {currentServer.user}</Descriptions.Item>
                        <Descriptions.Item label="Node">Node {currentServer.node}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            {getStatusTag(currentServer.status, currentServer.suspended)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Allocation">{currentServer.allocation}</Descriptions.Item>
                        <Descriptions.Item label="Memory Limit">{currentServer.limits.memory} MB</Descriptions.Item>
                        <Descriptions.Item label="Disk Limit">{currentServer.limits.disk} MB</Descriptions.Item>
                        <Descriptions.Item label="CPU Limit">{currentServer.limits.cpu}%</Descriptions.Item>
                        <Descriptions.Item label="Swap Limit">{currentServer.limits.swap} MB</Descriptions.Item>
                        <Descriptions.Item label="Databases">{currentServer.featureLimits.databases}</Descriptions.Item>
                        <Descriptions.Item label="Backups">{currentServer.featureLimits.backups}</Descriptions.Item>
                        <Descriptions.Item label="Created">
                            {new Date(currentServer.createdAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated">
                            {new Date(currentServer.updatedAt).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Create/Edit modals would be quite complex for servers, so I'll create simplified versions */}
            <Modal
                title="Create Server"
                open={createModalVisible}
                onCancel={() => {
                    setCreateModalVisible(false);
                    createForm.resetFields();
                }}
                footer={null}
                width={800}
            >
                <Alert
                    message="Server Creation"
                    description="Server creation requires complex configuration. This is a simplified form. For full server creation, use the existing admin panel."
                    type="info"
                    style={{ marginBottom: '16px' }}
                />
                <Form
                    form={createForm}
                    layout="vertical"
                    onFinish={handleCreateServer}
                >
                    <Form.Item
                        name="name"
                        label="Server Name"
                        rules={[{ required: true, message: 'Please enter server name' }]}
                    >
                        <Input placeholder="My Server" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea placeholder="Server description" />
                    </Form.Item>

                    <Form.Item
                        name="ownerId"
                        label="Owner ID"
                        rules={[{ required: true, message: 'Please enter owner ID' }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="User ID" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setCreateModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={actionLoading}>
                                Create Server
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Server Modal */}
            <Modal
                title="Edit Server"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentServer(null);
                    editForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEditServer}
                >
                    <Form.Item
                        name="name"
                        label="Server Name"
                        rules={[{ required: true, message: 'Please enter server name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="ownerId"
                        label="Owner ID"
                        rules={[{ required: true, message: 'Please enter owner ID' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setEditModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={actionLoading}>
                                Update Server
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ServerManagement;