import React from 'react';
import { Card, Alert, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const LocationManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <EnvironmentOutlined /> Location Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Location management functionality will be implemented here using the existing API from resources/scripts/api/admin/locations/"
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

export default LocationManagement;