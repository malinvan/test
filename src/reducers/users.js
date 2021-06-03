import { createSlice } from "@reduxjs/toolkit";
import { octokit } from "github-client";

export const users = createSlice({
  name: "users",
  initialState: {
    // user: null,
    searchResults: null,
  },
  reducers: {
    // setUser: (store, action) => {
    //   store.user = action.payload;
    // },
    setSearchResult: (store, action) => {
      store.searchResult = action.payload;
    },
  },
});


// Thunk for search field
export const searchUsers = (userName) => {
  return async (dispatch, getState) => {
    const response = await octokit.rest.search.users({
      q: userName,
    })
    console.log(response);
    dispatch(users.actions.setSearchResult(response.data))
  }
}