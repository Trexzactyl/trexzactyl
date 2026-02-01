import React from 'react';
import { Card, Alert, Button } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

const MountManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <FolderOutlined /> Mount Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Mount management functionality will be implemented here using the existing API from resources/scripts/api/admin/mounts/"
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

export default MountManagement;