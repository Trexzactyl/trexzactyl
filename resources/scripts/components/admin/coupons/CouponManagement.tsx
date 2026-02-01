import React from 'react';
import { Card, Alert, Button } from 'antd';
import { TagOutlined } from '@ant-design/icons';

const CouponManagement: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title={
                    <div>
                        <TagOutlined /> Coupon Management
                    </div>
                }
            >
                <Alert
                    message="Coming Soon"
                    description="Coupon management functionality will be implemented here using the existing API from resources/scripts/api/admin/coupons/"
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

export default CouponManagement;