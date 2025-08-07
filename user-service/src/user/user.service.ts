import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserInput: CreateUserInput): User {
    const user: User = {
      id: randomUUID(),
      name: createUserInput.name,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }
}