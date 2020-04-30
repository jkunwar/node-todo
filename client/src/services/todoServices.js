import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/v1/todos'

export const getTodos = async () => {
    try {

        const todos = await axios.get(`${BASE_URL}`)
        if (todos.status === 200) {
            return todos.data.data
        } else {
            console.log('some error occured')
            // throw new Error('error occured')
        }
    } catch (error) {
        console.log(error.message)
        return
    }
}

export const addTodo = async (task) => {
    try {
        const todo = await axios({
            url: `${BASE_URL}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { task }
        })
        if (todo.status === 201) {
            return todo.data.data
        } else {
            console.log('some error occured')
            // throw new Error('error occured')
        }
    } catch (error) {
        console.log(error)
        return
    }
}

export const updateTodo = async (todoId, task, is_completed = false) => {
    try {
        const todo = await axios({
            url: `${BASE_URL}/${todoId}`,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: { task, is_completed }
        })
        if (todo.status === 200) {
            return todo.data.data
        } else {
            console.log('some error occured')
            // throw new Error('error occured')
        }
    } catch (error) {
        console.log(error)
        return
    }
}

export const deleteTodo = async (todoId) => {
    try {
        const todo = await axios({
            url: `${BASE_URL}/${todoId}`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        if (todo.status === 204) {
            return true
        } else {
            console.log('some error occured')
            return false
        }
    } catch (error) {
        return false
    }
}