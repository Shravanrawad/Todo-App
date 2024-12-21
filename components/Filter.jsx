"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./ui/input";

export default function Filter({ onFilterChange, onSearchChange }) {
  
  const [filters, setFilters] = useState({
    category: "all",
    priority: "all",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    onFilterChange({ ...filters, [field]: value });
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value); 
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 shadow-md flex flex-wrap sm:flex-nowrap gap-4 items-center">
    
      <div className="w-full sm:w-[200px]">
        <Input
          placeholder="Search todos..."
          onChange={handleSearchChange}
          className="w-full shadow-md"
        />
      </div>

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(value) => handleFilterChange("category", value)}
          value={filters.category}
        >
          <SelectTrigger className="shadow-md">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

     
      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(value) => handleFilterChange("priority", value)}
          value={filters.priority}
        >
          <SelectTrigger className="shadow-md">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

     
      <div className="w-full sm:w-auto mt-3 sm:mt-0">
        <Button
          variant="destructive"
          onClick={() => {
            setFilters({ category: "all", priority: "all"});
            onFilterChange({ category: "all", priority: "all"});
          }}
          className="w-full sm:w-auto"
        >
          Clear Filters
        </Button>
      </div>

    </div>
  );
}
