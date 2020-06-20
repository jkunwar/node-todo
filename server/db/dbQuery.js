const pool = require('./pool');

module.exports = {
    /**
     * DB Query
     * 
     * @param string quertText
     * @param {object} params
     * 
     * @returns {object} object
     */
    query(quertText, params) {
        return new Promise((resolve, reject) => {
            pool.query(quertText, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};