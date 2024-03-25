import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ onGirlCodedClick }) => {
    const [expanded, setExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

    const handleNavItemClick = () => {
        setExpanded(false); // Collapse the navbar when an item is clicked
    };

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 992);
    };

    useEffect(() => {
        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Navbar bg={isSmallScreen ? "white" : "transparent"} expand="lg" className={`custom-navbar ${isSmallScreen ? "small-screen" : ""}`} expanded={expanded}>
            <Link to="/" className="navbar-brand" onClick={() => { onGirlCodedClick(); handleNavItemClick(); }}>GIRL CODED</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded => !expanded)} />
            <Button as={Link} to="/login" variant="primary" className="sign-in-button">Login</Button>
            <Navbar.Collapse id="basic-navbar-nav" className="centered-collapse">
                <Nav className="mx-auto">
                    <Link to="/home" className="nav-link" onClick={handleNavItemClick}>HOME</Link>
                    <Link to="/our-story" className="nav-link" onClick={handleNavItemClick}>OUR STORY</Link>
                    <Link to="/frequently-asked-questions" className="nav-link" onClick={handleNavItemClick}>FAQ</Link>
                    <Link to="/meet-the-team" className="nav-link" onClick={handleNavItemClick}>MEET THE TEAM</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;