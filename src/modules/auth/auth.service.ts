import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { EmailServiceService } from '../email-service/email-service.service';
import { UserStatus } from '../user/enum/userStatus';
import { WalletService } from '../wallet/wallet.service';

export interface UserPayload {
  accessGroup: string;
  sub: string;
  email: string;
  userName: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailServiceService: EmailServiceService,
    private readonly walletService: WalletService,
  ) {}

  async login(email: string, password: string) {
    const user: UserEntity | null = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const payload: UserPayload = {
      sub: user.id,
      accessGroup: 'USER',
      email: user.email,
      userName: user.name,
    };
    const access_token = await this.jwtService.signAsync(payload);
    if (user.status === 'PENDING') {
      this.emailServiceService.sendAccountConfirmation(user, access_token);
      throw new UnauthorizedException(
        'User unactivated yet, check your email to activate your account.',
      );
    } else if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User not active');
    }
    const userAuthenticated = await bcrypt.compare(password, user!.password);
    if (!userAuthenticated) {
      throw new UnauthorizedException('wrong credentials');
    }
    if ((await this.walletService.findByUserId(user.id)) === null) {
      await this.walletService.createForUser(user.id);
    }
    return {
      access_token: access_token,
      data: {
        user: user,
      },
    };
  }

  async activate(token: string, { password }: any) {
    try {
      const payload: any = this.jwtService.verify(token);
      const userId = payload.sub;
      const user = await this.userService.findById(userId);
      if (user && user.status === 'ACTIVE') {
        throw new UnauthorizedException('User already activated');
      } else if (user && user.status === 'PENDING') {
        user.status = UserStatus.ACTIVE;
        user.password = await bcrypt.hash(password, 10);
        await this.userService.update(userId, user);
        await this.walletService.createForUser(userId);
        return {
          message: 'User activated',
        };
      }
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async resendActivation(token: string) {
    const payload: any = this.jwtService.decode(token);
    const userId = payload.sub;
    const user = await this.userService.findById(userId);
    if (user && user.status === 'ACTIVE') {
      throw new UnauthorizedException('User already activated');
    } else if (user && user.status === 'PENDING') {
      this.emailServiceService.sendAccountConfirmation(user, token);
      return {
        message: 'Activation email sent',
      };
    }
    throw new UnauthorizedException('User not found');
  }
  async forgotPassword(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `Have been tried reset ${email.toString()} but this user not found`,
      );
    }
    const payload: UserPayload = {
      sub: user.id,
      accessGroup: 'USER',
      email: user.email,
      userName: user.name,
    };
    const access_token = await this.jwtService.signAsync(payload);
    this.emailServiceService.sendPasswordReset(user, access_token);
    return {
      message: 'Email sent',
    };
  }
}
