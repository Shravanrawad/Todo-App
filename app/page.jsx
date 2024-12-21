"use client";

import React, { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import TodoCard from "@/components/TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "./redux/services/todoSlice";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    priority: "all",
  });

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  useEffect(() => {
    const updatedTodos = todos.filter((todo) => {
      const matchesCategory =
        filters.category === "all" || todo.category === filters.category;
      const matchesPriority =
        filters.priority === "all" || todo.priority === filters.priority;
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPriority && matchesSearch;
    });

    setFilteredTodos(updatedTodos);
  }, [todos, filters, searchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Filter
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {filteredTodos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
}
