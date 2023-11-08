import { NextApiRequest, NextApiResponse } from 'next'

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    const headerSize = 100000
    res.setHeader('x-vercel-dummy', "x".repeat(headerSize));
    res.status(200).json({"size": headerSize});
}