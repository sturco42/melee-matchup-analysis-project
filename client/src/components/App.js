import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation'
import Profile from './Profile'

function App() {
  
  
  return (
    <>
      <div>
        Hello World
      </div>
      <Navigation />
      <Switch>
        <Route exact path='/user/:id' >
          <Profile
            user={user}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App;