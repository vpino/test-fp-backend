
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Name } from './entities/name.entity';
import { NameService } from './name.service';
import { NameController } from './name.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Name])],
  controllers: [NameController],
  providers: [NameService],
  exports: [NameService],
})
export class NameModule {}
