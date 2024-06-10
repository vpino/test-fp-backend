export interface IEmailData {
  email: string | string[];
  name: string | string[];
  subject: string;
  mainMessage: string;
  secondMessage: string;
  actionTag?: string;
  url?: string;
  logo?: string;
}
