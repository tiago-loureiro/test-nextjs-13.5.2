import { NextApiRequest, NextApiResponse } from 'next'

export default async function terms(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(r => setTimeout(r, 9900));
    res.status(200).json('')
}