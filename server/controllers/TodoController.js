const dbQuery = require('../db/dbQuery')
const moment = require('moment')
const { errorMessage, successMessage, status, } = require('../helpers/status')

const getTodos = async (req, res) => {

    const getAllTodos = 'SELECT * FROM todos ORDER BY id DESC';
    try {
        const { rows } = await dbQuery.query(getAllTodos);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'There are no todos';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
}

const addTodo = async (req, res) => {
    const { task } = req.body
    const created_on = moment(new Date())

    if (task === undefined || task === '') {
        errorMessage.error = 'Task field required';
        return res.status(status.unprocessable).send(errorMessage);
    }

    const createTodoQuery = `INSERT INTO
          todos(task, is_completed, created_on, updated_on)
          VALUES($1, $2, $3, $4)
          returning *`;
    const values = [
        task,
        false,
        created_on,
        created_on
    ];

    try {
        const { rows } = await dbQuery.query(createTodoQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Unable to add todo';
        return res.status(status.error).send(errorMessage);
    }
}

const updateTodo = async (req, res) => {
    let { task, is_completed } = req.body
    const { id } = req.params
    const updated_on = moment(new Date())

    if (task === undefined || task === '') {
        errorMessage.error = 'Task field required';
        return res.status(status.bad).send(errorMessage);
    }

    const findTodoById = 'SELECT * FROM todos WHERE id=$1';

    const createBusQuery = `UPDATE todos set task=$2,is_completed=$3, updated_on=$4 where id=$1 returning *`;
    const completed = is_completed ? is_completed : false
    const values = [id, task, completed, updated_on];

    try {
        const { rows } = await dbQuery.query(findTodoById, [id]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Todo can not be found';
            return res.status(status.notfound).send(errorMessage);
        }

        const response = await dbQuery.query(createBusQuery, values);
        const dbResults = response.rows[0];
        successMessage.data = dbResults;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error)
        errorMessage.error = 'Unable to update todo';
        return res.status(status.error).send(errorMessage);
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params

    const deleteTodo = `DELETE FROM todos where id=$1 returning *`;

    try {
        const { rows } = await dbQuery.query(deleteTodo, [id]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Todo can not be found';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Todo deleted successfully';
        return res.status(status.nocontent).send(successMessage);
    } catch (error) {
        console.log(error)
        errorMessage.error = 'Unable to delete todo';
        return res.status(status.error).send(errorMessage);
    }
}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}