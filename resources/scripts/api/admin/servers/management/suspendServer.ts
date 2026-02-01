import http from '@/api/http';

export default (id: number, action: 'suspend' | 'unsuspend'): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/view/${id}/manage/suspension`, { action })
            .then(() => resolve())
            .catch(reject);
    });
};
