import React from 'react'
import { Row, Col, Form, Button, Input } from 'antd';

const TodoForm = ({ action, todo, handleSubmit }) => {

    const [form] = Form.useForm()

    form.setFieldsValue({
        'todo': todo
    })
    const onFinish = () => {
        handleSubmit({
            todo: form.getFieldValue('todo')
        })
        form.resetFields()
    }

    return (
        <Form
            initialValues={{ todo: todo }}
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className="todo-form"
        >
            <Row gutter={20}>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item name="todo" rules={[{ required: true, message: 'This field is required' }]}>
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                        {action === 'add' ? 'Add' : 'Update'} todo
                </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default TodoForm