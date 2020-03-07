import * as Express from 'express';
import { Request, Response } from 'express';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';

export const ScheduleRoutes = (app: Express.Application) => {
  app.post('/schedule', async (req: Request, res: Response) => {
    const token = req.body.token;
    const date = new Date(req.body.date);

    console.log(`Requested token for schedule is ${token}`)
    await HttpService.get(`https://zpa.cs.hm.edu/student/ws_get_week_plan/?date=${date.toISOString().split('T')[0]}`, {
        headers:{ "X-CSRFToken" : token },
      }).then(async (response) => {
        console.log(response.data)
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(404).json(`Error during login into ZPA!\n${error}`);
      });
  });
};
