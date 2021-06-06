import { createSlice } from "@reduxjs/toolkit";
import { octokit } from "github-client";
import { ui } from 'reducers/ui';

export const users = createSlice({
  name: "users",
  initialState: {
    user: null,
    searchResults: {
      total_count: 0,
      items: []
    },
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
    dispatch(ui.actions.setLoader(true));

    console.log(userName);
    const response = await octokit.rest.users.getByUsername({
      username: userName,
    });
    console.log(response);
      dispatch(users.actions.setUser(response.data))
      dispatch(ui.actions.setLoader(false));
  }
}

// Thunk for search field
export const searchUsers = (userName) => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoader(true));
    
    // For pagination
    // const searchResults = getState().users.searchResults
    // let page = 1;
    // if (searchResults) {
    //   searchResults.items / 30 
    // }

    const response = await octokit.rest.search.users({
      q: userName,
    })
    console.log(response);
    dispatch(ui.actions.setLoader(false));
    // if (page === 1) {
    //   dispatch(users.actions.setSearchResult(response.data))
    // } else {
    //   dispatch(users.actions.addSearchResults(response.data.items))
    // }
    dispatch(users.actions.setSearchResult(response.data))
    dispatch(users.actions.addSearchResults(response.data.items))
  }
}

// pagination
// export const loadMoreUsers = (userName, currentPage) => {
//   return async (dispatch, getState) => {
//     dispatch(ui.actions.setLoader(true));
//     // At the end of the page set off thunk to load more users
//     // 
//     dispatch(ui.actions.setLoader(false));
//   }
// }