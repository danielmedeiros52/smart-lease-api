import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DB_URL_NO_SSL'),
      synchronize: true,
      dropSchema: false,
      ssl: true,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    };
  }
}
