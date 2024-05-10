import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  Module,
} from '@nestjs/common';
import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DefaultExceptionHandler } from './filters/default-exception-handler';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggerGlobalInterceptor } from './interceptors/logger-global/logger-global.interceptor';
import { PostgresConfigService } from './config/postgres.config.service';
import { EmailServiceModule } from './modules/email-service/email-service.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secureConnection: false,
        ignoreTLS: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
    AuthModule,
    UserModule,
    EmailServiceModule,
    WalletModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DefaultExceptionHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
