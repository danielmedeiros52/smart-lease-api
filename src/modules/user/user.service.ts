import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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
    const returnedEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (returnedEmail === null) throw new NotFoundException('Email not found');
    return returnedEmail;
  }

  async create(userData: CreateUserDto) {
    const userEntity = new UserEntity();
    Object.assign(userEntity, userData as UserEntity);
    return this.userRepository.save(userEntity);
  }

  async update(id: string, newData: UserEntity) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) throw new NotFoundException('User not found');
    Object.assign(user, newData as UserEntity);

    return this.userRepository.save(user);
  }
}
