import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserStatus } from './enum/userStatus';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  async create(user: UserEntity) {
    return this.userRepository.save(user);
  }
  async createUserFinanceFromBoApi(user: any): Promise<UserEntity> {
    const userFinance = new UserEntity();
    userFinance.name = user.name;
    userFinance.email = user.email;
    userFinance.password = await bcrypt.hash('passDefaultFinance', 10);
    userFinance.boId = user.uid;
    userFinance.status = UserStatus.MIGRATED;
    return await this.userRepository.save(userFinance);
  }
  async update(id: string, newData: UserEntity) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) throw new NotFoundException('User not found');
    Object.assign(user, newData as UserEntity);

    return this.userRepository.save(user);
  }
}
