import http, { FractalResponseData } from '@/api/http';

interface VerifyData {
    transaction_id: string;
    nagad_transaction_id: string;
    wallet_number: string;
}

export default (data: VerifyData): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/store/nagad/verify', data)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};
