import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../database/entities/post.entity';

@Injectable()
export class PostService {
  private logger: Logger;
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(data: PostDto) {
    try {
      const post = await this.postRepository.save(
        this.postRepository.create({
          ...data,
          user_id: '59c335d7-121f-4a87-ab48-6f6b3f32ec82',
        }),
      );
      return post;
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException('Create post failed');
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: PostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
