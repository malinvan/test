import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 30px;
`;

export const Header = () => {
  return (
  <Container>
    <Title>GitSearch</Title>
  </Container>
  )
}
