import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Post, PostComment, PaginatedResponse } from '../types/api';
import type { RootState } from './index';
import { getPosts, getPostById, getCommentsByPostId } from '../api/gorest';

type PerPage = 10 | 25 | 50;

interface PostsState {
  list: Post[];
  currentPost: Post | null;
  comments: PostComment[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  perPage: PerPage;
  totalPages: number;
}

const initialState: PostsState = {
    list: [],
    currentPost: null,
    comments: [],
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
};

export const fetchPosts = createAsyncThunk<
  PaginatedResponse<Post>,
  { page: number; perPage: number },
  { state: RootState }
>(
  'posts/fetchAll',
  async ({ page, perPage }, { getState }) => {
    const token = getState().auth.token;
    return await getPosts(token, page, perPage);
  }
);

export const fetchPostWithComments = createAsyncThunk<
  { post: Post; comments: PostComment[] },
  number,
  { state: RootState }
>(
  'posts/fetchOneWithComments',
  async (id, { getState }) => {
    const token = getState().auth.token;
    const [post, commentsResponse] = await Promise.all([
      getPostById(token, id),
      getCommentsByPostId(token, id, 1, 100),
    ]);
    return { post, comments: commentsResponse.data };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action: PayloadAction<PerPage>) => {
      state.perPage = action.payload;
      state.currentPage = 1;
    },
    clearPosts: () => initialState,
    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load posts';
      })
      .addCase(fetchPostWithComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostWithComments.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.post;
        state.comments = action.payload.comments;
      })
      .addCase(fetchPostWithComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load post';
      });
  },
});

export const { setCurrentPage, setPerPage, clearPosts, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;