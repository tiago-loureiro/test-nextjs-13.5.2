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

    const start = new Date().getTime();
    console.log(`Starting at ${start}`);

    await Promise.all(
        [...Array(count).keys()].map(async (element) => {
            console.log(`Req nr ${element} @ ${new Date().getTime()}`);
            return fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        })
    )

    console.log(`Ended ${(new Date().getTime()) - start} ms later`);
    myStream.pipe(res);    
    myStream.end();
};
