import SideMenu from "../SideMenu"
import { Button,Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function MyTeachers(){
    const [teacherData,setTeacherData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    useEffect(()=>{
        document.title="My Teachers | Student"
        const fetchTeachers = () =>{
            try{
                axios.get(BASE_URL+'/api/fetch-enrolled-courses/'+studentId)
                .then((res)=>{
                    setTeacherData(res.data);
                }).catch((err)=>{
                    console.log(err);
                })
            }catch(err){
                console.log(err);
            }
        }
        fetchTeachers();
    },[studentId])
    return(
        <div className="container">
            <div className="row">
            <aside className="col-md-3">
                <SideMenu/>
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h5 className="card-header">My Teachers</h5>
                    <div className="card-body">
                        <Table striped bordered>
                            <thead>
                                <tr><th>Name</th>
                                <th>Subject</th>
                                <th className="text-center">Action</th></tr>
                            </thead>
                            <tbody>
                            {teacherData.map((row,index)=>(
                            <tr key={index}>
                                <td>{row.teacher_details.first_name} {row.teacher_details.last_name}</td>
                                <td><Link to={`/course-detail/${row.subject.id}`}>{row.subject.name}</Link></td>
                                <td><Button to={`/teacher-detail/${row.teacher_details.id}`}>View</Button></td>
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

export default MyTeachers