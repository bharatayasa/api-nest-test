<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Installation
**Clone the repository:**
```bash
  git clone https://github.com/bharatayasa/chilitify-backend.git
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

```

## Middleware
- **AccesToken:** Middleware for validating user authentication tokens.
- **checkRole:** Middleware for checking user roles (e.g., 'admin', 'user').

## Routes

### User Authentication

- `POST /auth/register`: Registers a new user.
- `POST /auth/login`: Logs in an existing user.

### Users Data

- `GET /users`: Retrieves all users data (admin only).
- `GET /users/:id`: Retrieves a users by ID (admin only).
- `POST /users`: Adds new users data (admin only).
- `PUT /users/:id`: Updates users data by ID (admin only).
- `DELETE /users/:id`: Deletes users data by ID (admin only).

### Categories Data

- `GET /categories`: Retrieves all categories data (admin only).
- `GET /categories/:id`: Retrieves a categories by ID (admin only).
- `POST /categories`: Adds new categories data (admin only).
- `PUT /categories/:id`: Updates categories data by ID (admin only).
- `DELETE /categories/:id`: Deletes categories data by ID (admin only).

### News Data

- `GET /news`: Retrieves all news data (admin only).
- `GET /news/:id`: Retrieves a news by ID (admin only).
- `POST /news`: Adds new news data (admin only).
- `PUT /news/:id`: Updates news data by ID (admin only).
- `DELETE /news/:id`: Deletes news data by ID (admin only).

### News Data

- `GET /visitor`: Retrieves all news data (user only).
- `GET /visitor/detail/:id`: Retrieves news detail data (user only).
- `GET /visitor/filterby/:category`: Retrieves news by category (user only).
- `POST /visitor/search`: Retrieves news by seach by request body (user only).
