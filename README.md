# Guild Roster API

## Description

This API stores the backend for a guild roster application, which is a project that allows officers to maintain an up to date roster that contains useful information about guild members.

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

## Usage

This API supports basic CRUD operations for handling roster changes.

1. Get all members

Send a GET request to `https://api-guildroster.herokuapp.com/members`

2. Get one member

Send a GET request to `https://api-guildroster.herokuapp.com/members/:id`

3. Create a member

Send a POST request to `https://api-guildroster.herokuapp.com/members`

4. Update a member

Send a PUT request to `https://api-guildroster.herokuapp.com/members/:id`

5. Delete a member

Send a DELETE request to `https://api-guildroster.herokuapp.com/members/:id`

**IMPORTANT**

For the POST and PUT endpoints, valid parameters must be supplied on the request body. Example below:

```
{
  "username": "TestUser",
  "rank": "Peon",
  "classname": "Priest",
  "race": "Orc"
}
```

## Contributing

This is a personal project for learning purposes and is not accepting contributions. You are welcome to modify and distribute any versions as you please.

## License

MIT License
