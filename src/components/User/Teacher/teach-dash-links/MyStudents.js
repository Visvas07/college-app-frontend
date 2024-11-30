import { Button,Table } from "react-bootstrap"
import TeacherSideMenu from "../TeacherSideMenu"
import { useEffect,useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function MyStudents(){
    const [myStudentData,setMyStudentData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');
    let { course_id } = useParams()
    useEffect(()=>{
        document.title="My Students | Teacher";
        const fetchStudents = () =>{
            
            try {
                axios.get(BASE_URL+'/api/fetch-all-enrolled-students/'+course_id)
                .then((res)=>{
                   setMyStudentData(res.data)
                });
   
           } catch (error) {
               console.log("Error: ",error.message);
           }
        }

        fetchStudents()
        
    },[teacherId,course_id])
    return(
        <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <TeacherSideMenu />
        </aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">Enrolled Students</h5>
                <div className="card-body">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                           {myStudentData.map((row,index) =>
                            <tr>
                                <td>{row.student.first_name} {row.student.last_name}</td>
                                <td>{row.student.email}</td>
                                <td>{row.student.username}</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button size="sm" className="btn"><Link className="text-btn" to={`/teacher-my-courses` }>Back to My Courses</Link></Button>
                </div>
            </div>
        </section>
    </div>
</div>

    )
}

export default MyStudents