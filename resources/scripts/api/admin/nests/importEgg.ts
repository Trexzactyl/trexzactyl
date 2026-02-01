import http from '@/api/http';

export default (eggFile: File, nestId: number): Promise<void> => {
    const formData = new FormData();
    formData.append('file', eggFile);
    formData.append('nest_id', nestId.toString());

    return new Promise((resolve, reject) => {
        http.post('/api/admin/nests/import', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(() => resolve())
            .catch(reject);
    });
};
