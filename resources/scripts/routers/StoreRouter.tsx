import * as Icon from 'react-feather';
import { useLocation } from 'react-router-dom';
import TransitionRouter from '@/TransitionRouter';
import SidePanel from '@/components/elements/SidePanel';
import { NotFound } from '@/components/elements/ScreenBlock';
import useWindowDimensions from '@/plugins/useWindowDimensions';
import { NavLink, Route, Routes } from 'react-router-dom';
import CreateContainer from '@/components/store/CreateContainer';
import PurchaseContainer from '@/components/store/PurchaseContainer';
import OverviewContainer from '@/components/store/OverviewContainer';
import MobileNavigation from '@/components/elements/MobileNavigation';
import ResourcesContainer from '@/components/store/ResourcesContainer';
import SubNavigation from '@/components/elements/SubNavigation';

export default () => {
    const location = useLocation();
    const { width } = useWindowDimensions();

    return (
        <>
            {width >= 1280 ? <SidePanel /> : <MobileNavigation />}
            <SubNavigation className={'j-down'}>
                <div>
                    <NavLink to="/store" end>
                        <div className={'flex items-center justify-between'}>
                            Store <Icon.ShoppingCart className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                    <NavLink to="/store/resources">
                        <div className={'flex items-center justify-between'}>
                            Resources <Icon.Cpu className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                    <NavLink to="/store/credits">
                        <div className={'flex items-center justify-between'}>
                            Balance <Icon.DollarSign className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                    <NavLink to="/store/create">
                        <div className={'flex items-center justify-between'}>
                            Create Server <Icon.Server className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                </div>
            </SubNavigation>
            <TransitionRouter location={location}>
                <Routes location={location}>
                    <Route path="/" element={<OverviewContainer />} />
                    <Route path="/credits" element={<PurchaseContainer />} />
                    <Route path="/resources" element={<ResourcesContainer />} />
                    <Route path="/create" element={<CreateContainer />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </TransitionRouter>
        </>
    );
};
