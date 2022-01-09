import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "../../../shared/infra/http/middlewares/constants";
import { EnsureAuthenticate } from "../../../shared/infra/http/middlewares/ensureAuthenticate";
import { RepositoriesModule } from "../repositories/repositories.module";
import { BCryptHashProvider } from "./HashProvider/implementations/BCryptHashProvider";
import { NestJWTTokenProvider } from "./TokenProvider/implementations/NestJWTTokenProvider";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    RepositoriesModule
  ],
  providers: [
    EnsureAuthenticate,
    {
      provide: 'HashProvider',
      inject: [BCryptHashProvider],
      useClass: BCryptHashProvider,
    },
    {
      provide: 'TokenProvider',
      inject: [NestJWTTokenProvider],
      useClass: NestJWTTokenProvider,
    },
  ],
  exports: [
    JwtModule,
    {
      provide: 'HashProvider',
      inject: [BCryptHashProvider],
      useClass: BCryptHashProvider,
    },
    {
      provide: 'TokenProvider',
      inject: [NestJWTTokenProvider],
      useClass: NestJWTTokenProvider,
    },
  ],
})
export class ProvidersModule { }