import http from '@/api/http';

export interface UpdateServerStartupFields {
    startup?: string;
    environment?: Record<string, string>;
    egg?: number;
    image?: string;
    skipScripts?: boolean;
}

export default (serverId: string, fields: UpdateServerStartupFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/admin/servers/view/${serverId}/startup`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
