import React, { useState } from 'react'
import { Button, Message, Card } from 'semantic-ui-react'
import UpdateUserForm from './UpdateUserForm'

const Profile = ( {user, updateUser, deleteUser} ) => {
    const [showForm, setShowForm] = useState(true)

    const toggleForm = () => {
        setShowForm((current) => !current)
    }

    return (
        <div>
            <div>
                Username: {user.username}</div>
            <div>
                <Button onClick={toggleForm}>Edit Profile</Button>
                {showForm ? null :
                <UpdateUserForm user={user} updateUser={updateUser} toggleForm={toggleForm} />
                }
                <Button onClick={deleteUser}>Delete Account</Button>
            </div>
            <div>
                Main(s):
                 {
                    user?.user_characters.map((user_char) => {
                        return(
                        <div>
                            {user_char?.character?.name}
                        </div>
                        )
                    })
                }
            </div>
        </div>
        
    )
}

export default Profile