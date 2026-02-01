import http from '@/api/http';

export interface UpdateServerDetailsFields {
    name?: string;
    description?: string;
    ownerId?: number;
    externalId?: string;
}

export interface UpdateServerBuildFields {
    allocationId?: number;
    memory?: number;
    swap?: number;
    io?: number;
    cpu?: number;
    disk?: number;
    threads?: string;
    featureLimits?: {
        databases?: number;
        allocations?: number;
        backups?: number;
    };
}

export interface UpdateServerStartupFields {
    startup?: string;
    environment?: Record<string, string>;
    eggId?: number;
    image?: string;
    skipScript?: boolean;
}

export const updateDetails = (id: number, fields: UpdateServerDetailsFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/servers/view/${id}/details`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};

export const updateBuild = (id: number, fields: UpdateServerBuildFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/servers/view/${id}/build`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};

export const updateStartup = (id: number, fields: UpdateServerStartupFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch(`/api/admin/servers/view/${id}/startup`, fields)
            .then(() => resolve())
            .catch(reject);
    });
};
