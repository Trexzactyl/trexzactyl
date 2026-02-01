import http, { FractalResponseList } from '@/api/http';

export interface StoreResource {
    id: number;
    name: string;
    description: string;
    cost: number;
    type: 'cpu' | 'memory' | 'disk' | 'slots' | 'ports' | 'backups' | 'databases';
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default (): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/store')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
