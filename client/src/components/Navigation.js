import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

const Navigation = ({ user, handleLogoutClick }) => {
    const location = useLocation();

    useEffect(() => {
    }, [location]);

    return (
        <Container>
            <Menu>
                <Menu.Menu>
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
                    <Menu.Item 
                        as={NavLink}
                        to='/'
                        name='Home'
                        exact
                        active={location.pathname === '/'}
                    />
                    <Menu.Item 
                        as={NavLink}
                        to='/contact-us'
                        name='Contact Us'
                        exact
                        active={location.pathname === '/'}
                    />
                    {user ? (
                        <Menu.Item
                            as={NavLink}
                            to='/notebooks'
                            name='Notebooks'
                            exact
                            active={location.pathname === '/notebooks'}
                        />
                    ) : null}
                </Menu.Menu>
            </Menu>
        </Container>
    )
}

export default Navigation