import { Customer } from "src/modules/customer/entities/customer.entity";
import { IndividualCustomer } from "src/modules/individual-customer/entities/individual-customer.entity";

export interface LoginResponse {
  customer: Customer,
  individual: IndividualCustomer
}