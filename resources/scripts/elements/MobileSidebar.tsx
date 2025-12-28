import { ElementType, ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreState } from '@/state/hooks';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { withSubComponents } from '@/lib/helpers';

const MobileSidebar = ({ children }: { children: ReactNode[] }) => {
    return (
        <div className={'block md:hidden fixed top-0 left-0 h-full w-64 z-50 bg-black/95 shadow-xl transition-transform duration-300'}>
            <div className={'flex flex-col h-full py-6 space-y-4 overflow-y-auto'}>{children}</div>
        </div>
    );
};

const Link = ({
    icon: Icon,
    text,
    linkTo,
    end,
}: {
    icon: ElementType;
    text?: string;
    linkTo: string;
    end?: boolean;
}) => {
    const [active, setActive] = useState<boolean>(false);
    const { colors } = useStoreState(s => s.theme.data!);

    return (
        <NavLink
            to={linkTo}
            end={end}
            className={({ isActive }) =>
                `w-full px-6 py-3 flex items-center font-semibold transition duration-300 hover:bg-white/5 ${isActive ? setActive(true) : setActive(false)
                }`
            }
            style={{ color: active ? colors.primary : '#9ca3af' }}
        >
            {Icon && <Icon className={'w-5 h-5 mr-4'} />}
            {text}
        </NavLink>
    );
};

const Home = () => {
    const { colors } = useStoreState(s => s.theme.data!);
    return (
        <>
            <NavLink to={'/'}>
                <div className={'h-full flex items-center justify-center font-semibold my-auto'}>
                    <FontAwesomeIcon icon={faHome} style={{ color: colors.primary }} className={'brightness-150'} />
                </div>
            </NavLink>
            <div className={'mx-3 my-auto'}>&bull;</div>
        </>
    );
};

export default withSubComponents(MobileSidebar as any, { Link, Home });
