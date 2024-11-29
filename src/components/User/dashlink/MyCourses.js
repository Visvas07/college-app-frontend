import { Button,Table } from "react-bootstrap"
import { Link,useParams } from "react-router-dom"
import SideMenu from "../SideMenu"
import { useEffect,useState } from "react"
import axios from "axios"
const base_url='http://127.0.0.1:8000/api'
function MyCourses(){
    const [courseData,setCourseData]=useState([]);
    const studentId = localStorage.getItem('studentId');
    useEffect(()=>{
        document.title="My Courses | Student";
        const fetchStudents = () =>{
            
            try {
                axios.get(base_url+'/fetch-enrolled-courses/'+studentId)
                .then((res)=>{
                   setCourseData(res.data)
                });
   
           } catch (error) {
               console.log("Error: ",error.message);
           }
        }

        fetchStudents()
        
    },[studentId])
    console.log(courseData);
    return(
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3">
                <SideMenu/>
            </aside>
            <section className="col-md-9">
        <div className="card">
                <h5 className="card-header">My Courses</h5>
                <div className="card-body">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Course Link</th>
                                <th>Teacher Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((row,index)=>(
                            <tr key={index}>
                                <td>{row.subject.name}</td>
                                <td><Link to={`/course-detail/${row.subject.id}`}>Course Link</Link></td>
                                <td><Link to={`/teacher-detail/${row.teacher_details.id}`}>{row.teacher_details.first_name} {row.teacher_details.last_name}</Link></td>
                            </tr>
                           )) }
                        </tbody>
                    </Table>
                    <Button size="sm" className="btn"><Link className="text-btn" to={`/dashboard` }>Back to My Dashboard</Link></Button>
                </div>
            </div>
            </section>
            </div>
            </div>
    )
}

export default MyCourses