const moment = require('moment')
const { errorMessage, successMessage, status, } = require('../helpers/status')
const Todo = require('../models/Todo')

const todo = new Todo()

const getTodos = async (req, res) => {
    try {
        const { rows } = await todo.findAll()
        if (rows[0] === undefined) {
            errorMessage.error = 'No todos found';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = rows;
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

    try {
        const { rows } = await todo.save({
            task: task,
            is_completed: false,
            created_on: created_on,
            updated_on: created_on
        });
        successMessage.data = rows[0];
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

    const completed = is_completed ? is_completed : false

    try {
        const { rows } = await todo.findById(id);
        if (!rows[0]) {
            errorMessage.error = 'Todo not found';
            return res.status(status.notfound).send(errorMessage);
        }

        const response = await todo.update(id, { task, is_completed: completed, updated_on });
        const results = response.rows[0];
        successMessage.data = results;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error)
        errorMessage.error = 'Unable to update todo';
        return res.status(status.error).send(errorMessage);
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
        const { rows } = await todo.delete({ id });
        if (!rows[0]) {
            errorMessage.error = 'Todo not found';
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