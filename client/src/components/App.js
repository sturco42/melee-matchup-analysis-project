import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation'
import Account from './Account'

function App() {
  // Code goes here!
  return (
    <>
      <div>
        Hello World
      </div>
      <Account />
      <Navigation />
    </>
  )
}

export default App;