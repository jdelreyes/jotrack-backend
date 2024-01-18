# JoTrack Backend

## Database Design
![UML of the database](docs/assets/images/database-design.drawio.png)

## Installation

## API Endpoints

### Authentication - `/api/auth`

| Endpoint  | Method | Description     |
|-----------|--------|-----------------|
| `/signup` | `POST` | Signs up a user |
| `/signin` | `POST` | Signs in a user |

### Users - `/api/users`

| Endpoint      | Method   | Description      |
|---------------|----------|------------------|
| N/A           | `GET`    | Retrieves users  |
| `/{{userId}}` | `PUT`    | Updates a user   |
| `/{{userId}}` | `DELETE` | Deletes a user   |
| `/{{userId}}` | `GET`    | Retrieves a user |

### Jobs - `/api/jobs`

| Endpoint     | Method   | Description     |
|--------------|----------|-----------------|
| N/A          | `GET`    | Retrieves jobs  |
| N/A          | `POST`   | Creates a job   |
| `/{{jobId}}` | `PUT`    | Updates a job   |
| `/{{jobId}}` | `DELETE` | Deletes a job   |
| `/{{jobId}}` | `GET`    | Retrieves a job |
| `/apply`     | `POST`   | Apply for a job |


