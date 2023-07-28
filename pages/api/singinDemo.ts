import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler (_req: NextApiRequest,
    res: NextApiResponse) {
    try
    {
        let {username,password} = _req.body;
        let info = await fetch("https://api.account.kmutnb.ac.th/api/account-api/user-authen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${process.env.ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            username: username,
            password: password,
            scopes: "personel,student,templecturer",
          }),
        });

        info = await info.json();

        res.status(200).json(info);

    }
    catch (e : any)
    {

        console.error(e);
        throw new Error(e).message;
        res.status(404);
    }
}