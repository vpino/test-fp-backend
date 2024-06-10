import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateNameDto } from 'src/modules/name/dtos/create.name.dto';

export class CreateConsumerIdentityDto {
  @ApiProperty({ type: [CreateNameDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateNameDto)
  names: CreateNameDto[];
}
