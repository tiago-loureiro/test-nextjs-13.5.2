import { NextApiRequest, NextApiResponse } from 'next'

export default async function terms(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(r => setTimeout(r, 12000));
    res.status(200).json('')
}