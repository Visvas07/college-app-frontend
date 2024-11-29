import { Card,ListGroup,ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom";
function SideMenu(){
    return(
        <Card style={{width: '20rem'}}>
                
            <ListGroup variant="flush">
                <ListGroupItem><Link to='/dashboard' className="text">Dashboard</Link></ListGroupItem>
                <ListGroupItem><Link to='/my-courses' className="text">My Courses</Link></ListGroupItem>
                <ListGroupItem><Link to='/my-teachers' className="text">My Teachers</Link></ListGroupItem>
                <ListGroupItem><Link to='/profile-settings' className="text">Profile Settings</Link></ListGroupItem>
                <ListGroupItem><Link to='/change-password' className="text">Change Password</Link></ListGroupItem>
                <ListGroupItem><Link to='/logout' className="logout-text">Logout</Link></ListGroupItem>
            </ListGroup>
            </Card>
    )
}

export default SideMenu;