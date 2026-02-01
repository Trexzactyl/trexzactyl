import { useState, useEffect, useCallback } from 'react';
import { 
    getPayments, 
    approvePayment, 
    rejectPayment, 
    processPayment,
    type AdminPayment 
} from '@/api/admin/payment';
import { 
    getBkashTransactions, 
    approveBkashTransaction, 
    rejectBkashTransaction, 
    processBkashTransaction,
    type BkashTransaction 
} from '@/api/admin/bkash';
import { 
    getNagadTransactions, 
    approveNagadTransaction, 
    rejectNagadTransaction, 
    processNagadTransaction,
    type NagadTransaction 
} from '@/api/admin/nagad';

export type { AdminPayment, BkashTransaction, NagadTransaction };

interface UsePaymentManagementReturn {
    // Data
    manualPayments: AdminPayment[];
    bkashTransactions: BkashTransaction[];
    nagadTransactions: NagadTransaction[];
    
    // Loading states
    loading: boolean;
    actionLoading: boolean;
    
    // Actions
    loadData: () => Promise<void>;
    approveManualPayment: (id: number) => Promise<void>;
    rejectManualPayment: (id: number, reason?: string) => Promise<void>;
    processManualPayment: (id: number) => Promise<void>;
    approveBkash: (id: number) => Promise<void>;
    rejectBkash: (id: number, reason?: string) => Promise<void>;
    processBkash: (id: number) => Promise<void>;
    approveNagad: (id: number) => Promise<void>;
    rejectNagad: (id: number, reason?: string) => Promise<void>;
    processNagad: (id: number) => Promise<void>;
    
    // Error handling
    error: string | null;
    clearError: () => void;
}

export const usePaymentManagement = (): UsePaymentManagementReturn => {
    const [manualPayments, setManualPayments] = useState<AdminPayment[]>([]);
    const [bkashTransactions, setBkashTransactions] = useState<BkashTransaction[]>([]);
    const [nagadTransactions, setNagadTransactions] = useState<NagadTransaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const handleError = useCallback((err: any) => {
        console.error('Payment management error:', err);
        setError(err.response?.data?.message || err.message || 'An error occurred');
    }, []);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const [paymentsResponse, bkashResponse, nagadResponse] = await Promise.all([
                getPayments(1),
                getBkashTransactions(1),
                getNagadTransactions(1),
            ]);

            setManualPayments(paymentsResponse.data || []);
            setBkashTransactions(bkashResponse.data || []);
            setNagadTransactions(nagadResponse.data || []);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, [handleError]);

    // Manual payment actions
    const approveManualPayment = useCallback(async (id: number) => {
        setActionLoading(true);
        try {
            await approvePayment(id);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    const rejectManualPayment = useCallback(async (id: number, reason?: string) => {
        setActionLoading(true);
        try {
            await rejectPayment(id, reason);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    const processManualPayment = useCallback(async (id: number) => {
        setActionLoading(true);
        try {
            await processPayment(id);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    // bKash actions
    const approveBkash = useCallback(async (id: number) => {
        setActionLoading(true);
        try {
            await approveBkashTransaction(id);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    const rejectBkash = useCallback(async (id: number, reason?: string) => {
        setActionLoading(true);
        try {
            await rejectBkashTransaction(id, reason);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    const processBkash = useCallback(async (id: number) => {
        setActionLoading(true);
        try {
            await processBkashTransaction(id);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    // Nagad actions
    const approveNagad = useCallback(async (id: number) => {
        setActionLoading(true);
        try {
            await approveNagadTransaction(id);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    const rejectNagad = useCallback(async (id: number, reason?: string) => {
        setActionLoading(true);
        try {
            await rejectNagadTransaction(id, reason);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    const processNagad = useCallback(async (id: number) => {
        setActionLoading(true);
        try {
            await processNagadTransaction(id);
            await loadData();
        } catch (err) {
            handleError(err);
        } finally {
            setActionLoading(false);
        }
    }, [loadData, handleError]);

    // Load data on mount
    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        // Data
        manualPayments,
        bkashTransactions,
        nagadTransactions,
        
        // Loading states
        loading,
        actionLoading,
        
        // Actions
        loadData,
        approveManualPayment,
        rejectManualPayment,
        processManualPayment,
        approveBkash,
        rejectBkash,
        processBkash,
        approveNagad,
        rejectNagad,
        processNagad,
        
        // Error handling
        error,
        clearError,
    };
};