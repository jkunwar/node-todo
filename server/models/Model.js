const dbQuery = require('../db/dbQuery')

class Model {

    constructor(TABLE_NAME) {
        TABLE_NAME = TABLE_NAME
    }

    findAll(columns = ['*']) {
        const queryString = `SELECT ${columns} from ${this.TABLE_NAME} ORDER BY id DESC`;
        return dbQuery.query(queryString)
    }

    findById(id, columns = ['*']) {
        const queryString = `SELECT ${columns} from ${this.TABLE_NAME} WHERE id=$1`;
        return dbQuery.query(queryString, [id])
    }

    save(obj = {}) {
        if (typeof (obj) !== 'object') new Error('invalid data')
        const keys = Object.keys(obj)
        const values = Object.values(obj)
        const val = values.map((v, i) => `$${i + 1}`)
        const queryString = `INSERT INTO ${this.TABLE_NAME}(${keys})  values(${val}) returning *`;
        return dbQuery.query(queryString, values)
    }

    update(id, obj = {}) {
        if (typeof (obj) !== 'object') new Error('invalid data')
        const keys = Object.keys(obj)
        const set = keys.map((k, i) => `${k}=$${i + 1}`)
        const values = [...Object.values(obj), id]
        const queryString = `UPDATE todos set ${set} where id=$${values.length} returning *`
        return dbQuery.query(queryString, values)
    }

    delete({ id }) {
        const queryString = `DELETE FROM ${this.TABLE_NAME} WHERE id=$1 returning *`
        return dbQuery.query(queryString, [id])
    }
}

module.exports = Model