### Requirements
1. node
2. postgres

### Project Setup

1. Clone the project
2. cd to server folder and run
    1.  create `.env` file and set `DB_HOST`, `DB_USER`, `DB_NAME`, `DB_PASS` and `DB_PORT`
    2.  `yarn` or `npm install`
    3.  `npm run migrate` or `yarn migrate` to run migration
    4.  `npm run server` to start the server

    ### To create new migration
    1. run `npm run make:migration <name>` or `yarn make:migration <name>`

    ### To delete tables
    1. run `npm run db:fresh` or `yarn db:fresh`

3. cd to client folder and run 
    1.  `yarn` or `npm install`
    1.  `yarn start` or `npm start` to start the server
