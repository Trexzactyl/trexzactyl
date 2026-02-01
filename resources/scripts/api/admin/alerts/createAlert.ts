import http from '@/api/http';

export interface CreateAlertFields {
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
}

export default (fields: CreateAlertFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/alerts', fields) // Based on Step 757 output: PATCH admin/alerts
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
