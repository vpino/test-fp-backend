import { StatusPersonalLoan } from '../enums/personal-loan.enum';

export interface IPersonalLoan {
  id: string;
  monthlyIncome: string;
  monthlyBills: string;
  amount: number;
  duration: string;
  assets: any;
  assetsAmount: number;
  tc: boolean;
  status: StatusPersonalLoan;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
