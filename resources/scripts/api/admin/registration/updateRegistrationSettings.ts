import http from '@/api/http';

export interface RegistrationSettings {
    enabled: boolean;
    verification: boolean;
    discord_enabled: boolean;
    discord_id: string;
    discord_secret: string;
    cpu: number;
    memory: number;
    disk: number;
    slot: number;
    port: number;
    backup: number;
    database: number;
}

export default (fields: Partial<RegistrationSettings>): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/registration', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
