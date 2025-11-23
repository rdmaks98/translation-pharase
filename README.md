# Phrase Translation Backend (Nest.js + TypeScript)

A backend API built using **Nest.js** that manages phrases and their translations.  
This service supports fetching phrases, retrieving translations, searching with sorting and filtering, and maintains status states.

---

## Requirements

- Node.js **v18+**
- npm or yarn
- **postgresql** (local)

Status values supported:

active | pending | spam | deleted


---

## Features

- Create and store phrases with translations
- Fetch phrase by ID (without translations)
- Fetch translation by language
- Search phrases with:
  - sorting
  - filtering
- Fully typed using TypeScript
- Unit and integration test ready

---

## Installation & Setup

### Clone the repository

```bash
git clone <your-backend-repo-url>
cd task1-translation-backend
```
### insatlltion

```bash
yarn add
```

### enviornment

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ypupassword
DB_NAME=databasename
NODE_ENV=
```

### run serevr
```bash
yarn start:dev

```
### api endpoints

#### Get phrase by ID (no translations)
```bash
GET /phrase/:id
{
  "id": 1,
  "phrase": "Hi, I'm a phrase",
  "status": "active",
  "createdAt": "2024-05-23T15:58:35+00:00",
  "updatedAt": "2024-05-23T15:58:35+00:00"
}
```
#### Get translation for a phrase
```bash
GET /phrase/:id/:language
{
  "id": 1,
  "language": "fr",
  "translation": "Salut, je suis une phrase"
}

```
#### Search phrases
```bash
GET /phrase/search?query={text}&sortBy={field}&order={asc|desc}&status={value}
/phrase/search?query=hi&sortBy=createdAt&order=asc&status=active
{
  "results": [
    {
      "id": 1,
      "phrase": "Hi, I'm a phrase",
      "status": "active",
      "createdAt": "2024-05-23T15:58:35+00:00",
      "updatedAt": "2024-05-23T15:58:35+00:00"
    }
  ]
}
```


### test serevr
```bash
yarn test
yarn test:watch

```