import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () =>{
    return(
        <>
            <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand to="/"><strong>To Do List App</strong></Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                        <Nav.Link as={Link} to="/user" className="nav-link">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;