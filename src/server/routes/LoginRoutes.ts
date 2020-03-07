import * as Express from 'express';
import { Request, Response } from 'express';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';

export const LoginRoutes = (app: Express.Application) => {
  app.post('/login', async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    await HttpService.get('https://zpa.cs.hm.edu/login/ws_get_csrf_token')
      .then(async (tokenRes) => {
        const csrfToken = tokenRes.data.csrfmiddlewaretoken;
        await HttpService.post(
          'https://zpa.cs.hm.edu/login/ws_login/',
          `csrfmiddlewaretoken=${csrfToken}&username=${username}&password=${password}`,
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        ).then((response) => {
          const cookieHeader: string = response.headers['set-cookie'].join('');
          res.status(200).json({
            token: response.data.csrfmiddlewaretoken,
            sessionID: extractSessionID(cookieHeader),
          });
        });
      })
      .catch((error) => {
        res.status(404).json(`Error during login into ZPA!\n${error}`);
      });
  });
};

function extractSessionID(setCookie: string) {
  const start = setCookie.indexOf('sessionid=');
  const end = setCookie.indexOf(';', start) > 0 ? setCookie.indexOf(';', start) : setCookie.length;
  const sessionID = setCookie.substring(start, end);
  console.log(`Session id is: ${sessionID}`);
  return sessionID;
}
