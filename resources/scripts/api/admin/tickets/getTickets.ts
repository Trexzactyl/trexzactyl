import http, { FractalResponseList } from '@/api/http';

export interface AdminTicket {
    id: number;
    userId: number;
    title: string;
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'closed' | 'replied';
    createdAt: Date;
    updatedAt: Date;
}

export default (page: number): Promise<FractalResponseList> => {
    return new Promise((resolve, reject) => {
        http.get('/api/admin/tickets', { params: { page } })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
