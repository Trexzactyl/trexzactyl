import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from '@/components/admin/AdminApp';

// Initialize the admin panel
const container = document.getElementById('admin-app');
if (container) {
    const root = createRoot(container);
    root.render(<AdminApp />);
} else {
    console.error('Admin app container not found. Make sure there is a div with id="admin-app" in your HTML.');
}
