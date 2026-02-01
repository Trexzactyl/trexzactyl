import http from '@/api/http';

export default (mountId: number, eggId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/mounts/${mountId}/eggs`, { eggs: [eggId] })
            .then(() => resolve())
            .catch(reject);
    });
};
