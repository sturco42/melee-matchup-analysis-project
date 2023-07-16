import React from 'react'
import { Input } from 'semantic-ui-react'

const SearchChars = ( {searchChar, onSearch} ) => {
  
  const handleChange = (e) => {
      onSearch(e.target.value)
  }

  return(
      <div id="search-container">
          <Input
          value={searchChar}
          type='text'
          id='search'
          placeholder='Search for a character!'
          onChange={handleChange}
          />
      </div>
  )
}

export default SearchChars