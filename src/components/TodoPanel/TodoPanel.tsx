import React from "react";
import { Button } from "../Button/Button";

import styles from "./TodoPanel.module.css"

const DEFAULT_TODO = {
    name: '',
    description: ''
}

interface AddTodoPanelProps {
    mode: 'add';
    addTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
}

interface EditTodoPanelProps {
    mode: 'edit';
    editTodo: Omit<Todo, 'id' | 'checked'>
    changeTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
    const isEdit = props.mode === 'edit';
    const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO)
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setTodo({...todo, [name]: value })
    }

    const onClick = () => {
        const todoItem = { name: todo.name, description: todo.description }
        if (isEdit) {
            return props.changeTodo(todoItem)
        }

        props.addTodo(todoItem)
        setTodo(DEFAULT_TODO)
    }

    return (
        <div className={styles.todo_panel_container}>
            <div className={styles.fields_container}>
                <div className={styles.field_container}>
                    <label htmlFor="name">
                        <div>Name</div>
                        <input type="text" id='name' value={todo.name} name='name' onChange={onChange} />
                    </label>
                </div>
                <div className={styles.field_container}>
                    <label htmlFor="description">
                        <div>Description</div>
                        <input type="text" id='description' value={todo.description} name='description' onChange={onChange} />
                    </label>
                </div>
            </div>
            <div className={styles.button_container}>
                {!isEdit && (<Button color='blue' onClick={onClick}>
                                 Add task
                            </Button>)}
                {isEdit && (<Button color='orange' onClick={onClick}>
                                 Edit task
                            </Button>)}
            </div>
        </div>
    )
}