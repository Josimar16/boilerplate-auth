import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { addHours } from 'date-fns';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

@Injectable()
class ForgotPasswordUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @Inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @Inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('Usuário não existe');

    const newDateWithExpirationOf2Hours = addHours(new Date(), 2);

    const token = uuid();

    const a = await this.userTokensRepository.generate(
      user.id,
      token,
      newDateWithExpirationOf2Hours,
    );

    console.log(a)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Agility] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/password/reset/${token}`,
        },
      },
    });
  }
}

export { ForgotPasswordUseCase };
