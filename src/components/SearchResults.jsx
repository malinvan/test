import React from 'react'
import { useSelector } from "react-redux";
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom'

import { NoResults } from 'components/NoResults'

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20%;
  margin: 10px 60px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  // padding-right: 20px;
`;

const Username = styled.p`
  margin-left: 20px;
  color: black;
`;

export const SearchResults = () => {
  const searchResults = useSelector((state) => state.users.searchResults);
  console.log(searchResults);

  return (
    <Container>
      {
        searchResults && searchResults.items.map((result) => (
          <Link key={result.id} to={`/user/${result.login}`}>
            <UserContainer>
              <Avatar src={result.avatar_url} />
              <Username>{result.login}</Username>
            </UserContainer>
          </Link>
        ))
      }
      {/* {!searchResults && <NoResults />} */}
    </Container>
  )
}