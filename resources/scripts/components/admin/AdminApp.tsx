import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { store } from '@/state';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserManagement from '@/components/admin/users/UserManagement';
import ServerManagement from '@/components/admin/servers/ServerManagement';
import NodeManagement from '@/components/admin/nodes/NodeManagement';
import PaymentManagement from '@/components/admin/payments/PaymentManagement';
import TicketManagement from '@/components/admin/tickets/TicketManagement';
import LocationManagement from '@/components/admin/locations/LocationManagement';
import DatabaseManagement from '@/components/admin/databases/DatabaseManagement';
import NestManagement from '@/components/admin/nests/NestManagement';
import MountManagement from '@/components/admin/mounts/MountManagement';
import ApiKeyManagement from '@/components/admin/api/ApiKeyManagement';
import SettingsManagement from '@/components/admin/settings/SettingsManagement';
import CouponManagement from '@/components/admin/coupons/CouponManagement';
import ApprovalManagement from '@/components/admin/approvals/ApprovalManagement';
import AlertManagement from '@/components/admin/alerts/AlertManagement';
import { GlobalStyles } from '@/components/admin/GlobalStyles';

const AdminApp: React.FC = () => {
    return (
        <StoreProvider store={store}>
            <GlobalStyles />
            <Router basename="/admin">
                <AdminLayout>
                    <Switch>
                        <Route exact path="/" component={AdminDashboard} />
                        <Route path="/users" component={UserManagement} />
                        <Route path="/servers" component={ServerManagement} />
                        <Route path="/nodes" component={NodeManagement} />
                        <Route path="/payments" component={PaymentManagement} />
                        <Route path="/tickets" component={TicketManagement} />
                        <Route path="/locations" component={LocationManagement} />
                        <Route path="/databases" component={DatabaseManagement} />
                        <Route path="/nests" component={NestManagement} />
                        <Route path="/mounts" component={MountManagement} />
                        <Route path="/api" component={ApiKeyManagement} />
                        <Route path="/settings" component={SettingsManagement} />
                        <Route path="/coupons" component={CouponManagement} />
                        <Route path="/approvals" component={ApprovalManagement} />
                        <Route path="/alerts" component={AlertManagement} />
                        <Redirect to="/" />
                    </Switch>
                </AdminLayout>
            </Router>
        </StoreProvider>
    );
};

export default AdminApp;