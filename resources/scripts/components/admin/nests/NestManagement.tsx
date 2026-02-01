import React from 'react';
import { Card, Alert, Button } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const NestManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <AppstoreOutlined /> Nest & Egg Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Nest and egg management functionality will be implemented here using the existing API from resources/scripts/api/admin/nests/"
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

export default NestManagement;