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
        let loginBody = {
          username: username,
          password: password,
          csrfmiddlewaretoken: csrfToken,
        };
        await HttpService.post('https://zpa.cs.hm.edu/login/ws_login', loginBody).then((response) => {
          res.status(200).json(response.data.csrfmiddlewaretoken);
        });
      })
      .catch((error) => {
        res.status(404).json(`Error during login into ZPA!\n${error}`);
      });
  });
};
