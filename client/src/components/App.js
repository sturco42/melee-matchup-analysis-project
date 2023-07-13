import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation'
import Profile from './Profile'

function App() {
  const [user, setUser] = useState(null)

  const updateUser = (user) => {
    setUser(user);
  };

  const removeUser = (user) => {
    setUser((currentUser) => {
      if (currentUser.user) {
        return {
          ...currentUser,
          user: currentUser.user.filter(
            (otherUser) => otherUser.id !== user.id
          ),
        };
      }
      return currentUser
    })
  }

  function deleteUser() {
    fetch(`/users/${user.id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          removeUser(user)
          setUser(null)
          alert('Successfully Deleted User')
          history.push('/login')
        } else {
          alert('Something went wrong')
        }
      })
  }

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