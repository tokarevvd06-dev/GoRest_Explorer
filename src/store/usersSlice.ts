import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, PaginatedResponse } from '../types/api';
import type { RootState } from './index';
import { getUsers, getUserById } from '../api/gorest';

type PerPage = 10 | 25 | 50;

interface UsersState {
  list: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  perPage: PerPage;
  totalPages: number;
}

const initialState: UsersState = {
    list: [],
    currentUser: null,
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
};

export const fetchUsers = createAsyncThunk<
  PaginatedResponse<User>,
  { page: number; perPage: number },
  { state: RootState }
>(
  'users/fetchAll',
  async ({ page, perPage }, { getState }) => {
    const token = getState().auth.token;
    return await getUsers(token, page, perPage);
  }
);

export const fetchUserById = createAsyncThunk<
  User,
  number,
  { state: RootState }
>(
  'users/fetchOne',
  async (id, { getState }) => {
    const token = getState().auth.token;
    return await getUserById(token, id);
  }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
      setPerPage: (state, action: PayloadAction<PerPage>) => {
        state.perPage = action.payload;
        state.currentPage = 1; 
      },
      clearUsers: () => initialState,
      clearCurrentUser: (state) => {
        state.currentUser = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.list = action.payload.data;
          state.totalPages = action.payload.totalPages;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Failed to load users';
        })
        .addCase(fetchUserById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.loading = false;
          state.currentUser = action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Failed to load user';
        });
    },
  });
  
  export const { setCurrentPage, setPerPage, clearUsers, clearCurrentUser } = usersSlice.actions;
  export default usersSlice.reducer;