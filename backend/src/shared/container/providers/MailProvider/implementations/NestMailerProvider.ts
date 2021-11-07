import { Injectable, InternalServerErrorException } from '@nestjs/common';

import handlebars from 'handlebars';
import * as fs from 'fs';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
class NestMailerProvider implements IMailProvider {
  constructor(
    private mailerService: MailerService
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
          name: from?.name || process.env.EMAIL_USER,
          address: from?.email || process.env.EMAIL_PASS,
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