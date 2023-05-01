import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "../slice/UserSlices";
import newsSearchQueryReducer from "../slice/NewsSearch";
import searchResultsReducer from "../slice/SearchResultsSlices";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    newsSearchQuery: newsSearchQueryReducer,
    searchResults: searchResultsReducer,
  },
});

export default store;
