import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ onGirlCodedClick }) => {
    const [expanded, setExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);
    const [scrolledDown, setScrolledDown] = useState(false);

    const handleNavItemClick = () => {
        setExpanded(false); // Collapse the navbar when an item is clicked
    };

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 592);
    };

    const handleScroll = () => {
        const position = window.scrollY;
        setScrolledDown(position > 30); // Set to blue if scrolled more than 50px
    };

    useEffect(() => {
        // Add event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        // Call handlers right away so state gets updated with initial size and position
        handleResize();
        handleScroll();

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar style={{ backgroundColor: scrolledDown ? 'white' : (isSmallScreen ? 'white' : 'transparent') }} expand="lg" className={`fronted-navbar ${isSmallScreen ? "small-screen" : ""}`} expanded={expanded}>
            <Link to="/" className="navbar-brand" onClick={() => { onGirlCodedClick(); handleNavItemClick(); }}>GIRL C0DED</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded => !expanded)} />
            <Button as={Link} to="/login" variant="primary" className="navbar-login-button">Login</Button>
            <Navbar.Collapse id="basic-navbar-nav" className="centered-collapse">
                <Nav>
                    <Link to="/our-story" className="nav-link" onClick={handleNavItemClick}>OUR STORY</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
    
};

export default NavBar;
