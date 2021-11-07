import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { NestMailerProvider } from './implementations/NestMailerProvider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // transport: config.get('EMAIL_SMTP')
        transport: {
          secure: false,
          host: config.get("EMAIL_HOST"),
          port: parseInt(config.get("EMAIL_PORT"), 10),
          auth: {
            user: config.get("EMAIL_USER"),
            pass: config.get("EMAIL_PASS"),
          }
        },
      }),
    }),
  ],
  providers: [
    {
      provide: 'MailProvider',
      inject: [NestMailerProvider],
      useClass: NestMailerProvider,
    },
  ],
  exports: [
    {
      provide: 'MailProvider',
      inject: [NestMailerProvider],
      useClass: NestMailerProvider,
    },
  ],
})
export class MailsModule { }
