import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await api.get("/users");
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (user: User) => {
    const response = await api.post("/users", user);
    return response.data;
  }
);

export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async (user: User) => {
    const response = await api.put(`/users/${user._id}`, user);
    return response.data;
  }
);

export const deleteUserById = createAsyncThunk(
  "users/deleteUserById",
  async (id: string) => {
    await api.delete(`/users/${id}`);
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
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        const { _id, name, email, phone } = action.payload.data;
        const existingUser = state.users.find((user) => user._id === _id);
        if (existingUser) {
          existingUser.name = name;
          existingUser.email = email;
          existingUser.phone = phone;
        }
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        const id = action.payload;
        state.users = state.users.filter((user) => user._id !== id);
      });
  },
});

export const selectAllUsers = (state: { users: UsersState }) =>
  state.users.users;
export const selectUserById = (state: { users: UsersState }, userId: string) =>
  state.users.users.find((user) => user._id === userId);
export const selectUserStatus = (state: { users: UsersState }) =>
  state.users.status;
export const selectUserError = (state: { users: UsersState }) =>
  state.users.error;

export default usersSlice.reducer;
