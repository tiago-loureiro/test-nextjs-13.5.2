import { NextApiRequest, NextApiResponse } from 'next'

export default async function terms(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
    try {
        console.log('connecting');
        //     const version = await fetch(
        // `https://pactsafe.io/published?sid=${process.env.NEXT_PRIVATE_CL_IRONCLAD_SID}&gkey=${process.env.NEXT_PRIVATE_CL_IRONCLAD_GKEY}`,
        // { method: 'GET', headers: { accept: 'application/json' } },
        // )
        // .then((resp) => resp.json())
        // .then((resp) => resp[process.env.NEXT_PRIVATE_CL_IRONCLAD_TERMS_CID || ''],
        // )
        // if (!version) throw new Error('Unable to fetch version');

        await fetch('https://pactsafe.io/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            site_id: process.env.NEXT_PRIVATE_CL_IRONCLAD_SID,
            signer_id: req.query.address || '',
            verson: 'version',
            event_type: 'agreed',
            server_side: true,
            }),
        })
        await new Promise(r => setTimeout(r, 2000));
        throw Error("123");

        res.status(200).json('')
        } catch (error) {
            console.error(error)
            res.status(200).json(error)
        }
    } else {
        res.status(500)
    }
}