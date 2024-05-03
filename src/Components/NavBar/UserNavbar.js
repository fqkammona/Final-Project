import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './UserNavbar.css';
import { useAuth } from '../../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserNavbar = ({}) => {
    const { logout } = useAuth();
    const navigate = useNavigate(); // Use useNavigate for redirection
    const [expanded, setExpanded] = useState(false);
    const [isSmallScreen] = useState(window.innerWidth < 992);

    const handleLogout = async () => {
        try {
            await logout(); // Perform the logout
            navigate('/'); // Navigate to the home page after successful logout
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleNavItemClick = () => {
        setExpanded(false); // Collapse the navbar when an item is clicked
    };

    return (
        <Navbar bg={isSmallScreen ? "transparent" : "transparent"} expand="lg" className={`custom-navbar ${isSmallScreen ? "small-screen" : ""}`} expanded={expanded}>
            <Link to="/live-feed" className="navbar-brand" onClick={handleNavItemClick}>LIVE FEED</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded => !expanded)} />
            <Button variant="primary" className="log-out-button" onClick={handleLogout}>LOG OFF</Button>
            <Navbar.Collapse id="basic-navbar-nav" className="centered-collapse">
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/dashboard" onClick={handleNavItemClick}>DASHBOARD</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default UserNavbar;