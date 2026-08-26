# user-console

Browser console for **User CRUD** against [user-api](https://github.com/Erwinya/user-api).

Repository: [Erwinya/user-console](https://github.com/Erwinya/user-console)

## Features

- List users from the API
- Create and edit users (name + email)
- Delete with confirmation
- Status / error feedback
- Vite dev proxy to `http://localhost:8080` (no CORS setup needed locally)

## Requirements

- Node.js 20+
- Running [user-api](https://github.com/Erwinya/user-api) on port `8080`

## Setup

```bash
npm install
cp .env.example .env
```

## Run

Terminal 1 — API:

```bash
# in user-api
./mvnw spring-boot:run
```

Terminal 2 — console:

```bash
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

Optional: set `VITE_API_BASE_URL` in `.env` when the API is not reachable via the Vite proxy (for example a remote host). Leave it empty for local proxy mode.

## Tests

```bash
npm test
```

## License

MIT
