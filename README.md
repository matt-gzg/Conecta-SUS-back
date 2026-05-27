# Conecta-SUS-back

API Node.js (Express + TypeScript) para gerenciamento de atendimentos: cadastros de perfis (admins, secretarias, professores, estagiarios, pacientes), agendamentos e prontuarios.

## Stack

- Node.js + Express
- TypeScript
- TypeORM + PostgreSQL
- Celebrate/Joi para validacao

## Endpoints

Base URL: `http://localhost:3333`

Observacao: varias rotas sao protegidas por middlewares de autenticacao/autoridade. Em geral, use `Authorization: Bearer <token>` quando exigido.

### Admins

- `GET /admins` (protegido: admin)
- `POST /admins`
	- Body: `name`, `email`, `password`

### Sessions

- `POST /sessions`
	- Body: `email`, `password`

### Profile

- `GET /profile` (protegido)
- `PUT /profile` (protegido)
	- Body: `name`, `email`, `departament?`, `old_password?`, `password?`, `password_confirmation?`, `professor_id?`

### Secretarys

- `GET /secretarys` (protegido: admin)
- `GET /secretarys/:id` (protegido: admin)
- `POST /secretarys` (protegido: admin)
	- Body: `name`, `email`, `password`
- `PUT /secretarys/:id` (protegido: admin)
	- Body: `name`, `email`, `old_password?`, `password?`, `password_confirmation?`
- `DELETE /secretarys/:id` (protegido: admin)

### Professors

- `GET /professors` (protegido: secretaria)
- `GET /professors/:id` (protegido: secretaria)
- `GET /professors/intern/:intern_id` (protegido: secretaria)
- `POST /professors` (protegido: secretaria)
	- Body: `name`, `email`, `departament`, `password`
- `PUT /professors/:id` (protegido: secretaria)
	- Body: `name`, `email`, `departament`, `old_password?`, `password?`, `password_confirmation?`
- `DELETE /professors/:id` (protegido: secretaria)

### Interns

- `GET /interns` (protegido: secretaria)
- `GET /interns/:id` (protegido: secretaria)
- `GET /interns/professor/:professor_id` (protegido: secretaria)
- `POST /interns` (protegido: secretaria)
	- Body: `name`, `email`, `departament`, `password`, `professor_id`
- `PUT /interns/:id` (protegido: secretaria)
	- Body: `name`, `email`, `departament`, `old_password?`, `password?`, `password_confirmation?`, `professor_id?`
- `DELETE /interns/:id` (protegido: secretaria)

### Patients

- `GET /patients` (protegido: secretaria)
- `GET /patients/:id` (protegido: secretaria)
- `GET /patients/cpf/:cpf` (protegido: secretaria)
- `GET /patients/susnumber/:susnumber` (protegido: secretaria)
- `GET /patients/name/:name` (protegido: secretaria)
- `POST /patients` (protegido: secretaria)
	- Body: `name`, `cpf`, `susnumber`, `email?`, `birth_date`, `phone`, `gender`, `cep`, `city`, `street`, `district`, `number`, `complement?`
- `PUT /patients/:id` (protegido: secretaria)
	- Body: `name`, `cpf`, `susnumber`, `email?`, `birth_date`, `phone`, `gender`, `cep`, `city`, `street`, `district`, `number`, `complement?`
- `DELETE /patients/:id` (protegido: secretaria)

### Appointments

- `GET /appointments` (protegido: secretaria)
- `GET /appointments/:id` (protegido: secretaria ou estagiario)
- `GET /appointments/intern/:id` (protegido: secretaria ou estagiario)
- `GET /appointments/patient/:id` (protegido: secretaria ou estagiario)
- `GET /appointments/date/:date` (protegido: secretaria ou estagiario)
- `POST /appointments` (protegido: secretaria)
	- Body: `date_time` (ISO), `status`, `intern_id`, `patient_id`
- `PUT /appointments/:id` (protegido: secretaria)
	- Body: `date_time` (ISO), `status`, `intern_id`, `patient_id`
- `DELETE /appointments/:id` (protegido: secretaria)

### Records

- `GET /records` (protegido: secretaria)
- `GET /records/:id` (protegido: estagiario ou professor)
- `GET /records/patient/:id` (protegido: secretaria)
- `GET /records/intern` (protegido: estagiario)
- `GET /records/appointment/:id` (protegido: secretaria)
- `POST /records` (protegido: estagiario)
	- Body: `anamnesis`, `physicalExam`, `solicitedTests`, `instructions`, `prescription`, `conduct`, `cid10`, `aproved?`, `intern_id`, `patient_id`, `appointment_id`
- `PUT /records/:id` (protegido: estagiario ou professor)
	- Body: `anamnesis`, `physicalExam`, `solicitedTests`, `instructions`, `prescription`, `conduct`, `cid10`, `aproved?`, `intern_id`, `patient_id`, `appointment_id`
- `DELETE /records/:id` (protegido: estagiario ou professor)
- `PATCH /records/approve/:id` (protegido: professor)
	- Body: `aproved`
- `PATCH /records/:id/document` (protegido: estagiario ou professor)
	- Form-data: `document` (arquivo)
	- O arquivo e salvo localmente em `src/uploads` e o nome e persistido no campo `document` do record.
- `GET /records/document/:filename` (protegido: estagiario ou professor)
	- Retorna o arquivo do record pelo nome armazenado.

## Como executar

1) Instale as dependencias:

```bash
npm install
```

2) Configure o data source do TypeORM (arquivo nao versionado no git).

Crie `src/shared/typeorm/data-source.ts`. O exemplo abaixo detecta se esta rodando em TS (dev) ou JS (build) e ajusta os caminhos de entidades e migrations automaticamente:

```ts
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

const isCompiled = path.extname(__filename) === ".js";
const extension = isCompiled ? "js" : "ts";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "conecta_sus",
	entities: [path.join(__dirname, "..", "..", "modules", "**", "typeorm", "entities", `*.${extension}`)],
	migrations: [path.join(__dirname, "migrations", `*.${extension}`)],
});
```

3) Rode as migracoes:

```bash
npm run typeorm:run
```

4) Inicie a API em modo desenvolvimento:

```bash
npm run dev
```

## Build e start (producao)

1) Gere os arquivos JS:

```bash
npm run build
```

2) Inicie a API a partir do build:

```bash
npm start
```

### Observacao

Para ser executado corretamente, e necessario possuir os certificados `cert.pem` e `key.pem` devido a utilizacao de https.

- Dev (`npm run dev`): `src/shared/certs`
- Build/start (`npm run build` + `npm start`): `dist/shared/certs`
- Opcional: defina `CERTS_DIR` para apontar para outra pasta (ex.: ambiente de deploy)