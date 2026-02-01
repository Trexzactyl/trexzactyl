import http from '@/api/http';

export default (id: number, message: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/tickets/${id}/message`, { content: message })
            .then(() => resolve())
            .catch(reject);
    });
};
