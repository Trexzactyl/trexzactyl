import http from '@/api/http';

export default (): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/api/new')
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
