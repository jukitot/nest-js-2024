import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseQueryDto } from '../common/validator/base.query.validator';
import { paginate, paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { raw } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private usersList = [];
  async create(createUserDto: UserDto) {
    const index = new Date().valueOf();
    this.usersList.push({ ...createUserDto, id: index });
    return this.usersList[0];
  }

  async findAllUsers(query?: BaseQueryDto): Promise<any> {
    const options = {
      page: +query?.page | 1,
      limit: +query?.limit || 10,
    };


    // const select = 'email, "firstName", age, id, "createdAt"'

    // queryBuilder
    //   .select('email, "firstName", age, id, "created"')
    //   .where({ isActive: true });
    // if (query.search) {
    //   queryBuilder.andWhere(`LOWER("firstName") LIKE '%${query.search}'`);
    // }
    //
    // const [pagination, rawEntities] = await paginateRawAndEntities(
    //   queryBuilder,
    //   options,
    // );

    // return queryBuilder.getMany();

    // return {
    //   page: pagination.meta.currentPage,
    //   pages: pagination.meta.totalPages,
    //   countItems: pagination.meta.totalItems,
    //   entities: rawEntities,
    // };

    //--------//
    // const queryBuilder = await this.userRepository
    //     .createQueryBuilder('user')
    //     .leftJoinAndSelect('user.posts', 'post')
    //     .where('"isActive" = true')
    //     .skip((options.page - 1) * options.limit)
    //     .take(options.limit);

    // const count = await queryBuilder.getCount();
    // return {
    //     page: options.page,
    //     pages: Math.ceil(count/options.limit),
    //     countItems: count,
    //     entities: await queryBuilder.getMany(),
    //   };



    const [entities, total] = await this.userRepository.findAndCount({
      where: { isActive : true },
      select: {
        email: true,
        firstName: true,
        id: true
      },
      relations: {
        posts: true
      },
      skip: (options.page - 1) * options.limit,
      take: options.limit
    })


    return {
        page: options.page,
        pages: Math.ceil(total/options.limit),
        countItems: total,
        entities: entities,
      };
  }

  findOne(id: number) {
    return this.usersList.find((user) => user.id == id);
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
