import { createSlice } from "@reduxjs/toolkit";
import { octokit } from "github-client";
import { ui } from 'reducers/ui';

export const users = createSlice({
  name: "users",
  initialState: {
    user: null,
    searchResults: null,
    currentPage: 0,
  },
  reducers: {
    setUser: (store, action) => {
      store.user = action.payload;
    },
    setSearchResult: (store, action) => {
      store.searchResults = action.payload;
    },
    addSearchResults: (store, action) => {
      store.searchResults.items = [...store.searchResults.items, action.payload];
    }
  },
});

/**
 * Thunk to retrieve given user
 * @param {*} userName - The userame of the user to fetch
 * @returns 
 */
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
    dispatch(users.actions.addSearchResults(response.data.items))
  }
}