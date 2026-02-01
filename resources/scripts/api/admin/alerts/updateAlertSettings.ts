import http from '@/api/http';

export interface UpdateAlertSettingsFields {
    enabled?: boolean;
    [key: string]: any;
}

export default (fields: UpdateAlertSettingsFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/alerts', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
