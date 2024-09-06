import { PartialType } from '@nestjs/swagger';
import { UpdateAssetsDto } from 'src/modules/personal-loan/dtos/update.assets.dto';

export class UpdateHomeAssetsDto extends PartialType(UpdateAssetsDto) {}
