import http from '@/api/http';

export default (): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/mail/test')
            .then(() => resolve())
            .catch(reject);
    });
};
