import http from '@/api/http';

export interface ReferralSettings {
    enabled: boolean;
    reward: number;
    percentage: number;
}

export default (fields: Partial<ReferralSettings>): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/referrals', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
