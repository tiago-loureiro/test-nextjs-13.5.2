import { NextApiRequest, NextApiResponse } from 'next'
import { PassThrough } from 'stream';

export default async function stream(req: NextApiRequest, res: NextApiResponse) {
    const sz = req.query.q || '1';
    const count = parseInt(Array.isArray(sz) ? sz[0] : sz);

    const myStream = new PassThrough();  
    // Write data to the stream
    myStream.write('Hello, world!');
    // Pipe the stream to the response
    res.setHeader('x-vercel-dummy', "x".repeat(count));

    let iterCount = count;
    while (iterCount > 0) {
        console.log(`Fetches left ${iterCount}`);
        await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        iterCount--;
    }

    myStream.pipe(res);    
    myStream.end();
};
