
export interface User {

  id: number;
  name: string;
  surname: string;
  country: string;
  city: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  isAdministrator: boolean;
  isBlocked: boolean;
}
