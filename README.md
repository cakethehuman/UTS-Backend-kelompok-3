# UTS KELOMPOK 3 backend
Anggota kelompok <br>
535250001 - leo <br>
535250009 - malvin <br>
5352500013 - wilson <br>
5352500019 - chandra <br>
5352500043 - tan <br>
5352500044 - felix <br>

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint`, `Prettier`, `jsonwebtoken `.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## NBA Game Ticketing API 
<img width="288" height="175" alt="image" src="https://github.com/user-attachments/assets/04181795-a613-4155-9cc9-93c0195c1494" />
API Backend yang tangguh untuk sistem reservasi tiket pertandingan NBA.

## Installation
node js

Dependencies

## Dokumentasi API (Endpoints)
# Creating user & login to it
POST `/NBA/auth/register`.
making your account
Request format:
{
  "email": "youraccount@gmail.com",
  "fullName": "your name",
  "password": "your password",
  "confirmPassword": "your password",
  credit: optional (use number, cannot < 0, default value is 0)
}

POST `/auth/login`.
login to your created account
Request format:
{
  "email": "youraccount@gmail.com",
  "password": "your password"
}

make sure you grab/copy your token after login, go to header, put in "Authorization" parameter, "Bearer <token>" put in your token in the Field.

