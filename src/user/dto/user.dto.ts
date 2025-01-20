import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from '../../common/decorators/password.decorator';
import { IsCityAllow } from '../../common/decorators/city.decorator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim())
  email: string;
  @IsOptional()
  @ApiProperty({ required: false })
  firstName: string;
  @ApiProperty({
    default: 'Cherkasy',
    required: false,
    description: 'User city',
    example: 'Poltava',
  })
  @IsCityAllow({
    groups: ['Lviv', 'Odessa', 'Kharkiv'],
    message: 'City is not allowed',
  })
  city: string;

  @ApiProperty()
  password: string;
  @IsNumberString()
  @ApiProperty()
  age: number;
}

export class PersonalDto {
  @ApiProperty()
  dateBirth: string;
  @ApiProperty()
  language: string;
}

export class ForgotPassword {
  @IsString()
  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])\S*$/, {
    message: 'Password must have 1 upper case',
  })
  password: string;
  @IsNotEmpty()
  @Match('password', { message: 'Password must match' })
  repeatPassword: string;
}

export class AccountResponseDto extends IntersectionType(UserDto, PersonalDto) {
  @ApiProperty()
  status: boolean;
}

export class UserQueryDto {
  @ApiProperty()
  limit: string;
  @ApiProperty()
  sort: string;
  @ApiProperty()
  page: string;
}
export class UpdateUserDto {}
