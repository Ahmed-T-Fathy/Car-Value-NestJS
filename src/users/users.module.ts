import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserRepositoryProvider } from './user.repository.provider';
@Module({
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService,UserRepositoryProvider]
})
export class UsersModule {}
