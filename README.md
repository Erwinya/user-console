# user-console

Browser console for **User CRUD** against [user-api](https://github.com/Erwinya/user-api).

Repository: [Erwinya/user-console](https://github.com/Erwinya/user-console)

## Features

- List users from the API
- Create and edit users (name + email)
- Delete with confirmation
- Status / error feedback
- Vite `/api` same-origin proxy to `http://localhost:8080`

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
npm install
npm run dev
```

Windows PowerShell:

```powershell
# terminal 1 (user-api)
.\mvnw.cmd spring-boot:run

# terminal 2 (user-console)
npm install
npm run dev
```

Open http://localhost:5173

By default the console calls `/api/...` on the Vite origin so the documented proxy is used. Set `VITE_API_BASE_URL` in `.env` only when you want to hit the API origin directly.

## Build

```bash
npm run build
npm run preview
```

## Tests

```powershell
npm test
npm run build
```

GitHub Actions runs the same checks on push.

## License

MIT
