import { createSlice } from "@reduxjs/toolkit";
import { octokit } from "github-client/client";

export const repo = createSlice({
  name: "repo",
  initialState: {
    repos: [],
  },
  reducers: {
    setRepos: (store, actions) => {
      store.repo = action.payload;
    },
  },
});

export const getRepos = (userName) => {
  return async (dispatch) => {
    const response = await octokit.rest.repos.listForAuthenticatedUser({
      username: userName,
      affiliation: 'owner',
      visibility: 'all',
      per_page: 20,
      sort: 'pushed'
    })
    console.log(response);
    dispatch(repo.actions.setRepos(response.data))
  }
}


// octokit.rest.repos.listForUser({
//   username,
// });