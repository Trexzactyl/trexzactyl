import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { 
    Home, 
    Users, 
    Server, 
    Layers, 
    CreditCard, 
    HelpCircle, 
    MapPin, 
    Database, 
    Archive, 
    HardDrive, 
    GitBranch, 
    Settings, 
    Gift, 
    UserCheck, 
    AlertTriangle 
} from 'react-feather';
import GlassCard from '@/components/elements/GlassCard';
import { breakpoint } from '@/theme';

const SidebarContainer = styled.aside<{ $open: boolean; $mobileOpen: boolean }>`
    ${tw`fixed left-0 top-20 h-full bg-neutral-900/95 backdrop-blur-md border-r border-neutral-700/50 z-30 transition-all duration-300`};
    width: ${({ $open }) => ($open ? '280px' : '80px')};
    
    ${breakpoint('lg')`
        transform: translateX(0);
    `}
    
    @media (max-width: 1023px) {
        width: 280px;
        transform: translateX(${({ $mobileOpen }) => ($mobileOpen ? '0' : '-100%')});
    }
`;

const SidebarContent = styled.div`
    ${tw`p-4 h-full overflow-y-auto`};
    scrollbar-width: thin;
    scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(59, 130, 246, 0.3);
        border-radius: 3px;
    }
`;

const NavSection = styled.div`
    ${tw`mb-8`};
`;

const SectionTitle = styled.h3<{ $collapsed: boolean }>`
    ${tw`text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 transition-all duration-300`};
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    height: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
    overflow: hidden;
`;

const NavItem = styled(GlassCard)<{ $active: boolean; $collapsed: boolean }>`
    ${tw`mb-2 transition-all duration-300 cursor-pointer`};
    ${({ $active }) => $active && tw`border-blue-500/50 bg-blue-500/10`};
    
    &:hover {
        ${tw`border-blue-400/50 bg-blue-500/5`};
        transform: translateX(4px);
    }
`;

const NavLink = styled(Link)<{ $collapsed: boolean }>`
    ${tw`flex items-center p-4 text-neutral-300 no-underline transition-all duration-300`};
    
    &:hover {
        ${tw`text-white no-underline`};
    }
`;

const IconWrapper = styled.div`
    ${tw`flex-shrink-0 w-5 h-5 mr-3`};
`;

const NavText = styled.span<{ $collapsed: boolean }>`
    ${tw`font-medium transition-all duration-300`};
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    transform: translateX(${({ $collapsed }) => ($collapsed ? '-10px' : '0')});
`;

const Badge = styled.span`
    ${tw`ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full`};
`;

interface NavItemData {
    path: string;
    label: string;
    icon: React.ComponentType<any>;
    badge?: number;
}

interface NavSection {
    title: string;
    items: NavItemData[];
}

interface AdminSidebarProps {
    open: boolean;
    mobileOpen: boolean;
    onClose: () => void;
    currentPath: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
    open, 
    mobileOpen, 
    onClose, 
    currentPath 
}) => {
    const navSections: NavSection[] = [
        {
            title: 'Overview',
            items: [
                { path: '/', label: 'Dashboard', icon: Home },
            ],
        },
        {
            title: 'Management',
            items: [
                { path: '/users', label: 'Users', icon: Users },
                { path: '/servers', label: 'Servers', icon: Server },
                { path: '/nodes', label: 'Nodes', icon: Layers },
                { path: '/locations', label: 'Locations', icon: MapPin },
                { path: '/databases', label: 'Databases', icon: Database },
            ],
        },
        {
            title: 'Service',
            items: [
                { path: '/nests', label: 'Nests', icon: Archive },
                { path: '/mounts', label: 'Mounts', icon: HardDrive },
                { path: '/api', label: 'API Keys', icon: GitBranch },
            ],
        },
        {
            title: 'Store & Support',
            items: [
                { path: '/payments', label: 'Payments', icon: CreditCard, badge: 3 },
                { path: '/tickets', label: 'Tickets', icon: HelpCircle, badge: 5 },
                { path: '/coupons', label: 'Coupons', icon: Gift },
                { path: '/approvals', label: 'Approvals', icon: UserCheck, badge: 2 },
            ],
        },
        {
            title: 'System',
            items: [
                { path: '/settings', label: 'Settings', icon: Settings },
                { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
            ],
        },
    ];

    const isActive = (path: string) => {
        if (path === '/') {
            return currentPath === '/';
        }
        return currentPath.startsWith(path);
    };

    return (
        <SidebarContainer $open={open} $mobileOpen={mobileOpen}>
            <SidebarContent>
                {navSections.map((section) => (
                    <NavSection key={section.title}>
                        <SectionTitle $collapsed={!open}>
                            {section.title}
                        </SectionTitle>
                        {section.items.map((item) => (
                            <NavItem 
                                key={item.path}
                                $active={isActive(item.path)}
                                $collapsed={!open}
                            >
                                <NavLink 
                                    to={item.path} 
                                    $collapsed={!open}
                                    onClick={onClose}
                                >
                                    <IconWrapper>
                                        <item.icon size={20} />
                                    </IconWrapper>
                                    <NavText $collapsed={!open}>
                                        {item.label}
                                    </NavText>
                                    {item.badge && open && (
                                        <Badge>{item.badge}</Badge>
                                    )}
                                </NavLink>
                            </NavItem>
                        ))}
                    </NavSection>
                ))}
            </SidebarContent>
        </SidebarContainer>
    );
};

export default AdminSidebar;