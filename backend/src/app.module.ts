import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccountsModule } from './modules/accounts/accounts.module';

import { MailsModule } from './shared/container/providers/MailProvider/mails.module';

import configuration from './shared/infra/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('database'),
    }),
    MailsModule,
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
