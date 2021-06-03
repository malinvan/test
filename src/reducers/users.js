import { createSlice } from "@reduxjs/toolkit";
import { octokit } from "github-client/client";

export const users = createSlice({
  name: "users",
  initialState: {
    user: null,
    searchResults: null,
  },
  reducers: {
    setUser: (store, action) => {
      store.user = action.payload;
    },
    setSearchResult: (store, action) => {
      store.searchResult = action.payload;
    },
  },
});

export const getUser = () => {
  return async (dispatch, getState) => {
    const response = await octokit.rest.
  }
}