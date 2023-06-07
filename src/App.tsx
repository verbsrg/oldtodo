import React from 'react';

import { Header } from './components/Header/Header';
import { TodoPanel } from './components/TodoPanel/TodoPanel';

import styles from './App.module.css';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(
    null
  );

  const selectTodoIdForEdit = (id: Todo['id']) => {
    setTodoIdForEdit(id);
  };

  // const addTodo = ({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
  //   setTodos([
  //     ...todos,
  //     { id: todos[todos.length - 1].id + 1, description, name, checked: false },
  //   ]);
  // };

  const addTodo = ({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
    if (!name || !description) {
      return alert('Please fill in both inputs!');
    }
    const newTodo: Todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1, // Generate a new unique ID
      description,
      name,
      checked: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]); // Use the previous state to update the todos array
  };

  const checkTodo = (id: Todo['id']) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: Todo['id']) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeTodo = ({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };

  console.log('todos, setTodos', todos, setTodos);

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header todoCount={todos.length} />
        <TodoPanel mode="add" addTodo={addTodo} />
        <TodoList
          todos={todos}
          todoIdForEdit={todoIdForEdit}
          checkTodo={checkTodo}
          deleteTodo={deleteTodo}
          selectTodoIdForEdit={selectTodoIdForEdit}
          changeTodo={changeTodo}
        />
      </div>
    </div>
  );
};
