import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link

const NavBar = ({ onGirlCodedClick }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Link to="/" className="navbar-brand" onClick={onGirlCodedClick}>GIRL CODED</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {/* Use Link instead of Nav.Link for SPA navigation */}
                    <Link to="/our-story" className="nav-link">Our Story</Link>
                    <Link to="/frequently-asked-questions" className="nav-link">FAQ</Link>
                    <Link to="/meet-the-team" className="nav-link">Meet the Team</Link>
                    <Button variant="primary">Sign In</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
