import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Button, Alert } from 'antd';
import { 
    UserOutlined, 
    HddOutlined, 
    NodeIndexOutlined, 
    DollarOutlined,
    ReloadOutlined,
    LineChartOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import getOverview from '@/api/admin/getOverview';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';

interface DashboardStats {
    users: {
        total: number;
        approved: number;
        pending: number;
    };
    servers: {
        total: number;
        online: number;
        offline: number;
        suspended: number;
    };
    nodes: {
        total: number;
        online: number;
        maintenance: number;
    };
    payments: {
        pending: number;
        approved_today: number;
        total_revenue: number;
    };
}

interface RecentActivity {
    id: number;
    type: 'user_created' | 'server_created' | 'payment_approved' | 'server_suspended';
    description: string;
    timestamp: string;
    user?: string;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const user = useStoreState((state: ApplicationStore) => state.user.data);

    const loadDashboardData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await getOverview();
            
            // Mock data structure - replace with actual API response structure
            const mockStats: DashboardStats = {
                users: {
                    total: response.users?.total || 0,
                    approved: response.users?.approved || 0,
                    pending: response.users?.pending || 0,
                },
                servers: {
                    total: response.servers?.total || 0,
                    online: response.servers?.online || 0,
                    offline: response.servers?.offline || 0,
                    suspended: response.servers?.suspended || 0,
                },
                nodes: {
                    total: response.nodes?.total || 0,
                    online: response.nodes?.online || 0,
                    maintenance: response.nodes?.maintenance || 0,
                },
                payments: {
                    pending: response.payments?.pending || 0,
                    approved_today: response.payments?.approved_today || 0,
                    total_revenue: response.payments?.total_revenue || 0,
                },
            };

            setStats(mockStats);
            
            // Mock recent activity - replace with actual API data
            const mockActivity: RecentActivity[] = [
                {
                    id: 1,
                    type: 'user_created',
                    description: 'New user registered',
                    timestamp: new Date().toISOString(),
                    user: 'john_doe',
                },
                {
                    id: 2,
                    type: 'server_created',
                    description: 'Server "minecraft-1" created',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    user: 'admin',
                },
                {
                    id: 3,
                    type: 'payment_approved',
                    description: 'Payment of $25.00 approved',
                    timestamp: new Date(Date.now() - 7200000).toISOString(),
                    user: 'jane_smith',
                },
            ];
            
            setRecentActivity(mockActivity);
        } catch (err: any) {
            console.error('Dashboard error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    const getActivityIcon = (type: RecentActivity['type']) => {
        switch (type) {
            case 'user_created':
                return <UserOutlined style={{ color: '#52c41a' }} />;
            case 'server_created':
                return <HddOutlined style={{ color: '#1890ff' }} />;
            case 'payment_approved':
                return <DollarOutlined style={{ color: '#faad14' }} />;
            case 'server_suspended':
                return <ClockCircleOutlined style={{ color: '#ff4d4f' }} />;
            default:
                return <LineChartOutlined />;
        }
    };

    const getActivityColor = (type: RecentActivity['type']) => {
        switch (type) {
            case 'user_created':
                return 'success';
            case 'server_created':
                return 'processing';
            case 'payment_approved':
                return 'warning';
            case 'server_suspended':
                return 'error';
            default:
                return 'default';
        }
    };

    const activityColumns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type: RecentActivity['type']) => (
                <Space>
                    {getActivityIcon(type)}
                    <Tag color={getActivityColor(type)}>
                        {type.replace('_', ' ').toUpperCase()}
                    </Tag>
                </Space>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            width: 120,
            render: (user: string) => user ? <Tag icon={<UserOutlined />}>{user}</Tag> : '-',
        },
        {
            title: 'Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            width: 150,
            render: (timestamp: string) => new Date(timestamp).toLocaleString(),
        },
    ];

    if (error) {
        return (
            <div style={{ padding: '24px' }}>
                <Alert
                    message="Dashboard Error"
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={loadDashboardData}>
                            Retry
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                        <h1 style={{ margin: 0, color: '#fff' }}>
                            Welcome back, {user?.nameFirst || 'Admin'}!
                        </h1>
                        <p style={{ margin: '4px 0 0 0', color: '#8c8c8c' }}>
                            Here's what's happening with your panel today.
                        </p>
                    </div>
                    <Button 
                        type="primary" 
                        icon={<ReloadOutlined />} 
                        onClick={loadDashboardData}
                        loading={loading}
                    >
                        Refresh
                    </Button>
                </Space>
            </div>

            {/* Statistics Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={stats?.users.total || 0}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Tag color="green">Approved: {stats?.users.approved || 0}</Tag>
                            <Tag color="orange">Pending: {stats?.users.pending || 0}</Tag>
                        </div>
                    </Card>
                </Col>
                
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Servers"
                            value={stats?.servers.total || 0}
                            prefix={<HddOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Tag color="green">Online: {stats?.servers.online || 0}</Tag>
                            <Tag color="red">Offline: {stats?.servers.offline || 0}</Tag>
                        </div>
                    </Card>
                </Col>
                
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Nodes"
                            value={stats?.nodes.total || 0}
                            prefix={<NodeIndexOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Tag color="green">Online: {stats?.nodes.online || 0}</Tag>
                            <Tag color="orange">Maintenance: {stats?.nodes.maintenance || 0}</Tag>
                        </div>
                    </Card>
                </Col>
                
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Pending Payments"
                            value={stats?.payments.pending || 0}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Tag color="green">Today: {stats?.payments.approved_today || 0}</Tag>
                            <Tag color="blue">Revenue: ${stats?.payments.total_revenue || 0}</Tag>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Recent Activity */}
            <Card 
                title={
                    <Space>
                        <LineChartOutlined />
                        Recent Activity
                    </Space>
                }
                loading={loading}
            >
                <Table
                    columns={activityColumns}
                    dataSource={recentActivity}
                    rowKey="id"
                    pagination={false}
                    size="small"
                />
            </Card>
        </div>
    );
};

export default AdminDashboard;