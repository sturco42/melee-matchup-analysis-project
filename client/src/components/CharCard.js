import React from 'react'
import { Link } from 'react-router-dom'

const CharCard = ( {id, name, icon} ) => {
    return (
        <div>
            {/* will change name to icon when that logic and info is added in backend */}
            {/* <Link to={`/characters/${id}`}>{name}</Link> */}
            Character Name: {name}
        </div>
    )
}

export default CharCard