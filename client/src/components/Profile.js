import React, { useState } from 'react'
import { Button, Message, Card } from 'semantic-ui-react'
import UpdateUserForm from './UpdateUserForm'

const Profile = ( {user, updateUser, deleteUser} ) => {
    const [showForm, setShowForm] = useState(false)

    const toggleForm = () => {
        setShowForm((current) => !current)
    }

    return (
        <div>
            Welcome to your profile, {user.username}!
            <Button onClick={toggleForm}>Edit</Button>
            {showForm ? null :
            <UpdateUserForm user={user} updateUser={updateUser}/>
            }
            <Button onClick={deleteUser}>Delete Account</Button>
        </div>
    )
}

export default Profile