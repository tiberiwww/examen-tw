import React from "react";
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// navbar
function Navigation() {
    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }
    
    return (
        <>
            <Navbar bg="primary" expand="lg" variant="primary">
                <Container>
                    {/* redirect pagina principala */}
                    <Navbar.Brand href="" onClick={(e) => navigateTo(e, "/")} variant="light">Youtube 2</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;