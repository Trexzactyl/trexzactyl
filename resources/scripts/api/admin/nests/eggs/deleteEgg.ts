import http from '@/api/http';

export default (eggId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/nests/egg/${eggId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
