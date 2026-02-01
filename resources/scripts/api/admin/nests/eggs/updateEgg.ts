import http from '@/api/http';

export interface UpdateEggFields {
    name?: string;
    description?: string;
    dockerImage?: string;
    startup?: string;
}

export default (eggId: number, fields: UpdateEggFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/nests/egg/${eggId}`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
