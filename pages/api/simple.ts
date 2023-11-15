import { count } from 'console';
import { NextApiRequest, NextApiResponse } from 'next'
import { PassThrough } from 'stream';

export default async function simple(req: NextApiRequest, res: NextApiResponse) {
    const myStream = new PassThrough();  
    // Write data to the stream
    myStream.write('Hello, world!');
    res.setHeader('x-vercel-dummy', "xello xeader");

    myStream.pipe(res);    
    myStream.end();
};
