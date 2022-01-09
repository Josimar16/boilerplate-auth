import { Module } from '@nestjs/common';
import { DomainsModule } from '../../useCases/domains.module';

import { PasswordRouter } from './password.routes';
import { PermissionsRouter } from './permissions.routes';
import { ProfileRouter } from './profile.routes';
import { RolesRouter } from './roles.routes';
import { SessionsRouter } from './sessions.routes';
import { UsersRouter } from './users.routes';
@Module({
  imports: [DomainsModule],
  controllers: [
    PasswordRouter,
    PermissionsRouter,
    RolesRouter,
    ProfileRouter,
    SessionsRouter,
    UsersRouter,
  ],
})
export class RoutesModule { }