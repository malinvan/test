import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  useRouteMatch, 
  Link, 
  // Redirect 
} from 'react-router-dom'

import { getUser } from '../reducers/users'
import { getRepos } from '../reducers/repo'

export const DetailsPage = () => {
  const match = useRouteMatch("/user/:slug");
  const userName = match.params.slug;
  const user = useSelector((state) => state.users.user)
  const repos = useSelector((state) => state.repo.repos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userName))
    dispatch(getRepos(userName))
    console.log(user);
    console.log(repos);
  }, [userName, dispatch])

  return (
    <>
      <Link to='/'>Go Back</Link>
      {user && (
        <>
          <div>
            <img src={user.avatar_url} />
            <h1>{user.name}</h1>
            <p>{user.location}</p>
            <p>{user.bio}</p>
            <p>Public Repos: {user.public_repos}</p>
          </div>
          <div>
            {repos && repos.map((repo) => (
              <div>
                <h1>{repo.full_name}</h1>
                <p>Languages: {repo.language}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}