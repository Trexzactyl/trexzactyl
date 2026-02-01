import http from '@/api/http';

export interface CreateEggVariableFields {
    name: string;
    description: string;
    envVariable: string;
    defaultValue: string;
    userViewable: boolean;
    userEditable: boolean;
    rules: string;
}

export default (eggId: number, fields: CreateEggVariableFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/nests/egg/${eggId}/variables`, fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
