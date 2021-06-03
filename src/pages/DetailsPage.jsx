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
import { FaBriefcase } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Container = styled.section`
  width: 100vw;
  @media (min-width: 1025) {
    display: flex;
    flex-direction: row;
  }
`;

const InfoContainer = styled.section`
  background-color: white;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 30px;
  }
  @media (min-width: 1025) {
    font-size: px;
  }
`;

const Infodiv = styled.div`
  margin: 30px 0 0 0px;
  font-size: 15px;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    font-size: 20px;
  // justify-content: space-evenly;
  }
  @media (min-width: 1025px) {
    display: flex;
    flex-direction: row;
    font-size: 20px;
  // justify-content: space-evenly;
  }
`;

const ReposContainer = styled.section`
  margin: 0 20px;
`;

const RepoContainer = styled.section`
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
    &:hover {
      box-shadow: 0px 0px 15px 5px #CCCCCC;
    }
`;

const RepoLink = styled.a`
  color: black;
  text-decoration: none;
`;

const AvatarNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h1`
  margin-bottom: 10px;
`;

const Login = styled.p`
  color: #7d7d7d;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 30%;
  margin-right: 30px;
`;

const UserInfo = styled.div`
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-right: 40px;
  }
`;

const RepoInfo = styled.div`
  // margin-right: 60px;
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
              <NameContainer>
                <Name>{user.name}</Name>
                <Login>@{user.login}</Login>
              </NameContainer>
            </AvatarNameDiv>
            <p>"{user.bio}"</p>
            <Infodiv>
              <UserInfo>
                <p><FaMapMarkerAlt />{user.location === null ? 'Unknown' : user.location}</p>
                <p><FaBriefcase /> Company: {user.company === null ? 'Unknown' : user.company}</p>
                <p><FaEnvelope /> {user.email}</p>
              </UserInfo>
              <RepoInfo>
                <p>Public Repos: {user.public_repos}</p>
                <p>Private Repos: {!user.owned_private_repos ? 'None' : user.owned_private_repos}</p>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
              </RepoInfo>
            </Infodiv>
          </InfoContainer>
          <ReposContainer>
            <h1>Repos</h1>
            {repos &&
              repos.map((repo) => (
                <RepoContainer>
                  <RepoLink href={repo.html_url}>
                    <h1>{repo.full_name}</h1>
                    <p>Languages: {repo.language === null ? 'Unknown' : repo.language}</p>
                    <p>Forks: {repo.forks}</p>
                    <p>Private: {repo.private === false ? 'No' : 'Yes'}</p>
                  </RepoLink>
                </RepoContainer>
              ))}
          </ReposContainer>
        </>
      )}
    </Container>
  );
};
