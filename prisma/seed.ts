// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import * as argon from 'argon2';

const prismaClient = new PrismaClient();

const fakerUser = async (): Promise<any> => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
  hash: await argon.hash(faker.internet.password()),
});

const fakerJob = (): any => ({
  title: `${faker.company.name()} is hiring`,
  description: faker.definitions.lorem.words.join(' '),
  companyName: faker.company.name(),
  position: faker.person.jobTitle(),
  requirements: 'requirements',
  postalCode: 'A1A 1A1',
  street: faker.location.street(),
  city: faker.location.city(),
  province: 'ON',
  country: 'CA',
});

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  for (let i = 0; i < fakerRounds; i++) {
    await prismaClient.user.create({ data: await fakerUser() });
    await prismaClient.job.create({ data: fakerJob() });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
