const pool = require('./pool')

pool.on('connect', () => {
    console.log('database connected')
});

/**
 * Create Todo Table
 */
const createTodoTable = () => {
    const createTodoTableQuery = `CREATE TABLE IF NOT EXISTS todos
    (id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_on DATE NOT NULL,
    updated_on DATE NOT NULL)`;

    pool.query(createTodoTableQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Drop Todo Table
 */
const dropTodoTable = () => {
    const todoTableDropQuery = 'DROP TABLE IF EXISTS todos';
    pool.query(todoTableDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
    createTodoTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropTodoTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createAllTables,
    dropAllTables,
};

require('make-runnable');