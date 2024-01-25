export class JobResponseDto {
  id: number;
  title: string;
  description: string;
  position: string;
  requirements: string;

  companyName: string;

  postalCode: string;
  street: string;
  city: string;
  province: string;
  country: string;
  dateTimePosted: Date;
}
