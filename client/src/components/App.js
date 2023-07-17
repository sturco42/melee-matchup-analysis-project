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

  //! NOTEBOOKS INFO START
  useEffect(() => {
    fetch('/notebooks')
      .then((res) => res.json())
      .then(setNotebooks)
      .catch((err) => console.log(err))
  }, [])

  const notebooksToDisplay = notebooks.filter((notebook) => (
    notebook.user_id === user?.id
  ))

  //! CHARACTERS START
  useEffect(() => {
    fetch('/characters')
      .then((res) => res.json())
      .then(setChars)
      .catch((err) => console.log(err))
  }, [])

  const charsToDisplay = chars.filter((char) => (
    char.name.toLowerCase().includes(searchChar.toLowerCase())
  ))

  const onSearch = (input) => {
    setSearchChar(input)
  }

  const addUserChar = (char) => {
    // character should look like
    // {
    //   character: {name: 'something'},
    //   id: 999,
    //   user_id: 666
    // }
    
    setUser((currentUser) => ({
      ...currentUser,
      user_characters: [
        ...currentUser.user_characters,
        char,
      ],
    }))
  }

  const removeUserChar = (id) => {
    setUser((currentUser) => ({
      ...currentUser,
      user_characters: currentUser.user_characters.filter(
        (userChar) => userChar.id !== id
      )
    }))
  }

  //! USERS START
  const updateUser = (user) => {
    setUser(user);
  }

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
          alert('Successfully deleted user')
          history.push('/login')
          setUser(null)
        } else {
          alert('Something went wrong')
        }
      })
  }

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
      <Navigation handleLogoutClick={handleLogoutClick} user={user} />
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/users/:id' >
          <Profile
            user={user}
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
          <Characters user={user} setChars={setChars} charsToDisplay={charsToDisplay} addUserChar={addUserChar} removeUserChar={removeUserChar} />
        </Route>
        <Route exact path='/login'>
          <Authentication user={user} updateUser={updateUser}/>
        </Route>
        <Route exact path='/notebooks'>
          <Notebooks notebooksToDisplay={notebooksToDisplay} user={user} />
        </Route>
        <Route exact path='/contact-us' component={ContactUs} />
      </Switch>
    </>
  )
}

export default App;