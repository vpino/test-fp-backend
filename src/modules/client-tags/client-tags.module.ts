import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientTagsService } from './client-tags.service';
import { ClientTags } from './entities/client-tags.entity';

@Module({
  providers: [ClientTagsService],
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([ClientTags])
  ],
  exports: [ClientTagsService],

})
export class ClientTagsModule {}
