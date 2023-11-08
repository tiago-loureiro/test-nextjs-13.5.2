import { NextApiRequest, NextApiResponse } from 'next'

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(r => setTimeout(r, 1000));
    res.setHeader('x-vercel-dummy', "x".repeat(64000));
    res.status(200).json('')
}