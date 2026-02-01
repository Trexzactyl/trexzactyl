import http from '@/api/http';

export interface UpdateLocationFields {
    short?: string;
    long?: string;
}

export default (id: number, fields: UpdateLocationFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/locations/view/${id}`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
