# JoTrack Backend

## Database Design

![UML of the database](docs/assets/images/database-design.drawio.png)

## Installation

1. Install dependencies.

   ```shell
   npm i
   ```

2. Make copy of `.env.template` file.

   ```shell
   cp .env.template .env
   ```

3. Populate fields in `.env` file.

   ```makefile
   # ...
   # jwt
   JWT_SECRET="your_jwt_secret" # change
   ```

## Running

1. Instantiate a PostgreSQL Docker image and run it as a Docker container.

   ```shell
   docker run -d -p 5432:5432 --name postgresql-jotrack -v ./data:/var/lib/postgresql/data -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=postgresql-jotrack postgres:15
   ```

2. Initiate a database migration.

   ```shell
   npx prisma migrate dev
   ```

3. Deploy the database migration.

   ```shell
   npx prisma migrate deploy
   ```

4. Start the application

   ```shell
   npm run start:dev
   ```

## Troubleshooting

1. Start the application
2. Restart database and re-apply migration
   ```shell
   npm run db:dev:restart
   ```

## API Endpoints

### Auth - `/api/auth`

| Endpoint  | Method | Description     |
| --------- | ------ | --------------- |
| `/signup` | `POST` | Signs up a user |
| `/signin` | `POST` | Signs in a user |

### Users - `/api/users`

| Endpoint      | Method   | Description      |
| ------------- | -------- | ---------------- |
| N/A           | `GET`    | Retrieves users  |
| `/{{userId}}` | `GET`    | Retrieves a user |
| `/{{userId}}` | `DELETE` | removes a user   |
