import React, { useEffect, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'
import { UserContext } from './UserContext'

const Navigation = ({ handleLogoutClick }) => {
    const location = useLocation();
    const user = useContext(UserContext)
    useEffect(() => {
    }, [location]);

    const activeUserId = (pathname) => {
        const parts = pathname.split('/')
        if (parts.length === 3 && parts[1] === 'notebooks') {
            return parseInt(parts[2])
        }
        return null
    }
    
    return (
        <Container>
            <Menu>
                <Menu.Menu>
                    <Menu.Item 
                        as={NavLink}
                        to='/'
                        name='Home'
                        exact
                        active={location.pathname === '/'}
                    />
                    {!user ? (
                        <Menu.Item
                            as={NavLink}
                            to='/login'
                            name='Login'
                            exact
                            active={location.pathname === '/login'}
                        />
                    ) : (
                        <Menu.Item
                            as={NavLink}
                            to='/logout'
                            name='Logout'
                            exact
                            onClick={handleLogoutClick}
                            active={location.pathname === '/logout'}
                        />
                    )}
                    {user ? (
                        <Menu.Item
                            as={NavLink}
                            to={`/users/${user.id}`}
                            name='Profile'
                            exact
                            active={activeUserId === user.id}
                        />
                    ) : null}
                    {user ? (
                        <Menu.Item
                            as={NavLink}
                            to='/notebooks'
                            name='Notebooks'
                            exact
                            active={location.pathname === '/notebooks'}
                        />
                    ) : null}
                    {user ? (
                        <Menu.Item
                            as={NavLink}
                            to={'/characters/'}
                            name='Characters'
                            exact
                            active={location.pathname === '/characters'}
                        />
                    ) : null}
                    <Menu.Item 
                        as={NavLink}
                        to='/contact-us'
                        name='Contact Us'
                        exact
                        active={location.pathname === '/contact-us'}
                    />
                </Menu.Menu>
            </Menu>
        </Container>
    )
}

export default Navigation