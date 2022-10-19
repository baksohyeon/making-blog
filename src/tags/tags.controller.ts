import { Controller, Get } from '@nestjs/common';
import { GetTagResponseDto } from './dto/read-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  async getAllTags(): Promise<{ tags: string[] }> {
    return this.tagService.getAllTags();
  }
}
