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

1. Instantiate a PostgreSQL instance and apply the Prisma migration to the database.

   ```shell
   npm run db:dev:restart
   ```

2. Start the application.

   ```shell
   npm run start:dev
   ```

## Troubleshooting

### Restarting

1. Stop the application.
2. Restart database and re-apply migration.

   ```shell
   npm run db:dev:restart
   ```

3. Restart the application.

### Visualization

1. View data in a tabular format.

   ```shell
   npx prisma studio
   ```

2. Navigate to <http://localhost:5555/>.

## API Endpoints

#### Legends

- `V` - Visitor
- `U` - User
- `A` - Admin

### Auth - `/api/auth`

| Endpoint  | Method | Description     | Role Access          |
| --------- | ------ | --------------- | -------------------- |
| `/signup` | `POST` | Register a user | <center>`V`</center> |
| `/login`  | `POST` | Log in a user   | <center>`V`</center> |

### Users - `/api/users`

| Endpoint      | Method   | Description     | Role Access                    |
| ------------- | -------- | --------------- | ------------------------------ |
| N/A           | `GET`    | Retrieve users  | <center>`V`, `U`, `A`</center> |
| N/A           | `PUT`    | Change password | <center>`U`, `A`</center>      |
| `/{{userId}}` | `PUT`    | Update a user   | <center>`A`</center>           |
| `/{{userId}}` | `DELETE` | Remove a user   | <center>`A`</center>           |
| `/{{userId}}` | `GET`    | Retrieve a user | <center>`V`, `U`, `A`</center> |

### Jobs - `/api/jobs`

| Endpoint     | Method   | Description    | Role Access                    |
| ------------ | -------- | -------------- | ------------------------------ |
| N/A          | `GET`    | Retrieve jobs  | <center>`V`, `U`, `A`</center> |
| N/A          | `POST`   | Create a job   | <center>`A`</center>           |
| `/{{jobId}}` | `PUT`    | Update a job   | <center>`A`</center>           |
| `/{{jobId}}` | `DELETE` | Remove a user  | <center>`A`</center>           |
| `/{{jobId}}` | `GET`    | Retrieve a job | <center>`V`, `U`, `A`</center> |

### Job Applications - `/api/job-applications`

| Endpoint        | Method | Description                    | Role Access                    |
| --------------- | ------ | ------------------------------ | ------------------------------ |
| N/A             | `GET`  | Retrieve job applications      | <center>`V`, `U`, `A`</center> |
| `/applications` | `GET`  | Retrieve user job applications | <center>`U`</center>           |
| `/apply`        | `POST` | Apply for a job                | <center>`U`</center>           |

### Non-Functional Endpoints

| Endpoint        | Method | Description                    | Role Access                    |
| --------------- | ------ | ------------------------------ | ------------------------------ |
| `/applications` | `GET`  | Retrieve user job applications | <center>`U`</center>           |
