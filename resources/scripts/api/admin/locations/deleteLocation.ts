import http from '@/api/http';

export default (locationId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/admin/locations/${locationId}`)
            .then(() => resolve())
            .catch(reject);
    });
};
