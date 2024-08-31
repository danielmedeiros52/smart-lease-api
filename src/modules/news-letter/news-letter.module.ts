import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsLetterEntity } from './entities/news-leatter.entity';
import { NewsLetterController } from './news-letter.controller';
import { NewsLetterService } from './news-letter.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsLetterEntity])],
  controllers: [NewsLetterController],
  providers: [NewsLetterService],
  exports: [NewsLetterService],
})
export class NewsLetterModule {}
