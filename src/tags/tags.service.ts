import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTagResponseDto } from './dto/read-tag.dto';
import { Tags } from './entity/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private tagRepository: Repository<Tags>,
  ) {}

  async getAllTags() {
    const tags = await this.tagRepository.find();
    return tags.map((tag) => tag as GetTagResponseDto);
  }
}
