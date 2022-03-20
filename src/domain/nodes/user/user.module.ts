import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
