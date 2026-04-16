# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

1. Membuat user : http://localhost:5000/api/users
Butuh memakai post dan input json dengan parameter berikut :
```
{
  "email" : "EMAIL",
  "full_name" : "FULLNAME",
  "password" : "password",
  "confirm_password" : "confirm_password"
}

```
2. Gacha : http://localhost:5000/api/users/gacha
Butuh memakai post dan input json dengan parameter berikut : 
```
{
  "id" : "ID"
}

```

3. melihat semua history gacha yang tercatet di db : http://localhost:5000/api/users/history
Butuh menggunakan get

4.  melihat history gacha dari suatu user : http://localhost:5000/api/users/:id/history
butuh menggunakan get serta menaruh id dari user di :id

5. melihat sisa prize yang bisa didapatkan : http://localhost:5000/api/users/prizes
menggunakan get

6. melihat semua user yang berasil mendapatkan hadiah : http://localhost:5000/api/ users/history/winners
menggunakan get
