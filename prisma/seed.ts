import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import * as argon from 'argon2';

const prismaClient: PrismaClient = new PrismaClient();

const fakerAddress = (): any => ({
  postalCode: 'A1A 1A1',
  street: faker.location.street(),
  city: 'Toronto',
  province: 'ON',
  country: 'CA',
});

const fakerAdmin = async (): Promise<any> => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: 'admin@domain.ca',
  role: 'admin',
  userName: 'admin',
  phoneNumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
  hash: await argon.hash('password'),
  address: {
    create: {
      ...fakerAddress(),
    },
  },
});

const fakerUser = async (): Promise<any> => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  userName: faker.internet.userName(),
  phoneNumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
  hash: await argon.hash(faker.internet.password()),
  address: {
    create: {
      ...fakerAddress(),
    },
  },
});

const fakerJob = (): any => ({
  title: `${faker.company.name()} is hiring`,
  description: faker.definitions.lorem.words.join(' ').slice(0, 200),
  companyName: faker.company.name(),
  position: faker.person.jobTitle(),
  requirements: faker.definitions.lorem.words.slice(0, 5),
  ...fakerAddress(),
});

async function main(): Promise<void> {
  const fakerRounds: number = 10;
  dotenv.config();

  await prismaClient.user.create({ data: await fakerAdmin() });
  for (let i: number = 0; i < fakerRounds; i++) {
    await prismaClient.user.create({ data: await fakerUser() });
    await prismaClient.job.create({
      data: fakerJob(),
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async (): Promise<void> => {
    await prismaClient.$disconnect();
  });
