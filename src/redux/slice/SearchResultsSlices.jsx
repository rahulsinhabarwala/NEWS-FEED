import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk(
  "searchResults/fetchSearchResults",
  async ({query, page, pageSize}) => {
    try {
      const response = await axios.get(
        `https://content.guardianapis.com/search?api-key=test&q=${query}&show-fields=thumbnail,headline&show-tags=keyword&page=${page}&page-size=${pageSize}`
      );
      const {results} = response.data.response;
      const totalResults = response.data.response.total;
      const totalPages = Math.ceil(totalResults / pageSize);
      return {results, currentPage: page, totalPages};
    } catch (error) {
      throw error.response.data.error;
    }
  }
);

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setPage} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
