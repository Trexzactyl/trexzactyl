import React from 'react';
import { Card, Alert, Button } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';

const TicketManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <CustomerServiceOutlined /> Ticket Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Ticket management functionality will be implemented here using the existing API from resources/scripts/api/admin/tickets/"
                    type="info"
                    showIcon
                    action={
                        <Button size="small" type="primary">
                            View API Documentation
                        </Button>
                    }
                />
            </Card>
        </div>
    );
};

export default TicketManagement;