import http from '@/api/http';

export interface UpdateServerSettingsFields {
    // Server-specific settings like limits, etc.
    [key: string]: any;
}

export default (fields: UpdateServerSettingsFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/server', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
