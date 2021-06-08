import { createSlice } from "@reduxjs/toolkit";
import { octokit } from "github-client";
import { ui } from 'reducers/ui';

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
      store.searchResults = action.payload;
    },
  },
});

//  Thunk to retrieve given user
 export const getUser = (userName) => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

    const response = await octokit.rest.users.getByUsername({
      username: userName,
    });
      dispatch(users.actions.setUser(response.data))
      dispatch(ui.actions.setLoading(false));
  }
}

// Thunk for search field
export const searchUsers = (userName) => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    const response = await octokit.rest.search.users({
      q: userName,
    })
    dispatch(ui.actions.setLoading(false));
    dispatch(users.actions.setSearchResult(response.data))
  }
}