import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import Navigation from './Navigation'
import Profile from './Profile'
import Authentication from './Authentication'
import Home from './Home'
import SearchChars from './SearchChars'
import Characters from './Characters'
import ContactUs from './ContactUs'
import Notebooks from './Notebooks'
import { UserContext } from './UserContext'
import Clips from './Clips'

function App() {
  const [user, setUser] = useState(null)
  const [chars, setChars] = useState([])
  const [searchChar, setSearchChar] = useState('')
  const history = useHistory()

  useEffect(() => {
    fetch('/characters')
      .then((res) => res.json())
      .then(setChars)
      .catch((err) => console.log(err));
  }, []);

  const charsToDisplay = chars.filter((char) =>
    char.name.toLowerCase().includes(searchChar.toLowerCase())
  );

  const onSearch = (input) => {
    setSearchChar(input);
  };

  const addUserChar = (char) => {
    setUser((currentUser) => ({
      ...currentUser,
      user_characters: [...currentUser.user_characters, char],
    }));
  };

  const removeUserChar = (id) => {
    setUser((currentUser) => ({
      ...currentUser,
      user_characters: currentUser.user_characters.filter(
        (userChar) => userChar.id !== id
      ),
    }));
  };

  const removeNotebook = (id) => {
    setUser((currentUser) => ({
      ...currentUser,
      notebooks: currentUser.notebooks.filter((notebook) => notebook.id !== id)
    }))
  }

  const addNotebook = (notebook) => {
    setUser((currentUser) => ({
      ...currentUser,
      notebooks: [...currentUser.notebooks, notebook]
    }))
  }

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
      return currentUser;
    });
  };

  function deleteUser() {
    fetch(`/users/${user.id}`, { method: 'DELETE' }).then((res) => {
      if (res.ok) {
        removeUser(user);
        alert('Successfully deleted user');
        history.push('/login');
        setUser(null);
      } else {
        alert('Something went wrong');
      }
    });
  }

  function handleLogoutClick() {
    fetch('/logout', { method: 'DELETE' }).then((res) => {
      if (res.ok) {
        updateUser(null);
        history.push('/authentication');
      }
    });
  }

  useEffect(() => {
    const fetchUser = () => {
      fetch('/authenticate').then((res) => {
        if (res.ok) {
          res.json().then(setInitialUser);
        } else {
          setUser(null);
        }
      });
    };
    fetchUser();
  }, []);

  const setInitialUser = (userToFetch) => {
    setUser(userToFetch);
  };

  return (
    <>
      <UserContext.Provider value={user}>
        <Navigation handleLogoutClick={handleLogoutClick} />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/users/:id'>
            <Profile
              updateUser={updateUser}
              deleteUser={deleteUser}
            />
          </Route>
          <Route exact path='/characters'>
            <SearchChars
              searchChar={searchChar}
              setSearchChar={setSearchChar}
              onSearch={onSearch}
            />
            <Characters
              setChars={setChars}
              charsToDisplay={charsToDisplay}
              addUserChar={addUserChar}
              removeUserChar={removeUserChar}
              addNotebook={addNotebook}
              removeNotebook={removeNotebook}
            />
          </Route>
          <Route exact path='/login'>
            <Authentication updateUser={updateUser} />
          </Route>
          <Route exact path='/notebooks'>
            <Notebooks notebooksToDisplay={user?.notebooks} removeNotebook={removeNotebook} />
          </Route>
          <Route exact path='/notebooks/:id/clips' component={Clips} />
          <Route exact path='/contact-us' component={ContactUs} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;