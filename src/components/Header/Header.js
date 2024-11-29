import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Header.css';

const Header = () => {
    const [teacherLoginStatus, setTeacherLoginStatus] = useState('false');
    const [studentLoginStatus, setStudentLoginStatus] = useState('false');
    const navigate = useNavigate();

    // Check login statuses for teacher and student on mount
    useEffect(() => {
        const teacherStatus = localStorage.getItem('teacherLoginStatus');
        setTeacherLoginStatus(teacherStatus === 'true' ? 'true' : 'false');

        const studentStatus = localStorage.getItem('studentLoginStatus');
        setStudentLoginStatus(studentStatus === 'true' ? 'true' : 'false');
    }, []);

    
    const teacherHandleLogOut = () => {
        localStorage.removeItem('teacherLoginStatus');
        localStorage.clear();
        setTeacherLoginStatus('false');
        navigate('/teacher-login');
    };

    
    const studentHandleLogOut = () => {
        localStorage.removeItem('studentLoginStatus');
        localStorage.clear();
        setStudentLoginStatus('false');
        navigate('/login');
    };

    return (
        <>
            <Navbar className="navbar navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand as={Link} to="/home"><strong>CSE Institute</strong></Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/all-classes" className="nav-link">Classes</Nav.Link>

                        {/* Teacher Dropdown */}
                        <NavDropdown title="Teacher" id="teacher-dropdown" className="nav-dropdown">
                            {teacherLoginStatus !== 'true' && (
                                <>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to="/teacher-login" className="nav-dropdown-link">Login</Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to="/teacher-register" className="nav-dropdown-link">Register</Nav.Link>
                                    </NavDropdown.Item>
                                </>
                            )}
                            {teacherLoginStatus === 'true' && (
                                <>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to="/teacher-dashboard" className="nav-dropdown-link">Dashboard</Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link
                                            as="button"
                                            to='/teacher-logout'
                                            className="nav-dropdown-link"
                                            onClick={teacherHandleLogOut}
                                            style={{ border: 'none', background: 'transparent', color: 'inherit' }}
                                        >
                                            Log out
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>

                        
                        <NavDropdown title="Student" id="student-dropdown" className="nav-dropdown">
                            {studentLoginStatus !== 'true' && (
                                <>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to="/login" className="nav-dropdown-link">Login</Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to="/register" className="nav-dropdown-link">Register</Nav.Link>
                                    </NavDropdown.Item>
                                </>
                            )}
                            {studentLoginStatus === 'true' && (
                                <>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to="/dashboard" className="nav-dropdown-link">Dashboard</Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link
                                            as="button"
                                            to='/logout'
                                            className="nav-dropdown-link"
                                            onClick={studentHandleLogOut}
                                            style={{ border: 'none', background: 'transparent', color: 'inherit' }}
                                        >
                                            Log out
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
