import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import api from "../../utils/api";

export interface User {
  _id: string;
  name: string;
  price: number;
  description: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  message: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  message: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await api.get("/products");
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (user: User) => {
    const response = await api.post("/products", user);
    return response.data;
  }
);

export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async (user: User) => {
    const response = await api.put(`/products/${user._id}`, user);
    return response.data;
  }
);

export const deleteUserById = createAsyncThunk(
  "users/deleteUserById",
  async (id: string) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ?? "Failed to fetch users";
        notification.error({
          message: action.error.message ?? "Failed to fetch users",
        });
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        const { _id, name, email, phone } = action.payload.data;
       const userIndex = state.users.findIndex((user) => user._id === _id);
       state.users[userIndex] = action.payload.data

      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        const id = action.payload;
        state.users = state.users.filter((user) => user._id !== id);
      });
  },
});

export const selectUsers = (state: { users: UsersState }) => state.users;

export default usersSlice.reducer;
