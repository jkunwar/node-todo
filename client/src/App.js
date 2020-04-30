import React, { PureComponent } from 'react';
import './App.css';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoServices'
import Navbar from './components/Navbar'

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
        const todos = await getTodos()
        if (!todos) return
        this.setState({ todos })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let { todo, todos, action, selectedTodoID } = this.state
        if (todo === undefined || todo === '') {
            this.setState({ error: 'Task field is required' })
            return
        }
        if (action === 'add') {
            const newTodo = await addTodo(todo)
            if (!newTodo) return
            todos.unshift(newTodo)
        } else if (action === 'update' && selectedTodoID !== null) {
            const updatedTodo = await updateTodo(selectedTodoID, todo)
            if (!updatedTodo) return
            const index = todos.findIndex(todo => todo.id === updatedTodo.id)
            if (index === -1) return
            todos[index] = updatedTodo
        }
        this.setState({ todos, todo: '', error: '', selectedTodoID: null })
    }

    handleEdit = index => () => {
        const todo = this.state.todos[index]
        this.setState({ todo: todo.task, selectedTodoID: todo.id, action: 'update' })
    }

    toggleCompleted = (index) => async () => {
        let todos = [...this.state.todos]
        const { task, is_completed, id } = todos[index]
        const completed = is_completed ? false : true
        const updatedTodo = await updateTodo(id, task, completed)
        if (!updatedTodo) return
        todos[index] = updatedTodo
        this.setState({ todos: todos })
    }

    deleteTodo = index => async () => {
        const confirm = window.confirm('Are you sure you want to delete this item?')
        if (!confirm) return

        let todos = [...this.state.todos]
        const { id } = todos[index]
        const deleted = await deleteTodo(id)
        if (!deleted) return
        todos.splice(index, 1)
        this.setState({ todos: todos })
    }

    renderTodos = () => {
        const todos = this.state.todos.map((todo, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
                <div className="d-flex align-items-center">
                    <input type='checkbox' name='is_completed' checked={todo.is_completed} onChange={this.toggleCompleted(index)} />
                    <span className={`ml-2 ${todo.is_completed && 'line-through'} `}>{todo.task}</span>
                </div>
                <div className="ml-2">
                    <a href="#" onClick={this.handleEdit(index)} className="mr-2">Edit</a>
                    <a href="#" onClick={this.deleteTodo(index)}>Delete</a>
                </div>
            </li>
        ))
        return todos
    }

    render() {
        const { todo, error, action } = this.state
        return (
            <React.Fragment>
                <Navbar />
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-9 mb-3">
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
                        <div className="col-md-3"></div>
                        <div className="col-md-9">
                            <ul className="list-group list-group-flush">
                                {this.renderTodos()}
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default App;
