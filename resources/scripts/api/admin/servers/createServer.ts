import http, { FractalResponseData } from '@/api/http';

export interface CreateServerFields {
    name: string;
    description?: string;
    ownerId: number;
    nodeId: number;
    allocationId?: number;
    eggId: number;
    dockerImage?: string;
    startup: string;
    environment: Record<string, string>;
    limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    };
    featureLimits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    deploy?: {
        locations: number[];
        dedicatedIp: boolean;
        portRange: string[];
    };
    startOnCompletion: boolean;
}

export default (fields: CreateServerFields): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/admin/servers', fields)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
