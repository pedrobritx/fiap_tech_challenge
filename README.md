# FIAP Tech Challenge API

This project is a simple RESTful API built with [NestJS](https://nestjs.com). It manages user accounts and provides an authentication flow using JSON Web Tokens (JWT).

## Purpose

The API exposes a small set of endpoints to create users, authenticate and list them. It is meant to be a starting point for the FIAP Tech Challenge exercises and can be used as a reference for NestJS + TypeORM projects.

## Setup

### Requirements

- Node.js and npm
- Docker and Docker Compose (to run PostgreSQL)

### Environment variables

Create a `.env` file based on `.env.example` and fill in the following variables:

- `DB_HOST` – database host
- `DB_PORT` – database port
- `DB_USERNAME` – database user
- `DB_PASSWORD` – user password
- `DB_NAME` – database name
- `DB_ADMIN_EMAIL` – administrator e‑mail
- `JWT_SECRET` – key used to sign JWT tokens (must match the secret expected by `AuthGuard`)
- `APP_PORT` – port where the Nest application will listen

### Docker Compose

A `docker-compose.yaml` is provided to start a local PostgreSQL instance. Run:

```bash
docker compose up -d postgres
```

The Node application should be started separately with npm:

```bash
npm install
npm run start:dev
```

You can execute `npm run migration:run` before starting the app to create the database tables.

## Authentication flow

1. Create a user via `POST /usuarios` supplying `nome`, `email` and `senha`.
2. Authenticate with `POST /login` using the same credentials. The endpoint returns a JWT token.
3. Include the token in the `Authorization` header as `Bearer <token>` to access protected routes.

## Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/` | Health check, returns `Hello World!`. |
| `POST` | `/login` | Returns a JWT token for valid credentials. |
| `GET` | `/usuarios` | Lists users (requires authentication). |
| `GET` | `/usuarios/:id` | Retrieves a user by ID. |
| `POST` | `/usuarios` | Creates a user. |
| `DELETE` | `/usuarios/:id` | Removes a user. |

All responses are in JSON.

## Running tests

```bash
npm run test
```


