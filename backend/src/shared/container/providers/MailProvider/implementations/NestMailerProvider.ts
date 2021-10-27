import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

import handlebars from 'handlebars';
import * as fs from 'fs';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

interface IMailContact {
  name: string;
  address: string;
}

export interface ISendMail {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  html: string;
}

interface IMailerService {
  sendMail(data: ISendMail): Promise<void>;
}

@Injectable()
class NestMailerProvider implements IMailProvider {
  constructor(
    @Inject('MailerService')
    private mailerService: IMailerService
  ) { }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    try {
      const templateFileContent = fs.readFileSync(templateData.file).toString("utf-8");

      const parseTemplate = handlebars.compile(templateFileContent);

      await this.mailerService.sendMail({
        from: {
          name: from.name,
          address: from.email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: parseTemplate(templateData.variables),
      });
    } catch (error) {
      new InternalServerErrorException('Não foi possível enviar o email')
    }
  }
}

export { NestMailerProvider }