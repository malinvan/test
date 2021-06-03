import 
  React, 
  { useState, 
  } from 'react'
import { 
  useDispatch
} from "react-redux";
import styled from 'styled-components/macro';

// Reducers
import { searchUsers } from "../reducers/users";

// Components
import { SearchResults } from '../components/SearchResults'

const PageContainer = styled.section`

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 20px;
`;

const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: white;
  border: none;
  border-bottom: 2px black solid;
  padding: 20px;
  font-size: 20px;
  color: black;
  border-radius: 5px 5px 0 0;
`;

const Button = styled.button`
  background-color: #495867;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

export const SearchPage = () => {
  const [searchValue, setSearchvalue] = useState('')

  const dispatch = useDispatch();
  

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUsers(searchValue));
    console.log(searchValue);
  }

  return (
    <PageContainer>
      <Form onSubmit={onFormSubmit}>
        <Label>Search for users</Label>
        <Inputdiv>
          <Input 
            type="text"
            onChange={(e) => setSearchvalue(e.target.value)}
          />
          <Button>SEARCH</Button>
        </Inputdiv>
      </Form>
      <SearchResults />
    </PageContainer>
  )
}