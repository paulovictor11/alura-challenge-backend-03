import Papa from 'papaparse';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const file = req.body;
        const lines = file.split('\n');
        const records = lines.filter((row: string) => row.includes(','));
        console.log(records);
    } catch (err: any) {
        res.status(400).json({
            message: 'Erro ao fazer a importação das transações',
        });
    }
}
