import { createGlobalStyle } from 'styled-components/macro';
import tw from 'twin.macro';

export const GlobalStyles = createGlobalStyle`
    /* Admin Panel Global Styles */
    .admin-panel {
        ${tw`min-h-screen bg-neutral-900 text-neutral-100`}
        
        /* Ant Design Dark Theme Overrides */
        .ant-card {
            ${tw`bg-neutral-800 border-neutral-700`}
            
            .ant-card-head {
                ${tw`border-neutral-700`}
                
                .ant-card-head-title {
                    ${tw`text-neutral-100`}
                }
            }
            
            .ant-card-body {
                ${tw`text-neutral-200`}
            }
        }
        
        .ant-table {
            ${tw`bg-neutral-800`}
            
            .ant-table-thead > tr > th {
                ${tw`bg-neutral-700 border-neutral-600 text-neutral-100`}
            }
            
            .ant-table-tbody > tr > td {
                ${tw`border-neutral-600 text-neutral-200`}
            }
            
            .ant-table-tbody > tr:hover > td {
                ${tw`bg-neutral-700`}
            }
        }
        
        .ant-modal {
            .ant-modal-content {
                ${tw`bg-neutral-800`}
            }
            
            .ant-modal-header {
                ${tw`bg-neutral-800 border-neutral-700`}
                
                .ant-modal-title {
                    ${tw`text-neutral-100`}
                }
            }
            
            .ant-modal-body {
                ${tw`text-neutral-200`}
            }
            
            .ant-modal-footer {
                ${tw`bg-neutral-800 border-neutral-700`}
            }
        }
        
        .ant-form {
            .ant-form-item-label > label {
                ${tw`text-neutral-200`}
            }
        }
        
        .ant-input,
        .ant-input-number,
        .ant-select-selector,
        .ant-picker {
            ${tw`bg-neutral-700 border-neutral-600 text-neutral-100`}
            
            &:hover {
                ${tw`border-neutral-500`}
            }
            
            &:focus,
            &.ant-input-focused,
            &.ant-select-focused .ant-select-selector {
                ${tw`border-blue-500 shadow-none`}
                box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
            }
        }
        
        .ant-select-dropdown {
            ${tw`bg-neutral-800 border-neutral-600`}
            
            .ant-select-item {
                ${tw`text-neutral-200`}
                
                &:hover {
                    ${tw`bg-neutral-700`}
                }
                
                &.ant-select-item-option-selected {
                    ${tw`bg-blue-600 text-white`}
                }
            }
        }
        
        .ant-btn {
            &.ant-btn-primary {
                ${tw`bg-blue-600 border-blue-600`}
                
                &:hover {
                    ${tw`bg-blue-500 border-blue-500`}
                }
            }
            
            &.ant-btn-default {
                ${tw`bg-neutral-700 border-neutral-600 text-neutral-200`}
                
                &:hover {
                    ${tw`bg-neutral-600 border-neutral-500 text-neutral-100`}
                }
            }
            
            &.ant-btn-danger {
                ${tw`bg-red-600 border-red-600`}
                
                &:hover {
                    ${tw`bg-red-500 border-red-500`}
                }
            }
        }
        
        .ant-tag {
            ${tw`border-0`}
            
            &.ant-tag-blue {
                ${tw`bg-blue-600 text-white`}
            }
            
            &.ant-tag-green {
                ${tw`bg-green-600 text-white`}
            }
            
            &.ant-tag-orange {
                ${tw`bg-orange-600 text-white`}
            }
            
            &.ant-tag-red {
                ${tw`bg-red-600 text-white`}
            }
            
            &.ant-tag-purple {
                ${tw`bg-purple-600 text-white`}
            }
            
            &.ant-tag-cyan {
                ${tw`bg-cyan-600 text-white`}
            }
            
            &.ant-tag-gold {
                ${tw`bg-yellow-600 text-white`}
            }
            
            &.ant-tag-default {
                ${tw`bg-neutral-600 text-neutral-200`}
            }
        }
        
        .ant-alert {
            &.ant-alert-info {
                ${tw`bg-blue-900 border-blue-700`}
                
                .ant-alert-message {
                    ${tw`text-blue-100`}
                }
                
                .ant-alert-description {
                    ${tw`text-blue-200`}
                }
            }
            
            &.ant-alert-success {
                ${tw`bg-green-900 border-green-700`}
                
                .ant-alert-message {
                    ${tw`text-green-100`}
                }
                
                .ant-alert-description {
                    ${tw`text-green-200`}
                }
            }
            
            &.ant-alert-warning {
                ${tw`bg-orange-900 border-orange-700`}
                
                .ant-alert-message {
                    ${tw`text-orange-100`}
                }
                
                .ant-alert-description {
                    ${tw`text-orange-200`}
                }
            }
            
            &.ant-alert-error {
                ${tw`bg-red-900 border-red-700`}
                
                .ant-alert-message {
                    ${tw`text-red-100`}
                }
                
                .ant-alert-description {
                    ${tw`text-red-200`}
                }
            }
        }
        
        .ant-progress {
            .ant-progress-bg {
                ${tw`bg-blue-600`}
            }
            
            &.ant-progress-status-success .ant-progress-bg {
                ${tw`bg-green-600`}
            }
            
            &.ant-progress-status-exception .ant-progress-bg {
                ${tw`bg-red-600`}
            }
        }
        
        .ant-descriptions {
            ${tw`text-neutral-200`}
            
            .ant-descriptions-item-label {
                ${tw`text-neutral-300`}
            }
            
            .ant-descriptions-item-content {
                ${tw`text-neutral-100`}
            }
            
            &.ant-descriptions-bordered {
                .ant-descriptions-item-label,
                .ant-descriptions-item-content {
                    ${tw`border-neutral-600`}
                }
            }
        }
        
        .ant-tabs {
            .ant-tabs-tab {
                ${tw`text-neutral-300`}
                
                &.ant-tabs-tab-active {
                    ${tw`text-blue-400`}
                }
                
                &:hover {
                    ${tw`text-blue-300`}
                }
            }
            
            .ant-tabs-ink-bar {
                ${tw`bg-blue-500`}
            }
            
            .ant-tabs-content-holder {
                ${tw`text-neutral-200`}
            }
        }
        
        .ant-popconfirm {
            .ant-popover-inner {
                ${tw`bg-neutral-800 border-neutral-600`}
            }
            
            .ant-popover-message {
                ${tw`text-neutral-200`}
            }
            
            .ant-popover-buttons {
                .ant-btn {
                    ${tw`text-neutral-200`}
                }
            }
        }
        
        .ant-tooltip {
            .ant-tooltip-inner {
                ${tw`bg-neutral-700 text-neutral-100`}
            }
            
            .ant-tooltip-arrow::before {
                ${tw`bg-neutral-700`}
            }
        }
        
        .ant-message {
            .ant-message-notice-content {
                ${tw`bg-neutral-800 text-neutral-100`}
            }
        }
        
        .ant-notification {
            .ant-notification-notice {
                ${tw`bg-neutral-800 border-neutral-600`}
                
                .ant-notification-notice-message {
                    ${tw`text-neutral-100`}
                }
                
                .ant-notification-notice-description {
                    ${tw`text-neutral-200`}
                }
            }
        }
    }
    
    /* Custom scrollbar for dark theme */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    
    ::-webkit-scrollbar-track {
        ${tw`bg-neutral-800`}
    }
    
    ::-webkit-scrollbar-thumb {
        ${tw`bg-neutral-600 rounded`}
        
        &:hover {
            ${tw`bg-neutral-500`}
        }
    }
    
    /* Loading spinner customization */
    .ant-spin-dot {
        .ant-spin-dot-item {
            ${tw`bg-blue-500`}
        }
    }
    
    /* Custom admin panel specific styles */
    .admin-stat-card {
        ${tw`transition-all duration-200 hover:shadow-lg`}
        
        &:hover {
            transform: translateY(-2px);
        }
    }
    
    .admin-action-button {
        ${tw`transition-all duration-200`}
        
        &:hover {
            transform: scale(1.05);
        }
    }
    
    .admin-table-row {
        ${tw`transition-all duration-200`}
        
        &:hover {
            ${tw`bg-neutral-700`}
        }
    }
`;