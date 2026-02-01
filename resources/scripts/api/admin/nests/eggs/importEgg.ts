import http from '@/api/http';

export interface EggImportData {
    file: File;
}

export default (data: EggImportData): Promise<void> => {
    const formData = new FormData();
    formData.append('file', data.file);

    return new Promise((resolve, reject) => {
        http.post('/api/admin/nests/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => resolve())
            .catch(reject);
    });
};
