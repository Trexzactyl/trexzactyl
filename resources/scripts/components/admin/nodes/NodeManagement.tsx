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
    Descriptions,
    Switch
} from 'antd';
import { 
    NodeIndexOutlined, 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    ReloadOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    ToolOutlined,
    GlobalOutlined,
    DatabaseOutlined,
    CalendarOutlined,
    SettingOutlined
} from '@ant-design/icons';
import getNodes from '@/api/admin/nodes/getNodes';
import getNode from '@/api/admin/nodes/getNode';
import createNode from '@/api/admin/nodes/createNode';
import updateNode from '@/api/admin/nodes/updateNode';
import deleteNode from '@/api/admin/nodes/deleteNode';
import type { AdminNode } from '@/api/admin/nodes/getNodes';

interface NodeFormData {
    name: string;
    locationId: number;
    fqdn: string;
    scheme: 'http' | 'https';
    memory: number;
    memoryOverallocate: number;
    disk: number;
    diskOverallocate: number;
    uploadSize: number;
    daemonSftp: number;
    daemonListen: number;
}

const NodeManagement: React.FC = () => {
    const [nodes, setNodes] = useState<AdminNode[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [currentNode, setCurrentNode] = useState<AdminNode | null>(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const [createForm] = Form.useForm<NodeFormData>();
    const [editForm] = Form.useForm<Partial<NodeFormData>>();

    const loadNodes = async (page = 1) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await getNodes(page);
            setNodes(response.data || []);
            setPagination({
                current: response.meta?.current_page || 1,
                pageSize: response.meta?.per_page || 10,
                total: response.meta?.total || 0,
            });
        } catch (err: any) {
            console.error('Nodes loading error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to load nodes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNodes();
    }, []);

    const handleCreateNode = async (values: NodeFormData) => {
        setActionLoading(true);
        try {
            await createNode(values);
            message.success('Node created successfully');
            setCreateModalVisible(false);
            createForm.resetFields();
            loadNodes(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to create node');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditNode = async (values: Partial<NodeFormData>) => {
        if (!currentNode) return;
        
        setActionLoading(true);
        try {
            await updateNode(currentNode.id, values);
            message.success('Node updated successfully');
            setEditModalVisible(false);
            setCurrentNode(null);
            editForm.resetFields();
            loadNodes(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to update node');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteNode = async (nodeId: number) => {
        setActionLoading(true);
        try {
            await deleteNode(nodeId);
            message.success('Node deleted successfully');
            loadNodes(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to delete node');
        } finally {
            setActionLoading(false);
        }
    };

    const showEditModal = async (node: AdminNode) => {
        try {
            const fullNode = await getNode(node.id);
            setCurrentNode(fullNode);
            editForm.setFieldsValue({
                name: fullNode.name,
                fqdn: fullNode.fqdn,
                scheme: fullNode.scheme as 'http' | 'https',
                memory: fullNode.memory,
                memoryOverallocate: fullNode.memoryOverallocate,
                disk: fullNode.disk,
                diskOverallocate: fullNode.diskOverallocate,
                uploadSize: fullNode.uploadSize,
                daemonSftp: fullNode.daemonSftp,
                daemonListen: fullNode.daemonListen,
            });
            setEditModalVisible(true);
        } catch (err: any) {
            message.error('Failed to load node details');
        }
    };

    const showDetailModal = async (node: AdminNode) => {
        try {
            const fullNode = await getNode(node.id);
            setCurrentNode(fullNode);
            setDetailModalVisible(true);
        } catch (err: any) {
            message.error('Failed to load node details');
        }
    };

    const getStatusTag = (maintenanceMode: boolean, public_: boolean) => {
        if (maintenanceMode) {
            return <Tag color="orange" icon={<ToolOutlined />}>MAINTENANCE</Tag>;
        }
        return <Tag color="green" icon={<CheckCircleOutlined />}>ONLINE</Tag>;
    };

    const getVisibilityTag = (public_: boolean) => {
        return public_ ? 
            <Tag color="blue" icon={<GlobalOutlined />}>PUBLIC</Tag> :
            <Tag color="default">PRIVATE</Tag>;
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getOverallocationColor = (percentage: number) => {
        if (percentage > 100) return '#ff4d4f';
        if (percentage > 80) return '#faad14';
        return '#52c41a';
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
            title: 'Node',
            key: 'node',
            width: 200,
            render: (_: any, record: AdminNode) => (
                <Space direction="vertical" size="small">
                    <Space>
                        <NodeIndexOutlined />
                        <strong>{record.name}</strong>
                    </Space>
                    <Space>
                        <span style={{ color: '#8c8c8c', fontSize: '12px' }}>
                            {record.fqdn}
                        </span>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 120,
            render: (_: any, record: AdminNode) => (
                <Space direction="vertical" size="small">
                    {getStatusTag(record.maintenanceMode, record.public)}
                    {getVisibilityTag(record.public)}
                </Space>
            ),
        },
        {
            title: 'Resources',
            key: 'resources',
            width: 200,
            render: (_: any, record: AdminNode) => (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>
                        <small>Memory: {formatBytes(record.memory * 1024 * 1024)}</small>
                        <Progress
                            percent={record.memoryOverallocate}
                            size="small"
                            strokeColor={getOverallocationColor(record.memoryOverallocate)}
                            format={() => `${record.memoryOverallocate}%`}
                        />
                    </div>
                    <div>
                        <small>Disk: {formatBytes(record.disk * 1024 * 1024)}</small>
                        <Progress
                            percent={record.diskOverallocate}
                            size="small"
                            strokeColor={getOverallocationColor(record.diskOverallocate)}
                            format={() => `${record.diskOverallocate}%`}
                        />
                    </div>
                </Space>
            ),
        },
        {
            title: 'Daemon',
            key: 'daemon',
            width: 120,
            render: (_: any, record: AdminNode) => (
                <Space direction="vertical" size="small">
                    <Tag color="cyan">Listen: {record.daemonListen}</Tag>
                    <Tag color="purple">SFTP: {record.daemonSftp}</Tag>
                </Space>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (date: Date) => (
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
            width: 200,
            render: (_: any, record: AdminNode) => (
                <Space size="small" wrap>
                    <Tooltip title="View Details">
                        <Button
                            size="small"
                            icon={<NodeIndexOutlined />}
                            onClick={() => showDetailModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Node">
                        <Button
                            type="primary"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Configuration">
                        <Button
                            size="small"
                            icon={<SettingOutlined />}
                            onClick={() => message.info('Configuration panel would open here')}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Delete Node"
                        description="Are you sure? This will affect all servers on this node!"
                        onConfirm={() => handleDeleteNode(record.id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Delete Node">
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
                        <NodeIndexOutlined />
                        Node Management
                    </Space>
                }
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setCreateModalVisible(true)}
                        >
                            Create Node
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => loadNodes(pagination.current)}
                            loading={loading}
                        >
                            Refresh
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={columns}
                    dataSource={nodes}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} of ${total} nodes`,
                        onChange: (page, pageSize) => {
                            setPagination({ ...pagination, current: page, pageSize });
                            loadNodes(page);
                        },
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* Node Detail Modal */}
            <Modal
                title={`Node Details - ${currentNode?.name}`}
                open={detailModalVisible}
                onCancel={() => {
                    setDetailModalVisible(false);
                    setCurrentNode(null);
                }}
                footer={[
                    <Button key="close" onClick={() => setDetailModalVisible(false)}>
                        Close
                    </Button>
                ]}
                width={800}
            >
                {currentNode && (
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Node ID">{currentNode.id}</Descriptions.Item>
                        <Descriptions.Item label="Name">{currentNode.name}</Descriptions.Item>
                        <Descriptions.Item label="FQDN">{currentNode.fqdn}</Descriptions.Item>
                        <Descriptions.Item label="Scheme">{currentNode.scheme.toUpperCase()}</Descriptions.Item>
                        <Descriptions.Item label="Public">
                            {getVisibilityTag(currentNode.public)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Maintenance">
                            {currentNode.maintenanceMode ? 
                                <Tag color="orange">Enabled</Tag> : 
                                <Tag color="green">Disabled</Tag>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Behind Proxy">
                            {currentNode.behindProxy ? 
                                <Tag color="blue">Yes</Tag> : 
                                <Tag color="default">No</Tag>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Start on Completion">
                            {currentNode.startOnCompletion ? 
                                <Tag color="green">Yes</Tag> : 
                                <Tag color="default">No</Tag>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Memory">{formatBytes(currentNode.memory * 1024 * 1024)}</Descriptions.Item>
                        <Descriptions.Item label="Memory Overallocate">{currentNode.memoryOverallocate}%</Descriptions.Item>
                        <Descriptions.Item label="Disk">{formatBytes(currentNode.disk * 1024 * 1024)}</Descriptions.Item>
                        <Descriptions.Item label="Disk Overallocate">{currentNode.diskOverallocate}%</Descriptions.Item>
                        <Descriptions.Item label="Upload Size">{formatBytes(currentNode.uploadSize * 1024 * 1024)}</Descriptions.Item>
                        <Descriptions.Item label="Daemon Listen Port">{currentNode.daemonListen}</Descriptions.Item>
                        <Descriptions.Item label="Daemon SFTP Port">{currentNode.daemonSftp}</Descriptions.Item>
                        <Descriptions.Item label="Created">
                            {new Date(currentNode.createdAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated">
                            {new Date(currentNode.updatedAt).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Create Node Modal */}
            <Modal
                title="Create New Node"
                open={createModalVisible}
                onCancel={() => {
                    setCreateModalVisible(false);
                    createForm.resetFields();
                }}
                footer={null}
                width={800}
            >
                <Form
                    form={createForm}
                    layout="vertical"
                    onFinish={handleCreateNode}
                >
                    <Form.Item
                        name="name"
                        label="Node Name"
                        rules={[{ required: true, message: 'Please enter node name' }]}
                    >
                        <Input placeholder="Node 1" />
                    </Form.Item>

                    <Form.Item
                        name="locationId"
                        label="Location ID"
                        rules={[{ required: true, message: 'Please enter location ID' }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="1" />
                    </Form.Item>

                    <Form.Item
                        name="fqdn"
                        label="FQDN"
                        rules={[{ required: true, message: 'Please enter FQDN' }]}
                    >
                        <Input placeholder="node1.example.com" />
                    </Form.Item>

                    <Form.Item
                        name="scheme"
                        label="Scheme"
                        rules={[{ required: true, message: 'Please select scheme' }]}
                    >
                        <Select>
                            <Select.Option value="http">HTTP</Select.Option>
                            <Select.Option value="https">HTTPS</Select.Option>
                        </Select>
                    </Form.Item>

                    <Space.Compact style={{ width: '100%' }}>
                        <Form.Item
                            name="memory"
                            label="Memory (MB)"
                            rules={[{ required: true, message: 'Please enter memory' }]}
                            style={{ width: '50%' }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="8192" />
                        </Form.Item>

                        <Form.Item
                            name="memoryOverallocate"
                            label="Memory Overallocate (%)"
                            rules={[{ required: true, message: 'Please enter memory overallocate' }]}
                            style={{ width: '50%' }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="0" />
                        </Form.Item>
                    </Space.Compact>

                    <Space.Compact style={{ width: '100%' }}>
                        <Form.Item
                            name="disk"
                            label="Disk (MB)"
                            rules={[{ required: true, message: 'Please enter disk space' }]}
                            style={{ width: '50%' }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="102400" />
                        </Form.Item>

                        <Form.Item
                            name="diskOverallocate"
                            label="Disk Overallocate (%)"
                            rules={[{ required: true, message: 'Please enter disk overallocate' }]}
                            style={{ width: '50%' }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="0" />
                        </Form.Item>
                    </Space.Compact>

                    <Space.Compact style={{ width: '100%' }}>
                        <Form.Item
                            name="daemonListen"
                            label="Daemon Listen Port"
                            rules={[{ required: true, message: 'Please enter daemon listen port' }]}
                            style={{ width: '33.33%' }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="8080" />
                        </Form.Item>

                        <Form.Item
                            name="daemonSftp"
                            label="Daemon SFTP Port"
                            rules={[{ required: true, message: 'Please enter daemon SFTP port' }]}
                            style={{ width: '33.33%' }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="2022" />
                        </Form.Item>

                        <Form.Item
                            name="uploadSize"
                            label="Upload Size (MB)"
                            rules={[{ required: true, message: 'Please enter upload size' }]}
                            style={{ width: '33.33%' }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="100" />
                        </Form.Item>
                    </Space.Compact>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setCreateModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={actionLoading}>
                                Create Node
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Node Modal */}
            <Modal
                title="Edit Node"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentNode(null);
                    editForm.resetFields();
                }}
                footer={null}
                width={800}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEditNode}
                >
                    <Form.Item
                        name="name"
                        label="Node Name"
                        rules={[{ required: true, message: 'Please enter node name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="fqdn"
                        label="FQDN"
                        rules={[{ required: true, message: 'Please enter FQDN' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="scheme"
                        label="Scheme"
                        rules={[{ required: true, message: 'Please select scheme' }]}
                    >
                        <Select>
                            <Select.Option value="http">HTTP</Select.Option>
                            <Select.Option value="https">HTTPS</Select.Option>
                        </Select>
                    </Form.Item>

                    <Space.Compact style={{ width: '100%' }}>
                        <Form.Item
                            name="memory"
                            label="Memory (MB)"
                            rules={[{ required: true, message: 'Please enter memory' }]}
                            style={{ width: '50%' }}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="memoryOverallocate"
                            label="Memory Overallocate (%)"
                            rules={[{ required: true, message: 'Please enter memory overallocate' }]}
                            style={{ width: '50%' }}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Space.Compact>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setEditModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={actionLoading}>
                                Update Node
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NodeManagement;