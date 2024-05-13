import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { HashPasswordPipe } from '../../pipes/hash-password.pipe';
import { ListUserDto } from './dto/ListUser.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...userData }: CreateUserDto,
    @Body('password', HashPasswordPipe) hashedPass: string,
  ) {
    const createdUser = await this.userService.create({
      ...userData,
      password: hashedPass,
    });
    return {
      message: 'User created successfully',
      user: new ListUserDto(createdUser.id, createdUser.name),
    };
  }
}
