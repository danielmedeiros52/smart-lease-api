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
    const newsLetter =  new NewsLetterEntity();

    newsLetter.concentment = lead.concentment === 'true' ? true : false;
    newsLetter.type = lead.type
    newsLetter.phone = lead.phone
    newsLetter.email = lead.email
    newsLetter.name = lead.name


    return await this.newsLetterRepository.create(newsLetter);

  }


}
