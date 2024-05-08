import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST_BO_API'),
      port: this.configService.get<number>('DB_PORT_BO_API'),
      socketPath: this.configService.get<string>('DB_HOST_BO_API'),
      username: this.configService.get<string>('DB_USERNAME_BO_API'),
      password: this.configService.get<string>('DB_PASSWORD_BO_API'),
      database: this.configService.get<string>('DB_NAME_BO_API'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    };
  }
}
