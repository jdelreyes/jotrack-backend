# JoTrack Backend

## Database Design

![UML of the database](docs/assets/images/database-design.drawio.png)

## Installation

1. Install dependencies

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
   docker compose up postgresql-jotrack -d
   ```

2. Initiate and deploy a database migration.

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
