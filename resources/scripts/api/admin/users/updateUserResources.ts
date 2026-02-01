import http from '@/api/http';

export interface UpdateUserResourcesFields {
    credits?: number;
    serverSlots?: number;
}

export default (userId: number, fields: UpdateUserResourcesFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/users/view/${userId}/resources`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
