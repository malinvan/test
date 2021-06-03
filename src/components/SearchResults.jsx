import React from 'react'
import { useSelector } from "react-redux";
import styled, { keyframes } from 'styled-components';

import { NoResults } from 'components/NoResults'

const Avatar = styled.img`
  border-radius: 50%;
  width: 20%;
`;

export const SearchResults = () => {
  const searchResults = useSelector((state) => state.users.searchResults);
  console.log(searchResults);

  return (
    <>
      {
        searchResults && searchResults.items.map((result) => (
          <a href='github.com'>
            <Avatar src={result.avatar_url} />
            <p>{result.login}</p>
          </a>
        ))
      }
      {!searchResults && <NoResults />}
    </>
  )
}