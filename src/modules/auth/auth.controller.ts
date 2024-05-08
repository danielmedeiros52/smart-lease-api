import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: Partial<AuthDto>) {
    return this.authService.login(email!, password!);
  }
  @Put('activate/:token')
  activate(@Param('token') token: string, @Body() password: string) {
    return this.authService.activate(token, password);
  }

  @Post('resend-activation/:token')
  resendActivation(@Param('token') token: string) {
    return this.authService.resendActivation(token);
  }
  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }
}
