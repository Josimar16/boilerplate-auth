import * as path from 'path';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const database: TypeOrmModuleOptions = {
  type: 'postgres',
  port: Number(process.env.DB_PORT) || 8080,
  host: process.env.DB_HOST || 'g.cti.grupobrisanet.com.br',
  username: process.env.DB_USER || 'developer',
  password: process.env.DB_PASS || 'dv1010aa',
  database: process.env.DB_NAME || 'gibraltar',
  entities: [path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'modules',
    '**',
    'infra',
    'typeorm',
    'entities',
    '*',
  ),
  ],
  synchronize: false,
  migrations: [path.resolve(__dirname, 'migrations', '*')],
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations'),
  },
  logging: ['error', 'warn']
}