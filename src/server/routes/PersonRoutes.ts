import * as Express from 'express';
import { Request, Response } from 'express';
import { HttpService } from '@shared/services/HttpService/HttpService';

export const PersonRoutes = (app: Express.Application) => {
  app.get('/persons', async (req: Request, res: Response) => {
    console.log('GET RECEIVED')
    await HttpService.get('https://www.cs.hm.edu/die_fakultaet/ansprechpartner/professoren/index.de.html')
      .then(response => {
        res.status(200).json({
          webPageData: response.data,
        });
      }).catch(err => {
        console.log(err.response.headers);
        console.log(err.response.status);
      });
  });
};