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

### Auth - `/api/auth`

### Legend

- `V` - Visitor
- `U` - User
- `A` - Admin

| Endpoint  | Method | Description     | Role Access |
| --------- | ------ | --------------- | ----------- |
| `/signup` | `POST` | Register a user | `V`         |
| `/login`  | `POST` | Log in a user   | `V`         |

### Users - `/api/users`

| Endpoint      | Method   | Description     | Role Access   |
| ------------- | -------- | --------------- | ------------- |
| N/A           | `GET`    | Retrieve users  | `V`, `U`, `A` |
| N/A           | `PUT`    | Change password | `U`, `A`      |
| `/{{userId}}` | `PUT`    | Update a user   | `U`, `A`      |
| `/{{userId}}` | `DELETE` | Remove a user   | `A`           |
| `/{{userId}}` | `GET`    | Retrieve a user | `V`, `U`, `A` |

### Jobs - `/api/jobs`

| Endpoint     | Method   | Description     | Role Access   |
| ------------ | -------- | --------------- | ------------- |
| N/A          | `GET`    | Retrieve jobs   | `V`, `U`, `A` |
| N/A          | `POST`   | Create a job    | `A`           |
| `/{{jobId}}` | `PUT`    | Update a job    | `A`           |
| `/{{jobId}}` | `DELETE` | Remove a user   | `A`           |
| `/{{jobId}}` | `GET`    | Retrieve a job  | `V`, `U`, `A` |
| `/apply`     | `POST`   | Apply for a job | `U`           |
