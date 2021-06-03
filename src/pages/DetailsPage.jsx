import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useRouteMatch,
  Link,
  // Redirect
} from "react-router-dom";
import styled from "styled-components/macro";

// Reducers
import { getUser } from "../reducers/users";
import { getRepos } from "../reducers/repo";

// Font Awesome
import { FaAngleLeft } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const Container = styled.section`
  width: 100vw;
`;

const InfoContainer = styled.section`
  box-shadow: 0px 0px 15px 5px #CCCCCC;
  padding: 20px;
  margin: 20px;
`;

const ReposContainer = styled.section`
  margin: 0 20px;
`;

const RepoContainer = styled.section`

`;

const AvatarNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 20%;
  margin-top: 10%;
  margin-right: 30px;
`;

export const DetailsPage = () => {
  const match = useRouteMatch("/user/:slug");
  const userName = match.params.slug;
  const user = useSelector((state) => state.users.user);
  const repos = useSelector((state) => state.repo.repos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userName));
    dispatch(getRepos(userName));
    console.log(user);
    console.log(repos);
  }, [userName, dispatch]);

  return (
    <Container>
      <Link to="/">
        <FaAngleLeft />
        Back
      </Link>
      {user && (
        <>
          <InfoContainer>
            <AvatarNameDiv>
              <Avatar src={user.avatar_url} />
              <h1>{user.name}</h1>
            </AvatarNameDiv>
            <p><FaMapMarkerAlt />{user.location === null ? <p>Unknown</p> : user.location}</p>
            <p>{user.bio}</p>
            <p>Public Repos: {user.public_repos}</p>
          </InfoContainer>
          <ReposContainer>
            {repos &&
              repos.map((repo) => (
                <RepoContainer>
                  <h1>{repo.full_name}</h1>
                  <p>Languages: {repo.language}</p>
                  <p>Forks: {repo.forks}</p>
                  <p>Private: {repo.private === false ? <p>No</p> : <p>Yes</p>}</p>
                </RepoContainer>
              ))}
          </ReposContainer>
        </>
      )}
    </Container>
  );
};
