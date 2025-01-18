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
import { AccountResponseDto, UpdateUserDto, UserDto, UserQueryDto } from "./dto/user.dto";
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: AccountResponseDto })
  @Post('/create')
  async createUser(@Body() createUserDto: UserDto) {
    // if (createUserDto){
    // }
    return this.userService.create(createUserDto);
  }
  // @ApiQuery({ name: 'limit', type: 'string', example: 10 })
  @Get('/list')
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @ApiParam({required: true})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
