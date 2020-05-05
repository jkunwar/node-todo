const pool = require('../db/pool')

module.exports = {
    query(queryString) {
        pool.query(queryString)
            .then((res) => {
                console.log(res);
                // pool.end();
            })
            .catch((err) => {
                console.log(err);
                pool.end();
            });
    }
}