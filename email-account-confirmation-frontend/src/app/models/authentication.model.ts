export class Register {
  name: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  url: string;
}

export class Login {
    email: string;
    password: string;
  }

export class Responsev2 {
  response: any;
  success: boolean;
  message: string;
  token: string;
}