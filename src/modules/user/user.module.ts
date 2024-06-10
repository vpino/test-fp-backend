import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PersonaModule } from '../persona/persona.module';
import { Persona } from '../persona/entities/persona.entity';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Persona]),
    CommonModule,
    PersonaModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
