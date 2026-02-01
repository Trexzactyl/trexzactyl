import http from '@/api/http';

export interface AdvancedSettings {
    required2fa: boolean;
    recaptcha: {
        enabled: boolean;
        siteKey: string;
        secretKey: string;
    };
    console: {
        count: number;
        frequency: number;
    };
}

export default (fields: Partial<AdvancedSettings>): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/advanced', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
