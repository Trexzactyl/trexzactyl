import http from '@/api/http';

export interface UpdateMountFields {
    name?: string;
    description?: string;
    source?: string;
    target?: string;
    readOnly?: boolean;
    userMountable?: boolean;
}

export default (id: number, fields: UpdateMountFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/mounts/view/${id}`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
