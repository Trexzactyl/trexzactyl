import http from '@/api/http';

export interface MailSettings {
    driver: string;
    host: string;
    port: number;
    username: string;
    password?: string;
    fromAddress: string;
    fromName: string;
    encryption: string;
}

export default (fields: Partial<MailSettings>): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/mail', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
