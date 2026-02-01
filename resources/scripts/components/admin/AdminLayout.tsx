import React, { useState } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { breakpoint } from '@/theme';

const LayoutContainer = styled.div`
    ${tw`min-h-screen bg-neutral-900 text-neutral-100`};
    display: flex;
    flex-direction: column;
`;

const MainContainer = styled.div<{ $sidebarOpen: boolean }>`
    ${tw`flex flex-1 transition-all duration-300`};
    
    ${breakpoint('lg')`
        margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '280px' : '80px')};
    `}
`;

const ContentArea = styled.main`
    ${tw`flex-1 p-6 overflow-auto`};
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
    min-height: calc(100vh - 80px);
`;

const MobileOverlay = styled.div<{ $visible: boolean }>`
    ${tw`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300`};
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
`;

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const closeMobileSidebar = () => {
        setMobileSidebarOpen(false);
    };

    return (
        <LayoutContainer>
            <AdminHeader 
                onToggleSidebar={toggleSidebar}
                onToggleMobileSidebar={toggleMobileSidebar}
                sidebarOpen={sidebarOpen}
            />
            
            <AdminSidebar 
                open={sidebarOpen}
                mobileOpen={mobileSidebarOpen}
                onClose={closeMobileSidebar}
                currentPath={location.pathname}
            />
            
            <MobileOverlay 
                $visible={mobileSidebarOpen} 
                onClick={closeMobileSidebar}
            />
            
            <MainContainer $sidebarOpen={sidebarOpen}>
                <ContentArea>
                    {children}
                </ContentArea>
            </MainContainer>
        </LayoutContainer>
    );
};

export default AdminLayout;