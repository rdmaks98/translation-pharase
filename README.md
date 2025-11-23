# Task 1 — Phrase Translation Frontend (Next.js + TypeScript)

A simple frontend application built with **Next.js** that allows users to search phrases, sort/filter results, and view translations fetched from a Nest.js backend API.

This repository contains **only the frontend** for the assignment.

---

## Features

- Search phrases by text
- View results without translations
- Sort by:
  - `phrase`
  - `createdAt`
  - `updatedAt`
- Filter by:
  - `active`, `pending`, `spam`, `deleted`
- View phrase details
- Fetch translation by language
- Clean and responsive UI
- Fully typed using TypeScript

---

## Requirements

- Node.js **v18+**
- npm or yarn
- Running backend API (Nest.js)

Backend API must support:

| Endpoint | Description |
|---|---|
| `GET /phrase/:id` | Returns phrase without translations |
| `GET /phrase/:id/:language` | Returns translation of the phrase |
| `GET /phrase/search?query=` | Returns phrases matching search text with sorting and filtering |

---

## Setup & Installation

### 1 Clone the repository
```bash
git clone <your-repo-url>
cd task1-translation-frontend
```

### Installtion
``` bash
npm install
# or
yarn install

```
### create envirnemnt file 
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### run task
```bash
npm run dev
```