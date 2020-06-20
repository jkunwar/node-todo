const pool = require('../db/pool');

module.exports = {
    /**
     * DB Query
     * 
     * @param {String} quertText
     * @returns {object} object
     */
    query(queryString) {
        pool.query(queryString)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}