import http from '@/api/http';

export interface UpdateEggVariableFields {
    name?: string;
    description?: string;
    envVariable?: string;
    defaultValue?: string;
    userViewable?: boolean;
    userEditable?: boolean;
    rules?: string;
}

export default (eggId: number, variableId: number, fields: UpdateEggVariableFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/nests/egg/${eggId}/variables/${variableId}`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
