## Note App [POC]

> Create and organize your notes, browse through a published list, or bookmark notes for later.

### About
The intent of this project is to gain a better understanding of the tradtional approach to building web applications.

Utilizes [Express.js](https://bit.ly/2MxaULp) and [MongoDB](https://bit.ly/2CL6kov) to implement a server; Render templates ([pug](https://bit.ly/2fSdrBd)), and send resources (NoSQL document stores) based on route endpoints.

### Demo
Link to demo: note.obie.dev
Credentials: `username: newUser` `password: newPassword`

### Developing
- Install mongodb: `brew install mongodb` (Reference: https://bit.ly/2hVc4Sr)
- Start the mongo server: `mongod`
- Install project dependencies: `npm install`
- Seed the database: `npm run seed`
- Build assets: `npm run build:prod`
- Start the app: `npm start` (http://localhost:8080)
- Run tests: `npm test`
