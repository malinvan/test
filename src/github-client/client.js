import { Octokit } from "octokit";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
export const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });