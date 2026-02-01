import http from '@/api/http';

export default (eggId: number, variableId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/nests/egg/${eggId}/variables/${variableId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
