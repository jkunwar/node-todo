module.exports = {
    query(queryString, pool) {
        pool.query(queryString)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}