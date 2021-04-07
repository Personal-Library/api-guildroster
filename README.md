# Guild Roster API

## Description

This API stores the backend for a guild roster application, which is a project that allows users to maintain an up to date roster that contains useful information about guild members.

## Technologies

- Node.js
- Express
- PostgreSQL

## Installation

Clone the repository

`git clone git@github.com:Personal-Library/api-guildroster.git`

Enter the project directory

`cd api-guildroster`

Install dependencies

`npm install`

Setup and populate your .env by following .env.example

`touch .env`

## Usage

This API supports basic CRUD operations for handling roster changes as well as authentication
for protecting the delete and edit routes.

- Rank is restricted to the following (case-sensitive): Officer, Member, Peon
- Classnames are restricted to the following (case-sensitive): Death Knight, Demon Hunter, Druid,
  Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warlock, Warrior
- Race is restricted to the following (case-sensitive): Human, Dwarf, Night Elf, Gnome, Draenei,
  Worgen, Pandaren

### Get all members

- Send a GET request to `https://guildroster.herokuapp.com/members`

### Get one member

- Send a GET request to `https://guildroster.herokuapp.com/members/:id`

### Create a member

- Send a POST request to `https://guildroster.herokuapp.com/members`

```
// Example request body
{
  "username": "Fred",
  "classname": "Warlock",
  "rank": "Peon",
  "race": "Human"
}
```

### Update a member

- Send a PUT request to `https://guildroster.herokuapp.com/members/:id`

```
// Example request body
{
  "username": "Fred",
  "classname": "Warlock",
  "rank": "Officer",
  "race": "Human"
}
```

### Delete a member

- Send a DELETE request to `https://guildroster.herokuapp.com/members/:id`

## Authentication

Authentication is available at the following routes

- A username must be 6-30 characters long, and can include numbers, uppercase and lowercase letters.
  The username will be lowercased upon storage, and must be unique.
- A password must be 6-20 characters long, and can include uppercase and lowercase letters,
  numbers, and the following special characters: !@#$%^&\*

### Create an Account

- Send a POST request to `https://guildroster.herokuapp.com/auth/jwt/signup`

```
// Example request body
{
  "username": "FredTheWarlock",
  "password": "warlocksRule123"
}
```

### Login a User

- Send a POST request to `https://guildroster.herokuapp.com/auth/jwt/login`

```
// Example request body
{
"username": "FredTheWarlock",
"password": "WarlocksRule123"
}

```

## Contributing

This is a personal project for learning purposes and is not accepting contributions. You are welcome to modify and distribute any versions as you please.

## License

MIT License
