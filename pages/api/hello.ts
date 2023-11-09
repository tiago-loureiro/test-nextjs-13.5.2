import { NextApiRequest, NextApiResponse } from 'next'

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    const hz = req.query.q || '1';
    console.log(hz);
    const headerSize = parseInt(Array.isArray(hz) ? hz[0] : hz);
    console.log("Header size: " + headerSize);
    res.setHeader('x-vercel-dummy', "x".repeat(headerSize));
    res.status(200).json({"size": headerSize});
}