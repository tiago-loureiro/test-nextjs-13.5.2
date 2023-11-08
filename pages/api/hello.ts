import { NextApiRequest, NextApiResponse } from 'next'

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(r => setTimeout(r, 5000));
    res.setHeader('x-vercel-dummy', "xxxxxxxxxxx".repeat(20000));
    res.status(200).json('')
}