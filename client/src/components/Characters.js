import React, { useState, useEffect } from 'react'
import CharCard from './CharCard'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Button, Container, CardContent } from 'semantic-ui-react'

const Characters = ( {charsToDisplay, chars, setChars, user, addUserChar, removeUserChar} ) => {
    const history = useHistory()
    const { id } = useParams()
    const [main, setMain] = useState([])

    //! Characters
    useEffect(() => {
        fetch('/characters')
            .then((res) => res.json())
            .then(setChars)
            .catch((err) => console.log(err))
        }, [])
    
    //! issue with char here inside of CharCard...
    const mappedChars = charsToDisplay.map((char) => {
        return <CharCard key={char.id} {...char} />
    })

    //! Character by id
    // useEffect(() => {
    //     fetch(`/characters/${id}`).then((res) => {
    //         if (res.ok) {
    //             res.json().then(setChars)
    //         } else {
    //             alert('Character Not Found')
    //         }
    //     })
    // }, [id])

    const handleAddUserChar = () => {
        fetch('/user-characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        }).then((res) => {
            if (res.ok) {
                addUserChar(main)
            } else {
                alert('Something went wrong')
            }
        })
    }

    const handleRemoveUserChar = () => {
        fetch(`/user-characters/${id}`, { method: 'DELETE' }).then((res) => {
            if (res.ok) {
                removeUserChar(main)
            } else {
                alert('Something went wrong')
            }
        })
    }

    const handleBackToProfile = () => {
        history.push('/profile')
    }
    
    return (
    <Container >
        {mappedChars}
    </Container>
    )
}

export default Characters


{/* <Card.Group>
            {charsToDisplay.map((char) => {
                <Card
                    fluid
                    key={char.id}
                    href={'/characters/'}
                    // className=''
                    // style={{}}
                    onClick={(e) => {
                        e.preventDefault()
                        history.push('/characters/')
                    }}
                >
                <Card.Content>
                    <Card.Header>{char.name}</Card.Header>
                    <Card.Description>{char.icon}</Card.Description>
                </Card.Content>
                </Card>
            })}
        </Card.Group> */}