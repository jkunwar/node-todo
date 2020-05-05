import React from 'react';
import './App.css';
import { Row, Col, Card, message } from 'antd';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoServices'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

class App extends React.Component {

    state = {
        todos: [],
        todo: '',
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

    handleSubmit = async (value) => {
        let { action, selectedTodoID } = this.state
        let todos = [...this.state.todos]
        if (value.todo === undefined || value.todo === '') {
            this.setState({ error: 'Task field is required' })
            return
        }
        if (action === 'add') {
            const { payload, status } = await addTodo(value.todo)
            if (status !== 201) return
            message.success('Item added')
            todos.unshift(payload)
        } else if (action === 'update' && selectedTodoID !== null) {
            const { payload, status } = await updateTodo(selectedTodoID, value.todo)
            if (status !== 200) return
            const index = todos.findIndex(todo => todo.id === payload.id)
            if (index === -1) return
            message.success('Item updated')
            todos[index] = payload
        }
        this.setState({ todos, todo: '', action: 'add', error: '', selectedTodoID: null })
    }

    handleEdit = id => () => {
        let todos = [...this.state.todos]
        const index = todos.findIndex(todo => todo.id === id)
        if (index === -1) return
        const { task } = todos[index]
        this.setState({ todo: task, selectedTodoID: id, action: 'update' })
    }

    toggleCompleted = async (id) => {
        let todos = [...this.state.todos]
        const index = todos.findIndex(todo => todo.id === id)
        if (index === -1) return
        const { is_completed, task } = todos[index]
        const { payload, status } = await updateTodo(id, task, !is_completed)
        if (status !== 200) return
        todos[index] = payload
        message.success('Todo status changed')
        this.setState({ todos: todos })
    }

    deleteTodo = async id => {
        let todos = [...this.state.todos]
        const index = todos.findIndex(todo => todo.id === id)
        if (index === -1) return
        const { status } = await deleteTodo(id)
        if (status !== 204) return
        todos.splice(index, 1)
        message.info('Item deleted')
        this.setState({ todos: todos })
    }

    render() {
        const { todo, action, todos } = this.state
        return (
            <Row justify="center" align="middle" gutter={[0, 20]} className="todos-container">

                <Col sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
                    <Card title="Create a new todo">
                        <TodoForm
                            todo={todo}
                            action={action}
                            handleSubmit={this.handleSubmit}
                        />
                    </Card>
                </Col>

                <Col sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
                    <Card title="Todo List">
                        <TodoList
                            todos={todos}
                            toggleCompleted={this.toggleCompleted}
                            handleEdit={this.handleEdit}
                            deleteTodo={this.deleteTodo} />
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default App;