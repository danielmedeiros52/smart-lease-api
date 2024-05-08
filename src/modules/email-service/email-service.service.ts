import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserFinanceEntity } from '../user/entities/user.finance.entity';
import 'dotenv/config';
import { mailConfirmation, forgotPass } from '../../constants/mails';

@Injectable()
export class EmailServiceService {
  constructor(private readonly mailerService: MailerService) {}
  sendAccountConfirmation(user: UserFinanceEntity, token: string) {
    this.mailerService.sendMail({
      to: user.email,
      from: 'noreply@smartfastpay.com',
      subject: '[SmartFastPay - Finance] - Your account has been created!',
      html: mailConfirmation(
        user.name,
        user.email,
        `${process.env.FRONTEND_URL}/auth/activation/${token}`,
      ),
    });
  }

  sendPasswordReset(user: UserFinanceEntity, token: string) {
    this.mailerService.sendMail({
      to: user.email,
      from: 'noreply@smartfastpay.com',
      subject: '[SmartFastPay - Finance] - Reset your password',
      html: forgotPass(
        user.name,
        user.email,
        `${process.env.FRONTEND_URL}/auth/reset-password/${token}`,
      ),
    });
  }
}
