import http, { FractalResponseList } from '@/api/http';

export interface AdminAlert {
    id: number;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default (): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/alerts')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
