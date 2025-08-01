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

Um arquivo `docker-compose.yaml` é fornecido para executar toda a aplicação com Docker:

**Opção 1: Executar apenas o banco PostgreSQL**
```bash
docker compose up -d postgres
```

Depois execute a aplicação localmente:
```bash
npm install
npm run migration:run
npm run start:dev
```

**Opção 2: Executar aplicação completa com Docker**
```bash
# Copie o arquivo de exemplo e configure as variáveis
cp .env.example .env

# Execute toda a aplicação
docker compose up -d
```

**Comandos úteis:**
```bash
# Executar migrações
npm run migration:run

# Gerar nova migração
npm run migration:generate -- src/db/migrations/NomeDaMigracao

# Ver logs da aplicação
docker compose logs app -f
```

## Fluxo de autenticação

1. Crie um usuário via `POST /usuarios` informando  `nome`, `email` and `senha`.
2. Autentique-se com `POST /login` usando as mesmas credenciais. O endpoint retorna um token JWT.
3. Inclua o token no cabeçalho `Authorization` como `Bearer <token>` para acessar rotas protegidas.

## Endpoints

### Autenticação
| Método | Caminho | Descrição |
| ------ | ---- | ----------- |
| `GET` | `/` | Verificação de saúde, retorna `Hello World!`. |
| `POST` | `/login` | Retorna um token JWT para credenciais válidas. |

### Usuários
| Método | Caminho | Descrição |
| ------ | ---- | ----------- |
| `GET` | `/usuarios` | Lista usuários (requer autenticação). |
| `GET` | `/usuarios/:id` | Recupera um usuário pelo ID. |
| `POST` | `/usuarios` | Cria um usuário. |
| `DELETE` | `/usuarios/:id` | Remove um usuário. |

### Posts (Blog)
| Método | Caminho | Descrição |
| ------ | ---- | ----------- |
| `GET` | `/posts` | Lista todos os posts disponíveis. |
| `GET` | `/posts/search?q=termo` | Busca posts por palavra-chave no título ou conteúdo. |
| `GET` | `/posts/:id` | Recupera um post específico pelo ID. |
| `POST` | `/posts` | Cria um novo post (requer autenticação). |
| `PUT` | `/posts/:id` | Edita um post existente (requer autenticação). |
| `DELETE` | `/posts/:id` | Remove um post (requer autenticação). |

Todas as respostas estão em JSON.

## Testes

O projeto inclui testes unitários para garantir a qualidade do código:

```bash
# Executar testes unitários
npm run test

# Executar com cobertura
npm run test:cov

# Executar testes e2e
npm run test:e2e

# Executar testes em modo watch
npm run test:watch
```

### Cobertura de Testes
O projeto mantém cobertura mínima de 20% conforme requisitos do Tech Challenge.

## CI/CD

O projeto utiliza GitHub Actions para automação:

- **Testes automáticos** em cada push/PR
- **Linting** e verificação de código
- **Build** da aplicação
- **Cobertura de testes** com relatórios
- **Deploy automatizado** (configurável)

## Tecnologias Utilizadas

- **Backend**: Node.js com NestJS (substitui Express com recursos superiores)
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Autenticação**: JWT
- **Containerização**: Docker & Docker Compose
- **Testes**: Jest
- **CI/CD**: GitHub Actions
- **Documentação**: Swagger/OpenAPI
- **Validação**: class-validator
- **Transformação**: class-transformer

## Arquitetura da Aplicação

### Arquitetura em Camadas:
```
┌─────────────────────────────────────┐
│           PRESENTATION              │
│     Controllers + DTOs + Pipes      │
├─────────────────────────────────────┤
│            BUSINESS                 │
│       Services + Guards             │
├─────────────────────────────────────┤
│         PERSISTENCE                 │
│     Entities + TypeORM + DB         │
└─────────────────────────────────────┘
```

### Módulos Principais:
- **PostModule**: Gerenciamento de postagens
- **UsuarioModule**: Gerenciamento de usuários  
- **LoginModule**: Autenticação JWT
- **Common**: Filtros, pipes e interceptors compartilhados

### Padrões Implementados:
- **Exception Filters**: Tratamento global de erros
- **Validation Pipes**: Validação automática de entrada
- **Guards**: Proteção de rotas com JWT
- **Interceptors**: Logs e transformação de responses
- **DTOs**: Transferência segura de dados


