import { IsNotEmpty } from 'class-validator';

export class CreateInformationalMessageDto {
  @IsNotEmpty()
  messageNumber: string;

  @IsNotEmpty()
  messageNumberDetailed: string;

  @IsNotEmpty()
  messageText: string;

}
