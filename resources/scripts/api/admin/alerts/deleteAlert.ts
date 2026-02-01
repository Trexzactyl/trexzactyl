import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/alerts/remove', { id }) // Based on Step 690: POST admin/alerts/remove
            .then(() => resolve())
            .catch(reject);
    });
};
