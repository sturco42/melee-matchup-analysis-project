import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

const Navigation = ({ user, handleLogoutClick }) => {

    const location = useLocation();
    const [active, setActive] = useState('')

    useEffect(() => {
        setActive(location.pathname.slice(1))
    }, [location]);

    const handleClick = (e, { name }) => {
        setActive(name);
    }

    return (
        <Container>
            <Menu>
                <Menu.Menu>
                    <Menu.Item 
                        as={NavLink}
                        to='/'
                        name='Home'
                        active={active === 'home'}
                        onClick={handleClick}
                    />
                    {!user ? (
                        <Menu.Item
                        as={NavLink}
                        exact
                        to='/notebooks'
                        name='Your Notebooks'
                        active={active === 'notebooks'}
                        onClick={handleClick}
                        />
                    ) : null}
                    {!user ? (
                        <Menu.Item
                        as={NavLink}
                        exact
                        to='/login'
                        name='Login'
                        active={active === 'login'}
                        onClick={handleClick}
                        />
                    ) : (
                        <Menu.Item
                        as={NavLink}
                        exact
                        to='/logout'
                        name='Logout'
                        active={active === 'logout'}
                        onClick={handleLogoutClick}
                        />
                    )}
                </Menu.Menu>
            </Menu>
        </Container>
    )
}

export default Navigation