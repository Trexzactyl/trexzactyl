import React from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { Menu, Bell, User, LogOut, Settings } from 'react-feather';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import GlassCard from '@/components/elements/GlassCard';

const HeaderContainer = styled.header`
    ${tw`fixed top-0 left-0 right-0 h-20 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-700/50 z-40`};
`;

const HeaderContent = styled.div`
    ${tw`flex items-center justify-between h-full px-6`};
`;

const LeftSection = styled.div`
    ${tw`flex items-center space-x-4`};
`;

const RightSection = styled.div`
    ${tw`flex items-center space-x-4`};
`;

const MenuButton = styled.button`
    ${tw`p-2 text-neutral-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-neutral-800`};
`;

const Logo = styled.div`
    ${tw`flex items-center space-x-3`};
`;

const LogoImage = styled.img`
    ${tw`w-10 h-10 rounded-lg`};
`;

const LogoText = styled.h1`
    ${tw`text-xl font-bold text-white`};
`;

const NotificationButton = styled.button`
    ${tw`relative p-2 text-neutral-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-neutral-800`};
`;

const NotificationBadge = styled.span`
    ${tw`absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center`};
`;

const UserMenu = styled(GlassCard)`
    ${tw`relative`};
`;

const UserButton = styled.button`
    ${tw`flex items-center space-x-3 p-3 text-neutral-300 hover:text-white transition-colors duration-200`};
`;

const UserAvatar = styled.div`
    ${tw`w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center`};
`;

const UserInfo = styled.div`
    ${tw`text-left`};
`;

const UserName = styled.div`
    ${tw`text-sm font-medium`};
`;

const UserRole = styled.div`
    ${tw`text-xs text-neutral-400`};
`;

const Breadcrumb = styled.div`
    ${tw`flex items-center space-x-2 text-sm text-neutral-400`};
`;

const BreadcrumbItem = styled.span`
    ${tw`hover:text-white transition-colors duration-200 cursor-pointer`};
`;

const BreadcrumbSeparator = styled.span`
    ${tw`text-neutral-600`};
`;

interface AdminHeaderProps {
    onToggleSidebar: () => void;
    onToggleMobileSidebar: () => void;
    sidebarOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
    onToggleSidebar, 
    onToggleMobileSidebar,
    sidebarOpen 
}) => {
    const user = useStoreState((state: ApplicationStore) => state.user.data);

    return (
        <HeaderContainer>
            <HeaderContent>
                <LeftSection>
                    <MenuButton 
                        onClick={onToggleSidebar}
                        className="hidden lg:block"
                    >
                        <Menu size={20} />
                    </MenuButton>
                    <MenuButton 
                        onClick={onToggleMobileSidebar}
                        className="lg:hidden"
                    >
                        <Menu size={20} />
                    </MenuButton>
                    
                    <Logo>
                        <LogoImage 
                            src="/favicons/favicon-32x32.png" 
                            alt="Trexzactyl" 
                        />
                        <LogoText>Admin Panel</LogoText>
                    </Logo>
                </LeftSection>

                <RightSection>
                    <NotificationButton>
                        <Bell size={20} />
                        <NotificationBadge>3</NotificationBadge>
                    </NotificationButton>

                    <UserMenu>
                        <UserButton>
                            <UserAvatar>
                                <User size={16} />
                            </UserAvatar>
                            <UserInfo>
                                <UserName>{user?.username || 'Admin'}</UserName>
                                <UserRole>Administrator</UserRole>
                            </UserInfo>
                        </UserButton>
                    </UserMenu>
                </RightSection>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default AdminHeader;