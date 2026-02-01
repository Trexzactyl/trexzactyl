import http from '@/api/http';

export interface CreateEggFields {
    nestId: number;
    name: string;
    description: string;
    dockerImage: string;
    startup: string;
    configFiles?: string;
    configStartup?: string;
    configStop?: string;
    configLogs?: string;
}

export default (fields: CreateEggFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/nests/egg/new', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
