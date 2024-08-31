import { Controller,Post, Body} from '@nestjs/common';
import { NewsLetterService } from './news-letter.service';

@Controller('newsletter')
export class NewsLetterController {
  constructor(private readonly newsLetterService: NewsLetterService) {}

  @Post()
  subscribe(@Body() lead: any) {
    return this.newsLetterService.subscribe(lead);
  }

}
