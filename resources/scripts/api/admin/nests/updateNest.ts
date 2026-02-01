import http from '@/api/http';

export interface UpdateNestFields {
    name?: string;
    description?: string;
    author?: string;
}

export default (id: number, fields: UpdateNestFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/nests/view/${id}`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
