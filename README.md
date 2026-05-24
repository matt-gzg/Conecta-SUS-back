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

## Como executar

1) Instale as dependencias:

```bash
npm install
```

2) Crie o arquivo de data source do TypeORM (nao versionado no git).

Crie `src/shared/typeorm/data-source.ts` seguindo o modelo generico da documentacao oficial do TypeORM. Exemplo simplificado:

```ts
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "conecta_sus",
	entities: ["src/modules/**/typeorm/entities/*.ts"],
	migrations: ["src/shared/typeorm/migrations/*.ts"],
});
```

3) Rode as migracoes:

```bash
npm run typeorm:run
```

4) Inicie a API:

```bash
npm run dev
```

### Observação

Para ser executado corretamente, é necessário possuir os certificados `cert.pem` e `key.pem` na pasta `src/shared/certs` devido à utilização de https