import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const getPageTitle = () => {
        const path = location.pathname.replace('/', '');
        if (path === '') return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    }

    return (
        <Navbar bg="light" expand="lg" className="px-4">
            <Navbar.Brand>{getPageTitle()}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <NavDropdown title="Profile" id="basic-nav-dropdown" align="end">
                        <NavDropdown.Item onClick={() => navigate('/profile')}>
                            My Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
