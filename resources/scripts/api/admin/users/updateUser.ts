import http from '@/api/http';

interface UpdateUserFields {
    email?: string;
    username?: string;
    nameFirst?: string;
    nameLast?: string;
    password?: string;
    rootAdmin?: boolean;
}

export default (id: number, fields: UpdateUserFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/users/view/${id}`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
