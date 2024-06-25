import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

class InquiriesDTO {
  @ApiProperty({ description: 'Status of inquiries' })
  @IsString()
  @IsNotEmpty()
  ACTIVE: string;

  @ApiProperty({ description: 'Count of inquiries' })
  @IsNumber()
  @IsNotEmpty()
  COUNT: number;

  @ApiProperty({ description: 'Days of inquiries' })
  @IsNumber()
  @IsNotEmpty()
  DAYS: number;
}

class TradeLinesDTO {
  @ApiProperty({ description: 'Status of tradelines' })
  @IsString()
  @IsNotEmpty()
  ACTIVE: string;

  @ApiProperty({ description: 'Count of tradelines' })
  @IsNumber()
  @IsNotEmpty()
  COUNT: number;

  @ApiProperty({ description: 'Days of tradelines' })
  @IsNumber()
  @IsNotEmpty()
  DAYS: number;
}

class PaymentsDTO {
  @ApiProperty({ description: 'Status of payments' })
  @IsString()
  @IsNotEmpty()
  ACTIVE: string;

  @ApiProperty({ description: 'Count of payments' })
  @IsNumber()
  @IsNotEmpty()
  COUNT: number;

  @ApiProperty({ description: 'Days of payments' })
  @IsNumber()
  @IsNotEmpty()
  DAYS: number;
}

class ReportConfigDTO {
  @ApiProperty({ description: 'Status of all transaction summary' })
  @IsString()
  @IsNotEmpty()
  ALLTRANSACTIONSSUMMARY: string;

  @ApiProperty({ description: 'Inquiries details' })
  @IsNotEmpty()
  inquiries: InquiriesDTO;

  @ApiProperty({ description: 'Trade lines details' })
  @IsNotEmpty()
  tradeLines: TradeLinesDTO;

  @ApiProperty({ description: 'Payments details' })
  @IsNotEmpty()
  payments: PaymentsDTO;
}

class DataDTO {
  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  @IsOptional()
  NAMEFIRST?: string;

  @ApiProperty({ description: 'Middle name of the user' })
  @IsString()
  @IsOptional()
  NAMEMIDDLE?: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  @IsOptional()
  NAMELAST?: string;

  @ApiProperty({ description: 'Street address line 1' })
  @IsString()
  @IsOptional()
  STREET1?: string;

  @ApiProperty({ description: 'Street address line 2' })
  @IsString()
  @IsOptional()
  STREET2?: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @IsOptional()
  CITY?: string;

  @ApiProperty({ description: 'State' })
  @IsString()
  @IsOptional()
  STATE?: string;

  @ApiProperty({ description: 'ZIP code' })
  @IsString()
  @IsOptional()
  ZIP?: string;

  @ApiProperty({ description: 'Country' })
  @IsString()
  @IsOptional()
  COUNTRY?: string;

  @ApiProperty({ description: 'Housing status' })
  @IsString()
  @IsOptional()
  HOUSINGSTATUS?: string;

  @ApiProperty({ description: 'Home phone number' })
  @IsString()
  @IsOptional()
  PHONEHOME?: string;

  @ApiProperty({ description: 'Cell phone number' })
  @IsString()
  @IsOptional()
  PHONECELL?: string;

  @ApiProperty({ description: 'Work phone number' })
  @IsString()
  @IsOptional()
  PHONEWORK?: string;

  @ApiProperty({ description: 'Phone extension' })
  @IsString()
  @IsOptional()
  PHONEEXT?: string;

  @ApiProperty({ description: 'Email address' })
  @IsString()
  @IsOptional()
  EMAIL?: string;

  @ApiProperty({ description: 'IP address' })
  @IsString()
  @IsOptional()
  IPADDRESS?: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsDateString()
  @IsOptional()
  DOB?: string;

  @ApiProperty({ description: 'Social Security Number' })
  @IsString()
  @IsOptional()
  SSN?: string;

  @ApiProperty({ description: "Driver's license number" })
  @IsString()
  @IsOptional()
  DLNUMBER?: string;

  @ApiProperty({ description: "Driver's license state" })
  @IsString()
  @IsOptional()
  DLSTATE?: string;

  @ApiProperty({ description: 'Workplace name' })
  @IsString()
  @IsOptional()
  WORKNAME?: string;

  @ApiProperty({ description: 'Workplace street address line 1' })
  @IsString()
  @IsOptional()
  WORKSTREET1?: string;

  @ApiProperty({ description: 'Workplace street address line 2' })
  @IsString()
  @IsOptional()
  WORKSTREET2?: string;

  @ApiProperty({ description: 'Workplace city' })
  @IsString()
  @IsOptional()
  WORKCITY?: string;

  @ApiProperty({ description: 'Workplace state' })
  @IsString()
  @IsOptional()
  WORKSTATE?: string;

  @ApiProperty({ description: 'Workplace ZIP code' })
  @IsString()
  @IsOptional()
  WORKZIP?: string;

  @ApiProperty({ description: 'Workplace country' })
  @IsString()
  @IsOptional()
  WORKCOUNTRY?: string;

  @ApiProperty({ description: 'Pay period' })
  @IsString()
  @IsOptional()
  PAYPERIOD?: string;

  @ApiProperty({ description: 'Next pay date' })
  @IsDateString()
  @IsOptional()
  NEXTPAYDATE?: string;

  @ApiProperty({ description: 'Monthly income' })
  @IsString()
  @IsOptional()
  MONTHLYINCOME?: string;

  @ApiProperty({ description: 'Direct deposit status' })
  @IsString()
  @IsOptional()
  DIRECTDEPOSIT?: string;

  @ApiProperty({ description: 'Bank account type' })
  @IsString()
  @IsOptional()
  BANKACCOUNTTYPE?: string;

  @ApiProperty({ description: 'Bank name' })
  @IsString()
  @IsOptional()
  BANKNAME?: string;

  @ApiProperty({ description: 'Bank ABA number' })
  @IsString()
  @IsOptional()
  BANKABA?: string;

  @ApiProperty({ description: 'Bank account number' })
  @IsString()
  @IsOptional()
  BANKACCTNUMBER?: string;

  @ApiProperty({ description: 'Requested loan amount' })
  @IsString()
  @IsOptional()
  REQUESTEDLOANAMOUNT?: string;
}

class QueryDTO {
  @ApiProperty({ description: 'Credit report version' })
  @IsString()
  @IsNotEmpty()
  CRVERSION: string;

  @ApiProperty({ description: 'Track ID' })
  @IsString()
  @IsNotEmpty()
  TRACKID: string;

  @ApiProperty({ description: 'Channel' })
  @IsString()
  @IsNotEmpty()
  CHANNEL: string;

  @ApiProperty({ description: 'Inquiry type' })
  @IsString()
  @IsNotEmpty()
  INQUIRYTYPE: string;

  @ApiProperty({ description: 'Metro account type' })
  @IsString()
  @IsNotEmpty()
  METROACCOUNTTYPE: string;

  @ApiProperty({ description: 'Data details' })
  @IsNotEmpty()
  data: DataDTO;
}

export class DataXInquiryDTO {
  @ApiProperty({ description: 'Report configuration' })
  @IsNotEmpty()
  reportConfig: ReportConfigDTO;

  @ApiProperty({ description: 'Query details' })
  @IsNotEmpty()
  query: QueryDTO;
}
