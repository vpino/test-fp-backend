import { IsNotEmpty } from 'class-validator';

export class CreateEmploymentInformationDto {
  @IsNotEmpty()
  firstReportedDate: string;

  @IsNotEmpty()
  lastUpdatedDate: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  source: string;

}
