import http from '@/api/http';

export default (ticketId: number, status: 'open' | 'closed'): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/tickets/${ticketId}/status`, { status })
            .then(() => resolve())
            .catch(reject);
    });
};
