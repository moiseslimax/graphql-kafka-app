import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { randomUUID } from 'crypto';
import { KafkaService } from 'src/kafka/kafka.service';
import { UserCreatedEvent } from './interface/user-created-event.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly kafkaService: KafkaService,
  ){}

  private users: User[] = [];

   async create(createUserInput: CreateUserInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: createUserInput.name,
    };

    const event: UserCreatedEvent = {
      id: user.id,
      name: user.name
    }

    await this.kafkaService.send('user.created', event)

    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }
}