import React, { useState, useEffect, createContext } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  /*effect dung để khi reload lại trang thì  không đổi  list item */
  useEffect(() => {
    fetchTodos();
  }, []);
  //fetch todos
  const fetchTodos = async () => {
    const response = await fetch(`/todos?_sort=id&_order=desc`);
    const data = await response.json();
    setTodos(data);
  };
  //add todo
  const addTodos = async (newTodos) => {
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodos),
    });
    const data = await response.json();
    setTodos([data, ...todos]);
    console.log(data);
  };
  //delete todos
  const deleteTodos = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter((item) => item.id !== id));
    }
  };
  const updateTodos = async (id, upItem) => {
    const response = await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(upItem),
    });
    const data = await response.json();
    setTodos(
      todos.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };
  useEffect(() => {
    const todoStore = JSON.parse(localStorage.getItem("todoStore"));
    if (todoStore) setTodos(todoStore);
  }, []);
  useEffect(() => {
    localStorage.setItem("todoStore", JSON.stringify(todos));
  }, [todos]);

  return (
    <DataContext.Provider value={[todos, setTodos]}>
      {children}
    </DataContext.Provider>
  );
};
