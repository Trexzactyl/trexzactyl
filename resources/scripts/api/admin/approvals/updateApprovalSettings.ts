import http from '@/api/http';

export interface UpdateApprovalSettingsFields {
    enabled?: boolean;
    [key: string]: any;
}

export default (fields: UpdateApprovalSettingsFields): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/admin/approvals', fields)
            .then(() => resolve())
            .catch(reject);
    });
};
