# Proyecto Backend con Express y TypeScript – Diplomado 2025

Este proyecto fue desarrollado por **Pereira Reyes Ronal** como parte del **Diplomado en Desarrollo Backend - Gestión 2025**.  
Se basa en una arquitectura limpia usando **Express**, **TypeScript**, **Prisma**, JWT, y otras tecnologías modernas.

---

## 🧱 Arquitectura (Screaming Architecture)

![Screaming Architecture](./assets/Screaming_Architecture.png)

---

## 📦 Instalación de dependencias

```bash
npm install
# o
pnpm install
# o
yarn install

```

## Set Variables Environment

To configure the variables environment, copy the file `.env-template` to `.env`, and configure the variables:

```bash
PORT=XXXX
SECRET_KEY='Secret_Key'
EXPIRES_IN=60*60
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

```

## Run docker DataBase 🐳

```bash
docker compose up # or to detach
docker compose up -d
```

## Run migrate with Prisma

See the .env-template to configure `DATABASE_URL` to connect the database.

```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Once you configure the `DATABASE_URL`, run this command:

##### Init prisma

```bash
npx prisma init # if just in case
```

##### Run migration with prisma

```bash
npm prisma migrate dev # only for development
```

## Run server 🚀

```bash
npm run dev
```

Server run on `http://localhost:3000`

---

### Users Routes

Body `json` user:

```json
{
  "username": "user",
  "password": "password"
}
```

The field `status` default value as `active`.

Routes for users actions:

- Create user `POST`: `http://localhost/api/users`
- Get all users `GET`: `http://localhost/api/users`

Once you create the user with your credential, you need login to try the rest of petitions.

### Login

To login go to:

- `POST`: `http://localhost:3000/api/login` in the body with your credentials:

```json
{
  "username": "user",
  "password": "password"
}
```

To response you recieved the token like that:

```json
{
  "token": "eyJhbGciOiJIOzI1NiIsInR4cCI6IkpXVCJ0.eyJ1c2VySWQiOiJiMjMxZWUxOC1iZWExLTQwM2YtOTQwZC0wNDIwODM1NTA5MjYiLCJzdGF0dXMiOiJhY3RpdmUiLCJpYXQiOjE3NDk5MzczOTIsImV4cCI6MTc0OTk0MDk5Mn0.Xz0-X5giT6LrpBu8ivRwIZjvv4NjvsWbIAWcWsHPF1Q"
}
```

##### For the rest petitions you need the token

You need to put the token before you make the petitions.

- Delete user `DELETE`: `http://localhost/api/users/:id`
- Update user `PUT`: `http://localhost/api/users/:id`
- Get a specific user `GET`: `http://localhost/api/users:id`
- Change status user `PATCH`: `http://localhost:3000/api/users/:id` - body `json` options only `active` or `inactive`:
  ```json
  {
    "status": "active"
  }
  ```
- Get task user where task are NOT `done` yet `GET`: `http://localhost:3000/api/users/:id/tasks`

  With this actions, we can use with Postman or similar.

- Get list user with pagination and query params `GET`: `http://localhost:3000/api/users/list/pagination?page=1&limit=5&search=er&orderBy=username&orderDir=DESC`
  query params:
  | Param | Default | Values |
  | ------------- | -------------- | -------------- |
  | page | 1 | - |
  | limit | 10 | 5, 10, 15, 20 |
  | search | | - |
  | orderBy | id | id, username, status |
  | orderDir | DESC | ASC, DESC |

  Response:

  ```json
  {
    "total": 10,
    "page": 1,
    "pages": 2,
    "data": [
      {
        "id": "8050c5b9-9c8c-4bc9-9ded-5fe13a6b1016",
        "username": "user9",
        "status": "active"
      },
      {
        "id": "bd4bfd71-721c-4ef9-9a96-592f9a4b2f2a",
        "username": "user8",
        "status": "active"
      },
      {
        "id": "1f4ebdbb-6e71-49ff-be93-9320273ec8ad",
        "username": "user7",
        "status": "active"
      },
      {
        "id": "5e166a93-bc16-42ab-9db8-f8fa60f467a1",
        "username": "user6",
        "status": "active"
      },
      {
        "id": "ac6d6c8d-6e3a-4179-a231-265a717ae856",
        "username": "user5",
        "status": "active"
      }
    ]
  }
  ```

---

### Task Routes

> [!NOTE]
> To try this routes you need the Bearer Token.
> If you do not log in, you will not be able to access the rest of the routes.

- Get all user task: `GET`: `http://localhost:3000/api/tasks`
- New user task: `POST`: `http://localhost:3000/api/tasks` - body `json`:

```json
{
  "name": "Learn Rust"
}
```

- Get user task by id `GET`: `http://localhost:3000/api/tasks/:id`
- Update user a specific task `PUT`: `http://localhost:3000/api/tasks/:id` - body `json`

```json
{
  "name": "Learn Go"
}
```

- Delete user task `DELETE`: `http://localhost:3000/api/tasks/:id`
- Toggle user task to Toggle done `PATCH`: `http://localhost:3000/api/tasks/:id` - body `json`:

```json
{
  "done": true
}
```
