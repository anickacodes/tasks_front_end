import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    <Nav.Link as={Link} to="/">Task Manager</Nav.Link>
                </Navbar.Brand>
                <Nav className='ms-auto'>
                    <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;