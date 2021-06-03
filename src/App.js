import React from 'react'

// Redux
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'

// React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import of reducers
import { repo } from './reducers/repo'
import { users } from './reducers/users'
import { ui } from './reducers/ui'

// Import of pages/components
import { SearchPage } from './pages/SearchPage'
import { DetailsPage } from './pages/DetailsPage'

const reducer = combineReducers({
  users: users.reducer,
  repo: repo.reducer,
  ui: ui.reducer
})

const store = configureStore({ reducer })


export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SearchPage} />
          <Route exact path='/user/:id' component={DetailsPage}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
