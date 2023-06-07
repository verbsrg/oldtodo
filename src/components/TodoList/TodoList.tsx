import React from "react";
import { TodoPanel } from "../TodoPanel/TodoPanel";
import { TodoItem } from "./TodoItem/TodoItem";

interface TodoListProps {
    todos: Todo[];
    todoIdForEdit: Todo['id'] | null;
    changeTodo: ({ name, description }: Omit<Todo, 'checked' | 'id'>) => void;
    checkTodo: (id: Todo['id']) => void;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, todoIdForEdit, checkTodo, deleteTodo, selectTodoIdForEdit, changeTodo }) => {
        return <div>
        {todos.map((todo) => {
            if (todo.id === todoIdForEdit) return <TodoPanel mode='edit' changeTodo={changeTodo} key={todo.id} editTodo={{name: todo.name, description: todo.description}} />;
        
            return (
            <TodoItem 
            key={todo.id} 
            todo={todo} 
            checkTodo={checkTodo} 
            deleteTodo={deleteTodo} 
            selectTodoIdForEdit={selectTodoIdForEdit} 
            />
        )
            })}
    </div>;
}