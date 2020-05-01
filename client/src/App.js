import React, { PureComponent } from 'react';
import './App.css';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoServices'
import Navbar from './components/Navbar'
import TodoList from './components/TodoList';

class App extends PureComponent {

    state = {
        todos: [],
        todo: '',
        error: '',
        selectedTodoID: null,
        action: 'add'
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value });
    }

    async componentDidMount() {
        const { payload, status } = await getTodos()
        if (status !== 200) return
        this.setState({ todos: payload })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let { todo, todos, action, selectedTodoID } = this.state
        if (todo === undefined || todo === '') {
            this.setState({ error: 'Task field is required' })
            return
        }
        if (action === 'add') {
            const { payload, status } = await addTodo(todo)
            if (status !== 201) return
            todos.unshift(payload)
        } else if (action === 'update' && selectedTodoID !== null) {
            const { payload, status } = await updateTodo(selectedTodoID, todo)
            if (status !== 200) return
            const index = todos.findIndex(todo => todo.id === payload.id)
            if (index === -1) return
            todos[index] = payload
        }
        this.setState({ todos, todo: '', action: 'add', error: '', selectedTodoID: null })
    }

    handleEdit = index => () => {
        const todo = this.state.todos[index]
        this.setState({ todo: todo.task, selectedTodoID: todo.id, action: 'update' })
    }

    toggleCompleted = (index) => async () => {
        let todos = [...this.state.todos]
        const { task, is_completed, id } = todos[index]
        const completed = is_completed ? false : true
        const { payload, status } = await updateTodo(id, task, completed)
        if (status !== 200) return
        todos[index] = payload
        this.setState({ todos: todos })
    }

    deleteTodo = index => async () => {
        const confirm = window.confirm('Are you sure you want to delete this item?')
        if (!confirm) return

        let todos = [...this.state.todos]
        const { id } = todos[index]
        const { status } = await deleteTodo(id)
        if (status !== 204) return
        todos.splice(index, 1)
        this.setState({ todos: todos })
    }

    render() {
        const { todo, error, action, todos } = this.state
        return (
            <React.Fragment>
                <Navbar />
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-8  offset-md-2 mb-3">
                            <form>
                                <div className="d-flex">
                                    <input
                                        placeholder="Add new task"
                                        type='text' value={todo}
                                        onChange={this.handleChange}
                                        name='todo'
                                        className="form-control mr-2" />

                                    <button className="btn btn-outline-secondary" type="submit" onClick={this.handleSubmit}>{action === 'add' ? 'Add' : 'Update'}</button>
                                </div>
                                {
                                    error && <span className="invalid-feedback">{error}</span>
                                }
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8  offset-md-2 mb-3">
                            <TodoList
                                todos={todos}
                                toggleCompleted={this.toggleCompleted}
                                handleEdit={this.handleEdit}
                                deleteTodo={this.deleteTodo}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;