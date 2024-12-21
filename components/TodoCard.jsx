import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteTodo, editTodo } from "@/app/redux/services/todoSlice";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

function TodoCard({ todo }) {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: todo.title,
      description: todo.description,
      category: todo.category,
      priority: todo.priority,
    },
  });

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEditSubmit = (data) => {
    dispatch(editTodo({ id: todo.id, updatedData: data }));
    setIsEditOpen(false);
    reset();
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-md border border-gray-300 transition-shadow mb-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {todo.title.slice(0, 40)}...
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {todo.description.slice(0, 54)}...
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="text-xs sm:text-sm px-3 py-1 rounded-md"
        >
          {todo.category}
        </Badge>
        <Badge
          variant="outline"
          className={`text-xs sm:text-sm px-3 py-1 rounded-md ${
            todo.priority === "high"
              ? "bg-red-100 text-red-700"
              : todo.priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {todo.priority}
        </Badge>
      </div>

      <div className="mt-4 flex justify-end gap-4 items-center">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="icon" className="text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-36 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-500 hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="p-6 sm:p-8 lg:p-12 w-full max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
          <DialogTitle className="text-center text-lg lg:text-xl font-bold">
            Edit Todo
          </DialogTitle>

          <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-6">
           
            <div>
              <Input
                placeholder="Title"
                {...register("title", { required: "Title is required" })}
                className="w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            
            <div>
              <Input
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full"
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
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  rules={{ required: "Priority is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TodoCard;
