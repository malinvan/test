import React from 'react'
import { useSelector } from "react-redux";
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom'

import { NoResults } from './NoResults'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    @media (min-width: 1025px) {
      margin: 0 auto;
    }
`;

const LinkTag = styled(Link)`
  text-decoration: none;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  margin: 10px 60px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  @media (min-width: 1025px) {
    width: 100px;
  }
`;

const Username = styled.p`
  margin-left: 20px;
  color: black;
  font-size: 25px;
`;

export const SearchResults = () => {
  const searchResults = useSelector((state) => state.users.searchResults);

  return (
    <Container>
      {
        searchResults && searchResults.items.map((result) => (
          <LinkTag key={result.id} to={`/user/${result.login}`}>
            <UserContainer>
              <Avatar src={result.avatar_url} />
              <Username>{result.login}</Username>
            </UserContainer>
          </LinkTag>
        ))
      }
      {searchResults && searchResults.total_count === 0 ? <NoResults /> : ''}
    </Container>
  )
}