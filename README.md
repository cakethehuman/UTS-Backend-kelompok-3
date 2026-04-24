# UTS KELOMPOK 3 backend
Anggota kelompok <br>
535250001 - Leonardo Firnandius <br>
535250009 - Malvin Grico Gunawan <br>
5352500013 - Wilson Hadinata Putra <br>
5352500019 - Chandra <br>
5352500043 - Nicholas Tannaydi <br>
5352500044 - Felix Lin <br>

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

# Changing account details
PATCH `/NBA/auth/:userId/password`.
Change your account password
Request format:
{
  "oldPassword": "your old password",
  "newPassword": "your new password",
  "confirmNewPassword": "your new pasword"
}

PATCH `/NBA/auth/:userId/email`.
Change your account email
Request format:
{
  "newEmail": "your new email",
  "password": "your password"
}

PATCH `/NBA/auth/:userId/name`.
Change your account name
Request format:
{
  "newName": "your new name",
  "password": "your password"
}


# Getting informations about a game
GET `/NBA/games/`.
Get informations about games

GET `/NBA/games/:gamesId/`.
Get informations about games based on gamesId

GET `/NBA/games/:gamesId/seats`.
Change you account name


# Placing orders, pay orders, cancel orders
POST `NBA/orders/`.
Placing orders to buy tickets
Request format:
{
  "seatId": "seatId",
  "gameId": "gameId"
}

POST `NBA/orders/payment`.
Pay orders to buy tickets
Request format:
{
  "orderId": "yourorderId"
}

PATCH `NBA/orders/cancel`.
Cancel an order
Request format:
{
  "orderId": "yourorderId"
}


# Getting informations about teams
GET `NBA/teams/`.
get informations about teams

GET `NBA/teams/:teamId`.
get informations about teams based on id


# Getting user's ticket info
GET `/NBA/tickets/me`.
Get informations about user's ticket

PATCH `/NBA/tickets/:ticketId/cancel`.
Cancel a ticket
Request format:
{
  "ticketId": "yourticketid"
}

# Update user's credit
POST `/NBA/users/:userId/balance`.
Request format:
{
  "amount": "yourwantedamount"
}

