import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AccountResponseDto, UserDto, UserItemDto } from './dto/user.dto';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseQueryDto } from '../common/validator/base.query.validator';
import { ApiPaginatedResponse } from '../common/interface/response.interface';
@ApiTags('User')
@ApiExtraModels(UserItemDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: AccountResponseDto })
  @Post('/create')
  async createUser(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiPaginatedResponse('entities', UserItemDto)
  // @ApiQuery({ name: 'limit', type: 'string', example: 10 })
  @Get('/list')
  findAll(@Query() query: BaseQueryDto) {
    return this.userService.findAllUsers(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @ApiParam({required: true})
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
