import React from 'react'

const TodoList = ({ todos, toggleCompleted, handleEdit, deleteTodo }) => {
    return (
        <ul className="list-group list-group-flush">
            {
                todos.map((todo, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
                        <div className="d-flex align-items-center">
                            <input type='checkbox' name='is_completed' checked={todo.is_completed} onChange={toggleCompleted(index)} />
                            <span className={`ml-2 ${todo.is_completed && 'line-through'} `}>{todo.task}</span>
                        </div>
                        <div className="ml-2">
                            <a href="#" onClick={handleEdit(index)} className="mr-2">Edit</a>
                            <a href="#" onClick={deleteTodo(index)}>Delete</a>
                        </div>
                    </li>
                ))
            }
        </ul>

    )
}
export default TodoList