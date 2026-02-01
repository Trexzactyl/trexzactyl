import http from '@/api/http';

export interface AppearanceSettings {
    name: string;
    logo: string; // URL maybe?
    background: string;
}

export default (fields: Partial<AppearanceSettings>): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/appearance', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
