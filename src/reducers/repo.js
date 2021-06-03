import { createSlice } from "@reduxjs/toolkit";
import { octokit } from "github-client/client";
import { ui } from 'reducers/ui';

export const repo = createSlice({
  name: "repo",
  initialState: {
    repos: [],
  },
  reducers: {
    setRepos: (store, action) => {
      store.repos = action.payload;
    },
  },
});


export const getRepos = (userName) => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoader(true));

    console.log(userName);
    const response = await octokit.rest.repos.listForUser({
      username: userName
    });
    console.log(response);
    dispatch(ui.actions.setLoader(false));
    dispatch(repo.actions.setRepos(response.data))
  }
}