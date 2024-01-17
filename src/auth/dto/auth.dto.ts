export class AuthDto {
  email: string;
  password: string;

  role: string;

  firstName?: string;
  lastName?: string;

  address: {
    postalCode: string;
    street: string;
    city: string;
    province: string;
    country: string;
  };
}
