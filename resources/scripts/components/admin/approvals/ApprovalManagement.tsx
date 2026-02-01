import React from 'react';
import { Card, Alert, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const ApprovalManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <CheckCircleOutlined /> Approval Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="User approval management functionality will be implemented here using the existing API from resources/scripts/api/admin/approvals/"
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

export default ApprovalManagement;