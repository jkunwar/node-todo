module.exports = {
    create() {
        return queryString = `CREATE TABLE IF NOT EXISTS users
                (id SERIAL PRIMARY KEY,
                name VARCHAR(225) NOT NULL,
                email VARCHAR(225) NOT NULL,
                password VARCHAR(225) NOT NULL,
                created_on DATE NOT NULL,
                updated_on DATE NOT NULL)`;

    },

    drop() {
        return queryString = `DROP TABLE IF EXISTS users`;
    }
}