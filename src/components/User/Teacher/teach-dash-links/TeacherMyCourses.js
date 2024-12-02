import { Button,Table } from "react-bootstrap"
import TeacherSideMenu from "../TeacherSideMenu"
import { useEffect,useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function TeacherMyCourses(){
    const [mycourseData,setMyCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');
    useEffect(()=>{
        document.title="My Courses | Teacher";
        const fetchCourses = () =>{
            try {
                axios.get(BASE_URL+'/api/teacher/'+teacherId+'/courses')
                .then((res)=>{
                   setMyCourseData(res.data)
                });
   
           } catch (error) {
               console.log("Error: ",error.message);
           }
        }

        fetchCourses();
        
    },[teacherId])
    const courseId = mycourseData.map(course => course.id);
    return(
        <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <TeacherSideMenu />
        </aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">My Courses</h5>
                <p className="mt-4 text-center">To view the student list, you can click on the total enrolled students</p>
                <div className="card-body">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total Enrolled Students</th>
                                <th className="text-center" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {mycourseData.map((course,index) =>
                            <tr>
                                <td>{course?.name}</td>
                                <td><Link to={`/my-students/${course?.id}` } className="text">{course?.total_students}</Link></td>
                                <td>
                                    <Button size="sm" className="btn"><Link className="text-btn" to={`/course-detail/${course?.id}` }>View</Link></Button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </section>
    </div>
</div>

    )
}

export default TeacherMyCourses