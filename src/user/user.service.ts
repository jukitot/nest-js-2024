import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../database/entities/user.entity";
import { Repository } from "typeorm";
import { BaseQueryDto } from "../common/validator/base.query.validator";
import { paginate, paginateRawAndEntities } from "nestjs-typeorm-paginate";
import { raw } from "express";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
  }
  private usersList = [];
  async create(createUserDto: UserDto) {
    const index = new Date().valueOf();
    this.usersList.push({ ...createUserDto, id: index });
    return this.usersList[0];
  }

  async findAllUsers(query?: BaseQueryDto) {
    const options = {
      page: query?.page | 1,
      limit: query?.limit || 10,
    };
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user');
    // const select = 'email, "firstName", age, id, "createdAt"'
    queryBuilder
      .select('email, "firstName", age, id, "created"')
      .where({ isActive: true });
    if (query.search) {
      queryBuilder.andWhere(`LOWER("firstName") LIKE '%${query.search}'`);
    }

    const [pagination, rawEntities] = await paginateRawAndEntities(
      queryBuilder,
      options,
    );
    return {
      page: pagination.meta.currentPage,
      pages: pagination.meta.totalPages,
      countItems: pagination.meta.totalItems,
      entities: rawEntities,
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
