export class UserWithAddressDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: {
    id: number;
    postalCode: string;
    street: string;
    city: string;
    province: string;
    country: string;
    userId: number;
  };
}
