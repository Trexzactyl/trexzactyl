import { useLocation } from 'react-router-dom';
import TransitionRouter from '@/TransitionRouter';
import SidePanel from '@/components/elements/SidePanel';
import { NotFound } from '@/components/elements/ScreenBlock';
import ViewContainer from '@/components/tickets/ViewContainer';
import useWindowDimensions from '@/plugins/useWindowDimensions';
import { Route, Routes } from 'react-router-dom';
import MobileNavigation from '@/components/elements/MobileNavigation';
import OverviewContainer from '@/components/tickets/OverviewContainer';

export default () => {
    const location = useLocation();
    const { width } = useWindowDimensions();

    return (
        <>
            {width >= 1280 ? <SidePanel /> : <MobileNavigation />}
            <TransitionRouter location={location}>
                <Routes location={location}>
                    <Route path="/" element={<OverviewContainer />} />
                    <Route path="/:id" element={<ViewContainer />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </TransitionRouter>
        </>
    );
};
