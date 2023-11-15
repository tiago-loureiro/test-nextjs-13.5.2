import { NextApiRequest, NextApiResponse } from 'next'
import { PassThrough } from 'stream';

export default async function stream(req: NextApiRequest, res: NextApiResponse) {
    const hz = req.query.q || '1';
    const headerSize = parseInt(Array.isArray(hz) ? hz[0] : hz);
    const myStream = new PassThrough();  
    // Write data to the stream
    myStream.write('Hello, world!');
    // Pipe the stream to the response
    res.setHeader('x-vercel-dummy', "x".repeat(headerSize));
    let iterCount = 100;
    while (iterCount > 0) {
        console.log(`Fetches left ${iterCount}`);
        await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        iterCount--;
    }
    myStream.pipe(res);    
    myStream.end();
};
