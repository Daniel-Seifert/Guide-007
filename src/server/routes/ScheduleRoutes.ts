import * as Express from 'express';
import { Request, Response } from 'express';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';

export const ScheduleRoutes = (app: Express.Application) => {
  app.post('/schedule', async (req: Request, res: Response) => {
    const cookie = req.body.cookie;
    const date = new Date(req.body.date);
    await HttpService.get(`https://zpa.cs.hm.edu/student/ws_get_week_plan/?date=${date.toISOString().split('T')[0]}`, {
      headers: { Cookie: cookie },
    }).then(async (response) => {
      res.status(200).json(response.data);
    })
      .catch((error) => {
        res.status(404).json(`Error during login into ZPA!\n${error}`);
      });
  });
};
