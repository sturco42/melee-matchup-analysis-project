import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Navigation from './Navigation'
import Profile from './Profile'
import Authentication from './Authentication';
import Home from './Home'

function App() {
  const [user, setUser] = useState(null)
  const [characters, setCharacters] = useState(null)

  const history = useHistory()

  //! will be used to set mains for users
  useEffect(() => {
    fetch('/characters')
      .then((res) => res.json())
      .then(setCharacters)
      .catch((err) => console.log(err));
  }, []);

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

  //! will be used to logout
  function handleLogoutClick() {
    fetch('/logout', { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          updateUser(null);
          history.push('/authentication');
        }
      });
  }

  useEffect(() => {
    const fetchUser = () => {
      fetch('/authenticate')
        .then((res) => {
          if (res.ok) {
            res.json().then(updateUser)
          } else {
            setUser(null)
          }
        })
    };
    fetchUser()
  }, [])

  return (
    <>
      <div>
        Hello World
      </div>
      <Navigation handleLogoutClick={handleLogoutClick}/>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/user/:id' >
          <Profile
            user={user}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        </Route>
        <Route exact path='/login'>
          <Authentication />
        </Route>
      </Switch>
    </>
  )
}

export default App;