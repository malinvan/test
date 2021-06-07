import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components/macro";

// Reducers
import { getUser } from "../reducers/users";
import { getRepos } from "../reducers/repo";
import { addStar } from "../reducers/repo";

// Font Awesome
import { FaAngleLeft } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Back = styled.button`
  color: black;
  background: #d9d9d9;
  font-weigh: bold;
  border: none;
`;

const Container = styled.section`
  width: 100vw;
  @media (min-width: 1025px) {
    display: flex;
    flex-direction: row;
  }
`;

const InfoContainer = styled.section`
  background-color: #f8f8f8;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 30px;
  }
  @media (min-width: 1025px) and (max-width: 2000px) {
    width: 30vw;
    height: 100vh;
    flex-grow: 1;
  } ;
`;

const Infodiv = styled.div`
  margin: 30px 0 0 0px;
  font-size: 15px;
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    font-size: 20px;
  }
  @media (min-width: 1025px) {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    // justify-content: space-evenly;
  }
`;

const ReposContainer = styled.section`
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  // justify-content: flex-start;
  margin: 0 20px;
  @media (min-width: 1025px) {
    width: 70vw;
  }
`;

const RepoContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 0px 15px 5px #cccccc;
  }
  @media (min-width: 1025px) and (max-width: 2000px) {
    margin-left: 30px;
  }
`;

const RepoLink = styled.a`
  color: black;
  text-decoration: none;
  @media (min-width: 1025px) {
    display: inline-block;
  }
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

const Bio = styled.p`
  font-style: italic;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 30%;
  margin-right: 30px;
  @media (min-width: 1025px) {
    width: 120px;
  }
`;

const UserInfo = styled.div`
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-right: 40px;
  }
`;

const RepoInfo = styled.div`
  // margin-right: 60px;
`;

const StarButton = styled.button`
  background-color: #f8f8f8;
  border-radius: 25%;
  border: none;
  &:hover {
    transform: scale(1.5, 1.5);
  }
`;

const Star = styled(FaStar)`
  color: #cfdbd5;
  font-size: 40px;
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
  }, [userName, dispatch]);

  const addStarClick = (e, owner, repository) => {
    e.preventDefault();
    dispatch(addStar(owner, repository));
  };

  return (
    <>
      <Link to="/">
        <Back>
          <FaAngleLeft />
          Back
        </Back>
      </Link>
      <Container>
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
              <Bio>{user.bio === null ? "No bio available" : user.bio}</Bio>
              <Infodiv>
                <UserInfo>
                  <p>
                    <FaMapMarkerAlt />
                    {user.location === null ? "Unknown" : user.location}
                  </p>
                  <p>
                    <FaBriefcase /> Company:{" "}
                    {user.company === null ? "Unknown" : user.company}
                  </p>
                  <p>
                    <FaEnvelope />{" "}
                    {user.email === null ? "Unknown" : user.email}
                  </p>
                </UserInfo>
                <RepoInfo>
                  <p>Public Repos: {user.public_repos}</p>
                  <p>
                    Private Repos:{" "}
                    {!user.owned_private_repos
                      ? "None"
                      : user.owned_private_repos}
                  </p>
                  <p>Followers: {user.followers}</p>
                  <p>Following: {user.following}</p>
                </RepoInfo>
              </Infodiv>
            </InfoContainer>
            <ReposContainer>
              {repos &&
                repos.map((repo) => (
                  <RepoContainer>
                    <RepoLink href={repo.html_url}>
                      <div>
                        <h1>{repo.full_name}</h1>
                        <p>
                          Languages:{" "}
                          {repo.language === null ? "Unknown" : repo.language}
                        </p>
                        <p>Forks: {repo.forks}</p>
                        <p>Private: {repo.private === false ? "No" : "Yes"}</p>
                      </div>
                    </RepoLink>
                    <StarButton
                      className={repo.star ? "yellow" : "gray"}
                      onClick={(e) => {
                        addStarClick(e, repo.owner.login, repo.name);
                      }}
                    >
                      <Star />
                    </StarButton>
                  </RepoContainer>
                ))}
            </ReposContainer>
          </>
        )}
      </Container>
    </>
  );
};
