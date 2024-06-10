import { IsNotEmpty } from 'class-validator';

export class CreateNameDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  type: string;

}
