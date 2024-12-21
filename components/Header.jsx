"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTodo } from "@/app/redux/services/todoSlice";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.string().min(1, "Priority is required"),
});

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsopen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = (data) => {
    dispatch(addTodo(data));
    reset();
    setIsopen(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 shadow-md">
      <div className="text-2xl font-bold text-blue-400 dark:text-gray-200">
        
      </div>

      <div className="flex items-center gap-4">
        <Dialog open={isOpen} onOpenChange={setIsopen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2" variant="blue">
              <PlusCircle className="w-5 h-5" />
              Create Todo
            </Button>
          </DialogTrigger>

          <DialogContent className="p-6 sm:p-8 lg:p-12 w-full max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
            <DialogTitle className="text-center text-lg lg:text-xl font-bold">
              Create a New Todo
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             
              <div>
                <Input
                  placeholder="Title..."
                  className="w-full"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

            
              <div>
                <Input
                  placeholder="Description..."
                  className="w-full"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
                <div className="w-full lg:w-1/2">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.priority && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
              </div>

             
              <Button type="submit" className="w-full lg:w-auto lg:mx-auto">
                Add Todo
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="flex items-center space-x-2"
        >
          {darkMode ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </Button>
      </div>
    </header>
  );
}
