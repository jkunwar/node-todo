import React from 'react'
import { List, Tooltip, Switch, Popconfirm } from 'antd'
import { CloseOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

export default function TodoList({ todos, toggleCompleted, handleEdit, deleteTodo }) {
    return (
        <List
            locale={{
                emptyText: "There's nothing to do :("
            }}
            dataSource={todos}
            renderItem={(todo, index) => (
                <List.Item
                    actions={[
                        <Tooltip title={todo.is_completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={() => toggleCompleted(todo.id)}
                                defaultChecked={todo.is_completed}
                            />
                        </Tooltip>,
                        <Popconfirm
                            title="Are you sure you want to delete?"
                            onConfirm={() => {
                                deleteTodo(todo.id);
                            }}
                        >
                            <DeleteOutlined className="remove-todo-button" />
                        </Popconfirm>,
                    ]}
                    className="list-item"
                    key={todo.id}
                >
                    <div className="todo-item">
                        <p onClick={handleEdit(todo.id)} style={{ cursor: 'pointer' }}>{todo.task}</p>
                    </div>
                </List.Item>
            )}
            pagination={{
                position: 'bottom',
                pageSize: 10
            }}
        />
    )
}
