import React from 'react';
import { Card, Alert, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const AlertManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <BellOutlined /> Alert Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Alert management functionality will be implemented here using the existing API from resources/scripts/api/admin/alerts/"
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

export default AlertManagement;