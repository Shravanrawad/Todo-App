import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo",
        todoData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add todo");
    }
  }
);

export const getTodo = createAsyncThunk(
  "todos/getTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "No todo");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Problem with delete");
    }
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://66fbb8fc8583ac93b40cec5b.mockapi.io/todo/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit todo");
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(getTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload); 
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
      builder.addCase(editTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
  },
});

export default todoSlice.reducer;
