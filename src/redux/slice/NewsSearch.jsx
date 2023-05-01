import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  newsSearchQuery: "",
};

const newsSearchQuery = createSlice({
  name: "newsSearchQuery",
  initialState,
  reducers: {
    searchQuery: {
      reducer: (state, action) => {
       state.newsSearchQuery = action.payload;
      },
    },
  },
});

export const {searchQuery} = newsSearchQuery.actions;
export default newsSearchQuery.reducer;
