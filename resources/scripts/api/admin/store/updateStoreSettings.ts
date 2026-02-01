import http from '@/api/http';

export interface StoreSettings {
    currency: string;
    currencySymbol: string;
    // Add other store settings as needed based on controller
}

export default (fields: Partial<StoreSettings>): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/store', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
