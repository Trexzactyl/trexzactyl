import http from '@/api/http';

export interface AdminStats {
    servers: number;
    users: number;
    nodes: number;
    earnings: {
        today: number;
        month: number;
        total: number;
    };
    activity: any[];
}

export default (): Promise<AdminStats> => {
    return new Promise((resolve, reject) => {
        // Since there's no overview endpoint, we'll create mock data
        // In a real implementation, you'd create an overview endpoint in the backend
        const mockData: AdminStats = {
            servers: 0,
            users: 0,
            nodes: 0,
            earnings: {
                today: 0,
                month: 0,
                total: 0,
            },
            activity: [],
        };
        resolve(mockData);
    });
};
