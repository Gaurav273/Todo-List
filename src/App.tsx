import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
 * This is the initial todo state.
 * Instead of loading this data on every reload,
 * we should save the todo state to local storage,
 * and restore on page load. This will give us
 * persistent storage.
 */

const loadTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos
    ? JSON.parse(savedTodos)
    : [
        {
          id: uuid(),
          label: "Buy groceries",
          checked: false,
          created_at: new Date().toISOString(),
          completed_at: null,
        },
        {
          id: uuid(),
          label: "Reboot computer",
          checked: false,
          created_at: new Date().toISOString(),
          completed_at: null,
        },
        {
          id: uuid(),
          label: "Ace CoderPad interview",
          checked: true,
          created_at: new Date().toISOString(),
          completed_at: null,
        },
      ];
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
        created_at: new Date().toISOString(),
        completed_at: null,
      },
      ...prev,
    ]);
  }, []);

  const handleChange = useCallback((id: string, checked: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              checked,
              completed_at: checked ? new Date().toISOString() : null,
            }
          : todo
      )
    );
  }, []);
  const handleDelete = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); //
  }, []);

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.checked === b.checked) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return a.checked ? 1 : -1;
  });

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onChange={(checked) => handleChange(todo.id, checked)}
            onDelete={handleDelete}
          />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
