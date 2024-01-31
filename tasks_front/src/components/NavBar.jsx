import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const NavBar = ({ user, setUser, setToken }) => {
    const handleLogout = () => {
        setUser(null)
        setToken(null)
    }

  return (
    <Navbar className="flex-sm-column"> 
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
          <img src="./src/assets/taskmanager.png" alt="b&w shadow with check" width="77" height="81" className="d-inline-block align-text-top"/>
            {/* Task Manager */}
          </Nav.Link>
        </Navbar.Brand>
        {!user ? (
          <Nav className="flex-sm-column">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign up
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="flex-sm-column">
            <Nav.Link as={Link} to="/tasks">
              {user.username}
            </Nav.Link>
            <Button
              variant="danger"
              onClick={handleLogout}
              size="sm"
              style={{ color: "black" }}
            >
              Log Out
            </Button>
          </Nav>
        )}
 
      </Container>
    </Navbar>
  );
};

export default NavBar;
