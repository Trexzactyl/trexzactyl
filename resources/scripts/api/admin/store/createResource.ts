import http from '@/api/http';

export interface CreateResourceFields {
    name: string;
    description: string;
    cost: number;
    type: 'cpu' | 'memory' | 'disk' | 'slots' | 'ports' | 'backups' | 'databases';
    enabled: boolean;
}

export default (fields: CreateResourceFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/store/resources', fields) // Verify route? Assuming standard REST
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
