# FIAP Tech Challenge API

Este projeto é uma API RESTful simples construída com o [NestJS](https://nestjs.com). Ela gerencia contas de usuários e fornece um fluxo de autenticação usando JSON Web Tokens (JWT).

## Objetivo

A API expõe um pequeno conjunto de endpoints para criar usuários, autenticá-los e listá-los. Serve como ponto de partida para os exercícios do FIAP Tech Challenge e pode ser usada como referência para projetos NestJS + TypeORM.

## Configuração

### Requisitos

- Node.js e npm
- Docker e Docker Compose (para executar o PostgreSQL)

### Variáveis de ambiente

Crie um arquivo `.env` om base em `.env.example` e preencha as variáveis abaixo:

- `DB_HOST` – host do banco de dados
- `DB_PORT` – porta do banco de dados
- `DB_USERNAME` – usuário do banco
- `DB_PASSWORD` – senha do usuário
- `DB_NAME` –  nome do banco
- `DB_ADMIN_EMAIL` – e-mail do administrador
- `JWT_SECRET` – chave usada para assinar os tokens JWT (deve corresponder ao segredo esperado pelo `AuthGuard`)
- `APP_PORT` – porta em que a aplicação Nest ficará ouvindo

### Docker Compose

Um arquivo `docker-compose.yaml` é fornecido para iniciar uma instância local do PostgreSQL. Execute:

```bash
docker compose up -d postgres
```

A aplicação Node deve ser iniciada separadamente com npm:

```bash
npm install
npm run start:dev
```

Você pode executar `npm run migration:run` antes de iniciar a aplicação para criar as tabelas do banco.

## Fluxo de autenticação

1. Crie um usuário via `POST /usuarios` informando  `nome`, `email` and `senha`.
2. Autentique-se com `POST /login` usando as mesmas credenciais. O endpoint retorna um token JWT.
3. Inclua o token no cabeçalho `Authorization` como `Bearer <token>` para acessar rotas protegidas.

## Endpoints

| Método | Caminho | Descrição |
| ------ | ---- | ----------- |
| `GET` | `/` | Verificação de saúde, retorna `Hello World!`. |
| `POST` | `/login` | Retorna um token JWT para credenciais válidas. |
| `GET` | `/usuarios` | 	Lista usuários (requer autenticação). |
| `GET` | `/usuarios/:id` | Recupera um usuário pelo ID. |
| `POST` | `/usuarios` | Cria um usuário. |
| `DELETE` | `/usuarios/:id` | Remove um usuário. |

Todas as respostas estão em JSON.

## Running tests

```bash
npm run test
```


