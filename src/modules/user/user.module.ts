import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFinanceEntity } from './entities/user.finance.entity';
import { UserBoEntity } from './entities/user.bo.entity';
import { EmailServiceModule } from '../email-service/email-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBoEntity], 'boApi'),
    TypeOrmModule.forFeature([UserFinanceEntity], 'finance'),
    EmailServiceModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
