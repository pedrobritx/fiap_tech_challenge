# FIAP Tech Challenge - Blog para Professores da Rede Pública

> **Solução desenvolvida para escalar a plataforma de blog dinâmico para todo o território nacional**

Este projeto é uma API RESTful robusta construída com [NestJS](https://nestjs.com) que resolve o problema da falta de uma plataforma centralizada para professores da rede pública compartilharem conhecimento e publicarem suas aulas.

## 🎯 Objetivo do Projeto

Criar uma aplicação backend escalável que permita professores e professoras da rede pública:
- **Publicar aulas** de forma prática e centralizada
- **Compartilhar conhecimento** com alunos de todo país
- **Gerenciar conteúdo educacional** através de uma API moderna
- **Escalar para território nacional** com arquitetura robusta

A API implementa todos os requisitos funcionais e técnicos do FIAP Tech Challenge, superando as expectativas com funcionalidades adicionais.

## ✅ Conformidade com Requisitos do Tech Challenge

### Requisitos Funcionais - IMPLEMENTADOS
- ✅ **GET /posts** - Listar posts
- ✅ **GET /posts/:id** - Ler post específico
- ✅ **POST /posts** - Criar post (com autenticação JWT)
- ✅ **PUT /posts/:id** - Editar post (com autenticação JWT)
- ✅ **DELETE /posts/:id** - Excluir post (com autenticação JWT)
- ✅ **GET /posts/search?q=termo** - Buscar posts por termo

### Requisitos Técnicos - IMPLEMENTADOS
- ✅ **Back-end Node.js**: NestJS (framework superior ao Express)
- ✅ **Persistência de dados**: PostgreSQL com TypeORM
- ✅ **Containerização Docker**: Dockerfile + docker-compose.yaml
- ✅ **GitHub Actions**: CI/CD automatizado
- ✅ **Documentação**: README + Swagger UI interativo
- ✅ **Cobertura de testes**: >20% com Jest

### Funcionalidades EXTRAS Implementadas
- 🚀 **Swagger UI**: Documentação interativa da API
- 🔐 **Autenticação JWT**: Sistema completo de login
- 👥 **Gestão de usuários**: CRUD completo
- 🛡️ **Validação robusta**: Pipes + Guards + Exception Filters
- 📊 **Logging**: Interceptors de monitoramento
- 🏗️ **Arquitetura**: Padrões enterprise com NestJS

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
- `DB_SSL` – indica se irá utilizar configuração SSL na conexão com o banco
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

### 📖 Documentação da API (Swagger)

Após iniciar a aplicação, acesse a documentação interativa da API:

```
http://localhost:3000/api
```

A documentação Swagger oferece:
- **Interface interativa** para testar todos os endpoints
- **Esquemas de dados** com exemplos realistas
- **Autenticação JWT** integrada
- **Respostas detalhadas** com códigos de status
- **Validações automáticas** dos dados de entrada

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

## 🚧 Desafios Enfrentados e Soluções

### 1. Compatibilidade de Dependências
**Desafio**: Conflito entre NestJS v11 e Swagger v8
**Solução**: Upgrade para @nestjs/swagger v11.2.0 compatível

### 2. Sincronização de Banco de Dados
**Desafio**: TypeORM não criava tabelas automaticamente
**Solução**: Configuração `synchronize: true` na PostgresConfigService

### 3. Tipos TypeScript Inconsistentes
**Desafio**: Conflitos entre Date/string nas entidades
**Solução**: Padronização de tipos Date em todas as entidades e DTOs

### 4. Containerização Completa
**Desafio**: Coordenar app + banco + health checks
**Solução**: Docker Compose com dependências e health checks

### 5. Documentação Interativa
**Desafio**: Implementar Swagger com autenticação JWT
**Solução**: Decorators completos + Bearer auth configurado

## 🏆 Resultados Alcançados

- **100% dos requisitos** funcionais implementados
- **Arquitetura escalável** pronta para produção
- **Documentação completa** com Swagger UI
- **CI/CD automatizado** com GitHub Actions
- **Cobertura de testes** superior ao mínimo exigido
- **Containerização completa** para deployment

## 📋 Como Usar

1. **Clone o repositório**
2. **Configure o ambiente** (.env)
3. **Execute com Docker**: `docker-compose up -d`
4. **Acesse a documentação**: http://localhost:3000/api
5. **Teste os endpoints** via Swagger UI

A solução está pronta para escalar nacionalmente e atender milhares de professores da rede pública!

