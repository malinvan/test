import 
  React, 
  { useState, 
    // useEffect 
  } from 'react'
import { 
  useDispatch, 
  // useSelector 
} from "react-redux";

// Reducers
import { searchUsers } from "../reducers/users";

// Components
import { SearchResults } from '../components/SearchResults'


export const SearchPage = () => {
  const [searchValue, setSearchvalue] = useState('')

  const dispatch = useDispatch();
  

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUsers(searchValue));
    console.log(searchValue);
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>Search for users</label>
        <input 
          type="text"
          onChange={(e) => setSearchvalue(e.target.value)}
        />
        <button>SEARCH</button>
      </form>
      <SearchResults />
    </>
  )
}