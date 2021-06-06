import React from 'react'
import styled from 'styled-components/macro';

const Text = styled.h1`
  margin: 0 auto;
`;

export const NoResults = () => {
  return <Text>Ooops, there was no match for that user. Try again 😊</Text>
}