# GitHub Profile Analyzer Backend

A Node.js backend service that analyzes GitHub user profiles using the GitHub Public API and stores useful profile insights in a MySQL database.

## Features

* Analyze any public GitHub profile using username
* Fetch profile data from GitHub Public API
* Store profile insights in MySQL
* Automatically update existing records if a profile has already been analyzed
* Retrieve all analyzed profiles
* Retrieve a specific analyzed profile by ID
* Layered architecture (Controller → Service → Repository)
* Centralized error handling
* Docker support for containerized deployment

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* Axios
* Docker

### Supporting Packages

* dotenv
* mysql2
* helmet
* morgan
* express-rate-limit

---

## Project Structure

```text
.
├── api
│   └── src
│       ├── controllers
│       │   └── profiles.controller.js
│       ├── middlewares
│       │   └── errorHandler.js
│       ├── repositories
│       │   └── profile.repository.js
│       ├── routes
│       │   └── profiles.routes.js
│       ├── services
│       │   └── profiles.service.js
│       └── utils
│           ├── appError.js
│           └── constants.js
├── config
│   └── db.js
├── database
│   └── schema.sql
├── app.js
├── server.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS github_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,

    github_id BIGINT NOT NULL UNIQUE,

    username VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255),

    bio TEXT,

    followers INT DEFAULT 0,
    following INT DEFAULT 0,

    public_repos INT DEFAULT 0,
    public_gists INT DEFAULT 0,

    account_age_days INT,

    profile_url VARCHAR(255),
    avatar_url VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Analyze GitHub Profile

Fetches a GitHub user's profile from the GitHub API and stores/updates the analysis in MySQL.

```http
POST /api/profiles/analyze/:username
```

Example:

```http
POST /api/profiles/analyze/test2026
```

---

### Get All Analyzed Profiles

Returns all stored GitHub profiles.

```http
GET /api/profiles
```

---

### Get Profile By ID

Returns a single analyzed profile.

```http
GET /api/profiles/:id
```

Example:

```http
GET /api/profiles/1
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=github_analyzer
```

> [!NOTE]
> No .env file is required if you run the project via Docker. The environment variables are already pre-configured and injected automatically inside the docker-compose.yml file.


---

## Installation

### Clone Repository

```bash
git clone https://github.com/Vishwas2607/github-profile-analyzer-backend.git

cd github-profile-analyzer-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create and configure the `.env` file.

### Create Database

Run the SQL schema located in:

```text
database/schema.sql
```

### Start Server

```bash
node server.js
```

The API will be available at:

```text
http://localhost:5000
```

---

## Running with Docker

Build and start the application:

```bash
docker compose up --build
```

---

## Sample Stored Profile

```json
{
  "id": 1,
  "github_id": 583231,
  "username": "test2026",
  "name": "Test 2026",
  "followers": 18000,
  "following": 9,
  "public_repos": 8,
  "public_gists": 8,
  "account_age_days": 5000,
  "profile_url": "https://github.com/test2026",
  "avatar_url": "https://avatars.githubusercontent.com/u/583231"
}
```

---

## Error Handling

The application uses a centralized global error handler to ensure consistent API responses and cleaner code organization.

---

## Design Decisions

* Layered architecture (Controller, Service, Repository)
* Separation of business logic and data access logic
* Automatic update of existing GitHub profiles to avoid duplicate records
* Environment-based configuration
* Dockerized setup for easy deployment

---

## Future Improvements

* Pagination for profile listing
* Search and filtering by username
* GitHub repository analytics
* Caching GitHub API responses
* Unit and integration testing
* GitHub API rate-limit monitoring

---

## Deployment

Live API URL: https://github-profile-analyzer-backend-ivri.onrender.com

---

## Author

Developed as part of a Node.js Backend Assignment.
