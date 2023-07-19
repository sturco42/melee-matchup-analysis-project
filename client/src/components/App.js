import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory, useParams } from 'react-router-dom'
import Navigation from './Navigation'
import Profile from './Profile'
import Authentication from './Authentication'
import Home from './Home'
import SearchChars from './SearchChars'
import Characters from './Characters'
import ContactUs from './ContactUs'
import Notebooks from './Notebooks'
import { UserContext } from './UserContext'

function App() {
  //! make user useContext ?
  const [user, setUser] = useState(null)
  const [chars, setChars] = useState([])
  const [searchChar, setSearchChar] = useState('')
  const history = useHistory()
  // const { id } = useParams()
  // const { userCharId } = useParams()
  // const [userChar, setUserChar] = useState([])
  const [notebooks, setNotebooks] = useState([])

  // const notebooksToDisplay = notebooks.filter((notebook) => {

  // return (console.log(user?.username))
  // if (notebook.user?.username === user?.username) {
  //   return (console.log('hello'))
  // } else {
  //   return (null)
  // }

  // return (notebook.user_id === user?.id)
  // })

  // this should just be a function that's called inside the useeffect we declare below
  //! CHARACTERS START
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

  //! USERS START
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

  const updateNotebooks = () => {
    // fetchUserNotebooks(user);
  }

  const setInitialUser = (userToFetch) => {
    // fetchUserNotebooks(userToFetch);
    setUser(userToFetch);
  };

  // const fetchUserNotebooks = (userToFetch) => {
  //   //console.log('we are about to fetch our note book and heres the user id')
  //   //console.log(userToFetch.id)

  //   fetch(`/notebooks/${userToFetch.id}`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((serializedNotebook) => {
  //       setNotebooks(serializedNotebook)
  //     })
  //     .catch((err) => console.log(err));
  // };

  //! NOTEBOOKS INFO START
  // useEffect(() => {
  //   console.log('our user')
  //   console.log(user)
  //   fetch(`/notebooks/${user.id}`)
  //     .then((res) => {
  //       console.log('we got our notebook back');
  //        console.log(res);
  //         return res.json()})
  //     .then(setNotebooks)
  //     .catch((err) => console.log(err))
  // }, [])

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
          <Route exact path='/contact-us' component={ContactUs} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;