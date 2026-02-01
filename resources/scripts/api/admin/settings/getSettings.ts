import http, { FractalResponseData } from '@/api/http';

export interface AdminSettings {
    details: {
        appName: string;
        locale: string;
        mount: boolean;
        installed: boolean;
        maintenance: {
            enabled: boolean;
            message: string;
        };
    };
    mail: {
        driver: string;
        host: string;
        port: number;
        username: string;
        from: string;
        name: string;
    };
}

export default (): Promise<AdminSettings> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/settings')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
