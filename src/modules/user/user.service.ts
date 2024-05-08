import { Injectable, NotFoundException } from '@nestjs/common';
import { UserFinanceEntity } from './entities/user.finance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBoEntity } from './entities/user.bo.entity';
import * as bcrypt from 'bcrypt';
import { UserStatus } from './enum/userStatus';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserFinanceEntity, 'finance')
    private readonly userRepository: Repository<UserFinanceEntity>,
    @InjectRepository(UserBoEntity, 'boApi')
    private readonly userBoApiRepository: Repository<UserBoEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }
  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
  async findByEmailOnBoApi(email: string) {
    return await this.userBoApiRepository.findOne({
      where: { email },
    });
  }
  async create(user: UserFinanceEntity) {
    return this.userRepository.save(user);
  }
  async createUserFinanceFromBoApi(
    user: UserBoEntity,
  ): Promise<UserFinanceEntity> {
    const userFinance = new UserFinanceEntity();
    userFinance.name = user.name;
    userFinance.email = user.email;
    userFinance.password = await bcrypt.hash('passDefaultFinance', 10);
    userFinance.boId = user.uid;
    userFinance.status = UserStatus.MIGRATED;
    return await this.userRepository.save(userFinance);
  }
  async update(id: string, newData: UserFinanceEntity) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) throw new NotFoundException('User not found');
    Object.assign(user, newData as UserFinanceEntity);

    return this.userRepository.save(user);
  }
}
