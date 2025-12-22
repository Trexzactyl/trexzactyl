import { useEffect } from 'react';
import { useStoreState } from '@/state/hooks';
import { ServerContext } from '@/state/server';
import StoreRouter from '@/routers/StoreRouter';
import TicketRouter from '@/routers/TicketRouter';
import ServerRouter from '@/routers/ServerRouter';
import Spinner from '@/components/elements/Spinner';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import DashboardRouter from '@/routers/DashboardRouter';
import AuthenticationRouter from '@/routers/AuthenticationRouter';
import { NotApproved, NotFound } from '@/components/elements/ScreenBlock';
import AuthenticatedRoute from '@/components/elements/AuthenticatedRoute';
import { setupInterceptors } from '@/api/interceptors';

const InterceptorSetup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

    return null;
};

export default () => {
    const authenticated = useStoreState(state => state.user?.data);
    const approved = useStoreState(state => state.user.data?.approved);
    const store = useStoreState(state => state.storefront.data?.enabled);
    const tickets = useStoreState(state => state.settings.data?.tickets);
    const approvals = useStoreState(state => state.settings.data?.approvals);
    const settingsLoaded = useStoreState(state => state.settings.data !== undefined);
    const storefrontLoaded = useStoreState(state => state.storefront.data !== undefined);

    // Wait for settings to load before rendering
    if (!settingsLoaded || !storefrontLoaded) {
        return (
            <div className={'flex items-center justify-center h-screen'}>
                <Spinner size={Spinner.Size.LARGE} centered />
            </div>
        );
    }

    if (approvals && !approved && authenticated) {
        return (
            <NotApproved
                title={'Awaiting Approval'}
                message={'Your account is currently pending approval from an administator.'}
            />
        );
    }

    return (
        <BrowserRouter>
            <InterceptorSetup />
            <Routes>
                <Route
                    path="/auth/*"
                    element={
                        <Spinner.Suspense>
                            <AuthenticationRouter />
                        </Spinner.Suspense>
                    }
                />
                <Route
                    path="/server/:id/*"
                    element={
                        <AuthenticatedRoute>
                            <Spinner.Suspense>
                                <ServerContext.Provider>
                                    <ServerRouter />
                                </ServerContext.Provider>
                            </Spinner.Suspense>
                        </AuthenticatedRoute>
                    }
                />
                {store && (
                    <Route
                        path="/store/*"
                        element={
                            <AuthenticatedRoute>
                                <Spinner.Suspense>
                                    <StoreRouter />
                                </Spinner.Suspense>
                            </AuthenticatedRoute>
                        }
                    />
                )}
                {tickets && (
                    <Route
                        path="/tickets/*"
                        element={
                            <AuthenticatedRoute>
                                <Spinner.Suspense>
                                    <TicketRouter />
                                </Spinner.Suspense>
                            </AuthenticatedRoute>
                        }
                    />
                )}
                <Route
                    path="/*"
                    element={
                        <AuthenticatedRoute>
                            <Spinner.Suspense>
                                <DashboardRouter />
                            </Spinner.Suspense>
                        </AuthenticatedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
