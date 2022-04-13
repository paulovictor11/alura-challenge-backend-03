import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const file = req.body;

        if (!file || file === '') {
            throw new Error('Arquivo csv não pode ser vazio.');
        }

        const lines = file.split('\n');
        const records = lines.filter((row: string) => row.includes(','));
        const transactionBaseDate = records[0].split(',').slice(-1)[0].split('T')[0];
        
        records.map(async (row: string, index: number) => {
            if (row.split(',').length < 7) {
                return;
            }

            const [
                originBank, originAgency, originAccount,
                destinyBank, destinyAgency, destinyAccount,
                value, timestamp
            ] = row.split(',');

            const baseRowTimestamp = timestamp.split('T')[0];
            const rowTimestamp = new Date(baseRowTimestamp);
            const baseTimestamp = new Date(transactionBaseDate);

            if (baseTimestamp.getDate() == rowTimestamp.getDate()) {
                await prisma.transaction.create({
                    data: {
                        originBank, originAgency, originAccount,
                        destinyBank, destinyAgency, destinyAccount,
                        value, timestamp
                    }
                });
            }
        });

        res.status(201).json({
            message: 'Transações importadas com sucesso',
        });
    } catch (err: any) {
        res.status(400).json({
            message: err.message ?? 'Erro ao fazer a importação das transações',
        });
    }
}
