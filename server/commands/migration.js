const path = require('path');
const fs = require('fs')
const dbQuery = require('../helpers/dbQuery')
const pool = require('../db/pool')

module.exports = {

    makemigration(tablename) {
        const time = new Date().getTime()
        const filename = `migrations/${time}_create_${tablename}_table.js`

        const content = `module.exports = {
            create() {
                return queryString = \`CREATE TABLE IF NOT EXISTS ${tablename}
                (id SERIAL PRIMARY KEY,
                created_on DATE NOT NULL,
                updated_on DATE NOT NULL)\`;

            },

            drop() {
                return queryString = \`DROP TABLE IF EXISTS ${tablename}\`;
            }
        }`

        fs.writeFile(filename, content, (err) => {
            if (err) return console.log(err)
            console.log(`${tablename} migration created`)
        })
    },

    migrate() {
        const directoryPath = path.join(__dirname, '../migrations');

        fs.readdir(directoryPath, function (err, files) {
            if (err) return console.log('Unable to scan directory: ' + err);

            files.forEach(async file => {
                const filename = path.join(directoryPath, file)
                const { create } = require(filename)
                await dbQuery.query(create(), pool)
            });
            pool.end()
        });

    },

    fresh() {
        const directoryPath = path.join(__dirname, '../migrations');

        fs.readdir(directoryPath, function (err, files) {
            if (err) return console.log('Unable to scan directory: ' + err);

            files.forEach(async file => {
                const filename = path.join(directoryPath, file)
                const { drop } = require(filename)
                await dbQuery.query(drop(), pool)
            });
            pool.end()
        });

    }
}