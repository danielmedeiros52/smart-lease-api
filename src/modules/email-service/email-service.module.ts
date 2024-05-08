import { Module } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';

@Module({
  controllers: [],
  providers: [EmailServiceService],
  exports: [EmailServiceService],
})
export class EmailServiceModule {}
