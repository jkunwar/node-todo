module.exports = {
    create() {
        return queryString = `CREATE TABLE IF NOT EXISTS todos
                (id SERIAL PRIMARY KEY,
                task TEXT NOT NULL,
                is_completed BOOLEAN DEFAULT FALSE,
                created_on DATE NOT NULL,
                updated_on DATE NOT NULL)`;

    },

    drop() {
        return queryString = `DROP TABLE IF EXISTS todos`;
    }
}