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
    Switch, 
    message, 
    Popconfirm,
    Alert,
    Tooltip,
    InputNumber
} from 'antd';
import { 
    UserOutlined, 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    ReloadOutlined,
    CrownOutlined,
    MailOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import getUsers from '@/api/admin/users/getUsers';
import getUser from '@/api/admin/users/getUser';
import createUser from '@/api/admin/users/createUser';
import updateUser from '@/api/admin/users/updateUser';
import deleteUser from '@/api/admin/users/deleteUser';
import updateUserResources from '@/api/admin/users/updateUserResources';
import type { AdminUser } from '@/api/admin/users/getUsers';

interface UserFormData {
    email: string;
    username: string;
    nameFirst: string;
    nameLast: string;
    password?: string;
    rootAdmin: boolean;
}

interface ResourceFormData {
    credits: number;
    servers: number;
    backups: number;
    databases: number;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [resourceModalVisible, setResourceModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const [createForm] = Form.useForm<UserFormData>();
    const [editForm] = Form.useForm<UserFormData>();
    const [resourceForm] = Form.useForm<ResourceFormData>();

    const loadUsers = async (page = 1) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await getUsers(page);
            setUsers(response.data || []);
            setPagination({
                current: response.meta?.current_page || 1,
                pageSize: response.meta?.per_page || 10,
                total: response.meta?.total || 0,
            });
        } catch (err: any) {
            console.error('Users loading error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreateUser = async (values: UserFormData) => {
        setActionLoading(true);
        try {
            await createUser(values);
            message.success('User created successfully');
            setCreateModalVisible(false);
            createForm.resetFields();
            loadUsers(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to create user');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditUser = async (values: UserFormData) => {
        if (!currentUser) return;
        
        setActionLoading(true);
        try {
            await updateUser(currentUser.id, values);
            message.success('User updated successfully');
            setEditModalVisible(false);
            setCurrentUser(null);
            editForm.resetFields();
            loadUsers(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to update user');
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdateResources = async (values: ResourceFormData) => {
        if (!currentUser) return;
        
        setActionLoading(true);
        try {
            await updateUserResources(currentUser.id, values);
            message.success('User resources updated successfully');
            setResourceModalVisible(false);
            setCurrentUser(null);
            resourceForm.resetFields();
            loadUsers(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to update user resources');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        setActionLoading(true);
        try {
            await deleteUser(userId);
            message.success('User deleted successfully');
            loadUsers(pagination.current);
        } catch (err: any) {
            message.error(err.response?.data?.message || 'Failed to delete user');
        } finally {
            setActionLoading(false);
        }
    };

    const showEditModal = async (user: AdminUser) => {
        try {
            const fullUser = await getUser(user.id);
            setCurrentUser(fullUser);
            editForm.setFieldsValue({
                email: fullUser.email,
                username: fullUser.username,
                nameFirst: fullUser.nameFirst,
                nameLast: fullUser.nameLast,
                rootAdmin: fullUser.rootAdmin,
            });
            setEditModalVisible(true);
        } catch (err: any) {
            message.error('Failed to load user details');
        }
    };

    const showResourceModal = (user: AdminUser) => {
        setCurrentUser(user);
        resourceForm.setFieldsValue({
            credits: 0, // These would come from the user object if available
            servers: 0,
            backups: 0,
            databases: 0,
        });
        setResourceModalVisible(true);
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
            title: 'User',
            key: 'user',
            width: 200,
            render: (_: any, record: AdminUser) => (
                <Space direction="vertical" size="small">
                    <Space>
                        <UserOutlined />
                        <strong>{record.username}</strong>
                        {record.rootAdmin && (
                            <Tag icon={<CrownOutlined />} color="gold">ADMIN</Tag>
                        )}
                    </Space>
                    <Space>
                        <MailOutlined style={{ color: '#8c8c8c' }} />
                        <span style={{ color: '#8c8c8c', fontSize: '12px' }}>
                            {record.email}
                        </span>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Name',
            key: 'name',
            width: 150,
            render: (_: any, record: AdminUser) => (
                <span>{record.nameFirst} {record.nameLast}</span>
            ),
        },
        {
            title: '2FA',
            dataIndex: 'use2fa',
            key: 'use2fa',
            width: 80,
            render: (use2fa: boolean) => (
                <Tag color={use2fa ? 'green' : 'default'}>
                    {use2fa ? 'Enabled' : 'Disabled'}
                </Tag>
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
            render: (_: any, record: AdminUser) => (
                <Space size="small">
                    <Tooltip title="Edit User">
                        <Button
                            type="primary"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Manage Resources">
                        <Button
                            size="small"
                            icon={<UserOutlined />}
                            onClick={() => showResourceModal(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Delete User"
                        description="Are you sure you want to delete this user? This action cannot be undone."
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Delete User">
                            <Button
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                disabled={record.rootAdmin} // Prevent deleting admin users
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
                        <UserOutlined />
                        User Management
                    </Space>
                }
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setCreateModalVisible(true)}
                        >
                            Create User
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => loadUsers(pagination.current)}
                            loading={loading}
                        >
                            Refresh
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} of ${total} users`,
                        onChange: (page, pageSize) => {
                            setPagination({ ...pagination, current: page, pageSize });
                            loadUsers(page);
                        },
                    }}
                    scroll={{ x: 800 }}
                />
            </Card>

            {/* Create User Modal */}
            <Modal
                title="Create New User"
                open={createModalVisible}
                onCancel={() => {
                    setCreateModalVisible(false);
                    createForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={createForm}
                    layout="vertical"
                    onFinish={handleCreateUser}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="user@example.com" />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="username" />
                    </Form.Item>

                    <Space.Compact style={{ width: '100%' }}>
                        <Form.Item
                            name="nameFirst"
                            label="First Name"
                            rules={[{ required: true, message: 'Please enter first name' }]}
                            style={{ width: '50%' }}
                        >
                            <Input placeholder="John" />
                        </Form.Item>

                        <Form.Item
                            name="nameLast"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please enter last name' }]}
                            style={{ width: '50%' }}
                        >
                            <Input placeholder="Doe" />
                        </Form.Item>
                    </Space.Compact>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter password' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="rootAdmin"
                        label="Administrator"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Admin" unCheckedChildren="User" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setCreateModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={actionLoading}>
                                Create User
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit User Modal */}
            <Modal
                title="Edit User"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentUser(null);
                    editForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEditUser}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>

                    <Space.Compact style={{ width: '100%' }}>
                        <Form.Item
                            name="nameFirst"
                            label="First Name"
                            rules={[{ required: true, message: 'Please enter first name' }]}
                            style={{ width: '50%' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="nameLast"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please enter last name' }]}
                            style={{ width: '50%' }}
                        >
                            <Input />
                        </Form.Item>
                    </Space.Compact>

                    <Form.Item
                        name="password"
                        label="New Password (leave empty to keep current)"
                    >
                        <Input.Password placeholder="New password" />
                    </Form.Item>

                    <Form.Item
                        name="rootAdmin"
                        label="Administrator"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Admin" unCheckedChildren="User" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setEditModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={actionLoading}>
                                Update User
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Resource Management Modal */}
            <Modal
                title={`Manage Resources - ${currentUser?.username}`}
                open={resourceModalVisible}
                onCancel={() => {
                    setResourceModalVisible(false);
                    setCurrentUser(null);
                    resourceForm.resetFields();
                }}
                footer={null}
                width={500}
            >
                <Form
                    form={resourceForm}
                    layout="vertical"
                    onFinish={handleUpdateResources}
                >
                    <Form.Item
                        name="credits"
                        label="Credits"
                        rules={[{ required: true, message: 'Please enter credits amount' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            placeholder="0"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="servers"
                        label="Server Limit"
                        rules={[{ required: true, message: 'Please enter server limit' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                        name="backups"
                        label="Backup Limit"
                        rules={[{ required: true, message: 'Please enter backup limit' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                        name="databases"
                        label="Database Limit"
                        rules={[{ required: true, message: 'Please enter database limit' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setResourceModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={actionLoading}>
                                Update Resources
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;