import React, { useState } from 'react'
import CharCard from './CharCard'
// import { useHistory, useParams } from 'react-router-dom'
// import { Card, Button, Container, CardContent } from 'semantic-ui-react'

const Characters = ( {charsToDisplay, user, addUserChar, removeUserChar, addNotebook, removeNotebook} ) => {
    
    const mappedChars = charsToDisplay.map((char) => {
        return (
            <CharCard
                key={char.id}
                addNotebook={addNotebook}
                removeNotebook={removeNotebook}
                {...char}
                addUserChar={addUserChar}
                removeUserChar={removeUserChar}
                user={user}
            />
        )
    })

    return (
        <div>
            {mappedChars}
        </div>
    )
}

export default Characters