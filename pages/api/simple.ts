import { NextApiRequest, NextApiResponse } from 'next'

export default async function simple(req: NextApiRequest, res: NextApiResponse) {
    const hz = req.query.q || '1';
    const headerSize = parseInt(Array.isArray(hz) ? hz[0] : hz);
    res.setHeader('x-vercel-dummy', "x".repeat(headerSize));
    res.status(200).json({"size": headerSize});
}