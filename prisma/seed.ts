import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import * as argon from 'argon2';

const prismaClient: PrismaClient = new PrismaClient();

(async function main(): Promise<void> {
  const fakerRounds: number = 10;
  dotenv.config();

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
    hash: await argon.hash('password'),
    address: {
      create: {
        ...fakerAddress(),
      },
    },
  });

  const fakerJob1 = async (): Promise<any> => ({
    title: 'Applications Developer',
    description: `Ontario Power Generation (OPG) is looking for a dynamic, strategic, and results-driven professional to join our team in the role of Applications Developer.

    Reporting to the Section Head, Information Systems, this position is responsible for developing new IT applications and enhancing existing ones. You will assist and develop all stages of the product development lifecycle.
    
    The successful candidate for this role will be a highly skilled full stack developer with outstanding problem solving skills and eagerness to learn and adapt in a fast paced industry.
    
    This is an exciting opportunity to work in an environment where you will contribute to OPG’s public outreach, engagement, and education efforts as part of the company’s commitment to growing its social license.`,
    position: 'Applications Developer',
    requirements: [
      'Minimum experience of +2 years and up to and including 6 years of experience is required working in software development is considered necessary for this position.',
      'Expertise in Angular / #NET and SQL Server.',
      'Knowledge of working in Azure DevOps,',
      'Knowledge of other modern programming languages/technologies & JSON will be an additional asset.',
      'Good verbal and written communications skills.',
    ],
    companyName: 'Ontario Power Generation',

    postalCode: 'L1W 3J2',
    street: '',
    city: 'Pickering',
    province: 'ON',
    country: 'CA',
  });

  const fakerJob2 = async (): Promise<any> => ({
    title: 'Mobile Application Developer',
    description: `As our new Mobile Application Developer, you will be a key addition to our development/technical team. We will count on you to develop important applications that will integrate with our current technology and platforms, as well as new technologies to drive us forward in an ever-changing industry. You will be tasked with application development, initial QA, some installations, maintenance, and necessary updates, etc. As our company evolves, so will our technological needs.

    This will require you to be innovative and cutting edge in order to optimize current systems and continuously develop application add-ons and integrations to meet our customers ever changing verticals. If you are ambitious, innovative, determined, hard-working, and have experience as a software developer, then this may be the career that you have been looking for.`,
    position: 'Mobile Application Developer',
    requirements: [
      '3-5 years of experience doing mobile applications development',
      'Experience using Kotlin/Java/Java Scripts/RESTful API’s web services',
      'Experience with UI/UX, React Native',
      'Experience with Version Control Platforms.',
      'Experience using Jira, and documentation using Confluence.',
    ],
    companyName: 'WeVend',

    postalCode: 'M2N 6C6',
    street: '',
    city: 'North York',
    province: 'ON',
    country: 'CA',
  });

  const fakerJob3 = async (): Promise<any> => ({
    title: 'Frontend Javascript Developer',
    description: `ARTERNAL CRM (Customer Relationship Management) is an up-and-coming player in the technology of the contemporary art scene! We’re looking for talented a talented developer to help add in new features on our web app. On this team, you’ll have tremendous impact on the product. You will be building out core features of the product and implementing future projects on the roadmap.

    As a fresh startup, we are using all the latest technologies and tools available, so we are not looking for a specific skill set with x years of experience. We are seeking an intelligent individual willing to work hard, learn and help us get things done. We are looking for someone who understands startups and wants to be part of small but fast growing company.`,
    position: 'Frontend Javascript Developer',
    requirements: [
      'Get familiar with our current tech stack and implement new features in the frontend',
      'Analyze current performance, discover bottlenecks and help improve client side performance',
      'Experience with some frontend javascript libraries. Eg. Angular, React, Vue.',
      'Functional programming concepts',
      'Work with the design team to help build out the UI/UX',
    ],
    companyName: 'Arternal',

    postalCode: '',
    street: '',
    city: 'Toronto',
    province: 'ON',
    country: 'CA',
  });

  const fakerJob4 = async (): Promise<any> => ({
    title: 'Junior Backend Developer',
    description: `What Will You Be Doing
    Backend architecture, design, development, and security.
    Design and develop RESTful APIs, API integrations, GraphQL, micro-services and more.
    Perform coding, debugging, testing, and troubleshooting throughout the development application process.
    Work with stakeholders, product managers, designers, and business units to execute the roadmap and support the multiple banners.
    Support updates, improvements, and quickly resolve issues.
    Ensure consistently excellent performance including load times & bug-free core functionality.`,
    position: 'Junior Backend Developer',
    requirements: [
      'Keen awareness and understanding of performance, security, and other software development best practices.',
      'Proven technical skills using technologies and frameworks including PHP, CodeIgniter, SQL, and Laravel.',
      'Good knowledge of frontend development with languages like HTML, CSS, JavaScript, and more.',
      'Experience building and maintaining RESTful APIs and backend procedures.',
      'Experience with design and development of databases MSSQL, SQL, NoSQL, and Cosmos.',
    ],
    companyName: "Leon's",

    postalCode: '',
    street: '45 Gordon Mackay Road',
    city: 'Toronto',
    province: 'ON',
    country: 'CA',
  });

  const fakerJob5 = async (): Promise<any> => ({
    title: 'Marketing Manager',
    description: `The Accencis Group Inc. stands as a prominent franchisor in Canada, specializing in a multi-branded approach across various industries, notably food and beverages. With an impressive portfolio of10+ brands and a network of 40+restaurants, we have solidified our presence in the market.

    Leveraging over 8 years of franchise expertise, we have successfully guided corporations toward financial success through our comprehensive management processes.
    
    As a collection of renowned dining establishments, including The Captain's Boil, %Arabica, Midori, and Dear Saigon, the Accencis Group sets itself apart from other restaurant groups by prioritizing unique and innovative dining experiences for our valued guests. Our distinguished journey began in 2014 as a single location and accelerated its expansion in 2020, leading us to establish a Canada-wide chain of 40+restaurants. Throughout our growth, we have continually introduced innovative concepts and turnkey solutions, resulting in a diverse portfolio of 10+ brands. %Arabica is scheduled to open 7 new locations in key trade areas by the end of 2025.
    
    The Accencis team comprises seasoned industry experts who possess a deep understanding of driving profitable growth. We are a collective of entrepreneurs, investors, executives, former franchisors, and franchisees, all highly motivated to deliver reliable service to our esteemed clients. With our combined knowledge and dedication, we strive to exceed expectations and foster long-term success in the dynamic world of franchising.`,
    position: 'Marketing Manager',
    requirements: [
      "Bachelor's degree in Marketing, Business, or a related field; MBA is a plus.",
      'Proven experience in marketing operations, preferably in the food and beverage industry.',
      'Excellent project management skills with the ability to manage multiple priorities.',
      'Effective communication and collaboration skills.',
      'Familiarity with the latest trends and technologies in marketing operations.',
    ],
    companyName: 'Accencis Group',

    postalCode: 'L4S 0G6',
    street: '',
    city: 'Richmond Hill',
    province: 'ON',
    country: 'CA',
  });

  await prismaClient.user.create({ data: await fakerAdmin() });
  for (let i: number = 0; i < fakerRounds; i++) {
    await prismaClient.user.create({ data: await fakerUser() });
  }

  await prismaClient.job.create({ data: await fakerJob1() });
  await prismaClient.job.create({ data: await fakerJob2() });
  await prismaClient.job.create({ data: await fakerJob3() });
  await prismaClient.job.create({ data: await fakerJob4() });
  await prismaClient.job.create({ data: await fakerJob5() });
})()
  .catch((e) => console.error(e))
  .finally(async (): Promise<void> => {
    await prismaClient.$disconnect();
  });
