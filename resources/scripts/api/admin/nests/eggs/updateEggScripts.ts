import http from '@/api/http';

export interface UpdateEggScriptsFields {
    scriptInstall?: string;
    scriptEntry?: string;
    scriptContainer?: string;
    copyScriptFrom?: number;
}

export default (eggId: number, fields: UpdateEggScriptsFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/nests/egg/${eggId}/scripts`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
