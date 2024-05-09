import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailServiceModule } from '../email-service/email-service.module';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailValidator } from './validate/email.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailServiceModule],
  controllers: [UserController],
  providers: [UserService, EmailValidator],
  exports: [UserService],
})
export class UserModule {}
