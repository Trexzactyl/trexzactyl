import React from 'react';
import { Card, Alert, Button } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

const ApiKeyManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <KeyOutlined /> API Key Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="API key management functionality will be implemented here using the existing API from resources/scripts/api/admin/api/"
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

export default ApiKeyManagement;