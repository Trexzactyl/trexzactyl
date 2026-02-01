import React from 'react';
import { Card, Alert, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const SettingsManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <SettingOutlined /> Settings Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Settings management functionality will be implemented here using the existing API from resources/scripts/api/admin/settings/"
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

export default SettingsManagement;