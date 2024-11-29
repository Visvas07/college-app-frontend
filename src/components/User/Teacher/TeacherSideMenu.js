import { Card,ListGroup,ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom";
function TeacherSideMenu(){
    return(
        <Card style={{width: '20rem'}}>
                
            <ListGroup variant="flush">
                <ListGroupItem><Link to='/teacher-dashboard' className="text">Dashboard</Link></ListGroupItem>
                <ListGroupItem><Link to='/teacher-my-courses' className="text">My Courses</Link></ListGroupItem>
                <ListGroupItem><Link to='/teacher-profile-settings' className="text">Profile Settings</Link></ListGroupItem>
                <ListGroupItem><Link to='/teacher-change-password' className="text">Change Password</Link></ListGroupItem>
                <ListGroupItem><Link to='/teacher-logout' className="logout-text">Logout</Link></ListGroupItem>
            </ListGroup>
            </Card>
    )
}

export default TeacherSideMenu;