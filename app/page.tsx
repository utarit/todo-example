"use client";

import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types";
import { useState, FormEvent, useCallback } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const activeTodos = todos
    .filter((todo) => !todo.archived)
    .sort((a, b) => b.created.getTime() - a.created.getTime());

  const archivedTodos = todos
    .filter((todo) => todo.archived)
    .sort((a, b) => b.created.getTime() - a.created.getTime());

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Read the form data
    const formData = new FormData(event.target as HTMLFormElement);

    const todo = (formData.get("todo") as string).trim();

    setTodos((prev) => [
      ...prev,
      { content: todo, archived: false, created: new Date(), id: Date.now() },
    ]);
  }, []);

  const handleArchive = useCallback((todo: Todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, archived: true } : t))
    );
  }, []);

  const handleEdit = useCallback((todo: Todo, newContent: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? { ...t, content: newContent, lastUpdated: new Date() }
          : t
      )
    );
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-4 md:pt-10 px-4 w-full md:max-w-md">
      <h1 className="text-3xl font-bold">Example TODO App</h1>
      <form
        className="flex flex-col items-center gap-4 p-8 shadow-md my-4 w-full bg-slate-100"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-2 items-start w-full">
          <small>Add todo</small>
          <input
            className="border border-gray-500 rounded-md p-2 w-full"
            placeholder="Add a new todo"
            required
            name="todo"
            maxLength={140}
            type="text"
            pattern=".*\S.*"
            title="Please enter a non-empty value"
          />
        </label>

        <button className="w-full bg-blue-500 rounded-md p-2" type="submit">
          Add
        </button>
      </form>
      <section className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold">Active Todos</h2>
        {(!activeTodos || activeTodos.length === 0) && (
          <p className="italic text-gray-500">No todos yet</p>
        )}
        <ul aria-label="todo list">
          {activeTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onArchive={handleArchive}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold">Archived Todos</h2>
        {(!archivedTodos || archivedTodos.length === 0) && (
          <p className="italic text-gray-500">No archived todos yet</p>
        )}
        <ul aria-label="archived list">
          {archivedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </section>
    </main>
  );
}
