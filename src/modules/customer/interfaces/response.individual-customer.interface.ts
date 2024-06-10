import { StatusKyc } from "src/common/enums/customer.enums";

export interface IResponseIndividualCustomer {
  submissionId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: StatusKyc
}