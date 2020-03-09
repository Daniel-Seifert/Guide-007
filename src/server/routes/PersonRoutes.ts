import * as Express from 'express';
import { Request, Response } from 'express';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';
import { IPersonEntry } from '@shared/modules/person/state';

export const PersonRoutes = (app: Express.Application) => {
  app.post('/persons', async (req: Request, res: Response) => {
    await HttpService.get('https://www.cs.hm.edu/die_fakultaet/ansprechpartner/professoren/index.de.html')
      .then(response => {
        const htmlData: string = response.data;
        const personRegex: RegExp = /<div\s+class="contact-person-list">\n*?<img\s+src="(.*?)".*?\n<div\s+class="contact-person-name">\n(.*?)<br.\/>Raum:(.*?)\n<\/div>/g;
        const allPersons: IPersonEntry[] = [];
        let match = personRegex.exec(htmlData);
        while (match != null) {
          allPersons.push({
            avatarSource: match[1],
            name: match[2],
            room: match[3],
          });
          match = personRegex.exec(htmlData);
        }
        res.status(200).json({
          allPersons: allPersons,
        });
      }).catch(err => {
        console.log(err);
      });
  });
};