import http from '@/api/http';

export default (eggId: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        http.put(`/api/admin/nests/egg/${eggId}`, {}, {
            responseType: 'blob',
        })
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
