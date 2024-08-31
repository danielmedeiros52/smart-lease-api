import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsLetterEntity } from './entities/news-leatter.entity';

@Injectable()
export class NewsLetterService {
  constructor(
    @InjectRepository(NewsLetterEntity)
    private readonly newsLetterRepository: Repository<NewsLetterEntity>,
  ) {}


  async subscribe(lead: any) {
    return await this.newsLetterRepository.create(lead);

  }


}
