import React from 'react';
import { Card, Alert, Button } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

const DatabaseManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <DatabaseOutlined /> Database Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Database host management functionality will be implemented here using the existing API from resources/scripts/api/admin/databases/"
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

export default DatabaseManagement;