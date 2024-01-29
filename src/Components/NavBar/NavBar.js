import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ onGirlCodedClick }) => {
    const [expanded, setExpanded] = useState(false);

    const handleNavItemClick = () => {
        setExpanded(false); // Collapse the navbar when an item is clicked
    };

    return (
        <Navbar bg="light" expand="lg" className="custom-navbar" expanded={expanded}>
            <Link to="/" className="navbar-brand" onClick={() => { onGirlCodedClick(); handleNavItemClick(); }}>GIRL CODED</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded => !expanded)} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Link to="/our-story" className="nav-link" onClick={handleNavItemClick}>Our Story</Link>
                    <Link to="/frequently-asked-questions" className="nav-link" onClick={handleNavItemClick}>FAQ</Link>
                    <Link to="/meet-the-team" className="nav-link" onClick={handleNavItemClick}>Meet The Team</Link>
                </Nav>
                <Button variant="primary" className="ml-auto" onClick={handleNavItemClick}>Sign In</Button>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
