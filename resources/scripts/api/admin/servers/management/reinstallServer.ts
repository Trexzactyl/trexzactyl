import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/view/${id}/manage/reinstall`)
            .then(() => resolve())
            .catch(reject);
    });
};
