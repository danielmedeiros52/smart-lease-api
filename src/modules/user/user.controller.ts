import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
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
}
