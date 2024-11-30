import { useParams,useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";


function TeacherDetail(){
    const navigate=useNavigate();
    let {teacher_id}=useParams()
    const [teacherData,setTeacherData]=useState({});
    useEffect(()=>{
        document.title="Teacher Detail";
        const role=localStorage.getItem("userRole");
        if(!role){
            navigate('/login');
        }else if(role === "teacher"){
            const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
            if(!teacherLoginStatus) navigate('/teacher-login');
            
        }else if(role === "student"){
            const studentLoginStatus = localStorage.getItem("studentLoginStatus");
            if(!studentLoginStatus) navigate('/login')
           
        }
        const fetchTeacherDetails =() =>{
            try {
                axios.get(BASE_URL+'/api/teacher/'+teacher_id)
                .then((res)=>{
                    setTeacherData(res.data);
                }).catch((error)=>{
                    console.log("Error: ",error);
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchTeacherDetails();
    },[teacher_id,navigate])
    console.log(teacherData);
    
    return(
        <>
        
        <div className="container mt-3">
        <div className="row">
            {teacherData.subject_details ? (
                <>
                <div className="col-4">
            <img src={teacherData ? teacherData.image_url:  "/teacher.png"} className="img-thumbnail" alt="teacher    "/> 
            </div>
            <div className="col-8">
                <h3>{`${teacherData.first_name} ${teacherData.last_name}`}</h3>
                <p className="fw-bold">Course: <Link to={`/course-detail/${teacherData.subject_details.id}`}> {teacherData.subject_details.name}</Link></p>
                <p>{teacherData.subject_details.description}</p>
                <p><Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link></p>
            </div>
                </>
            ):(
                <>
                <div className="col-8">
                <h3>Teacher Name</h3>
                <p className="fw-bold">Course: <Link to={'/course-detail/1'}> DSA</Link></p>
                <p>Lorem consequat aute amet tempor cupidatat culpa quis nostrud mollit eu et. Culpa ipsum tempor reprehenderit aliqua mollit officia exercitation aliqua. Sint sit labore occaecat sint magna deserunt. Ex eiusmod reprehenderit excepteur laborum est amet. Lorem adipisicing officia tempor excepteur. Irure qui qui enim excepteur consectetur dolore in consequat dolor consectetur ullamco sint irure amet. Amet in et eiusmod excepteur id cillum labore consectetur esse nisi ea occaecat.</p>
                </div>
                 <div className="col-8">
                <h3>Teacher Name</h3>
                <p className="fw-bold">Course: <Link to={'/course-detail/1'}> DSA</Link></p>
                <p>Lorem consequat aute amet tempor cupidatat culpa quis nostrud mollit eu et. Culpa ipsum tempor reprehenderit aliqua mollit officia exercitation aliqua. Sint sit labore occaecat sint magna deserunt. Ex eiusmod reprehenderit excepteur laborum est amet. Lorem adipisicing officia tempor excepteur. Irure qui qui enim excepteur consectetur dolore in consequat dolor consectetur ullamco sint irure amet. Amet in et eiusmod excepteur id cillum labore consectetur esse nisi ea occaecat.</p>
            </div>
                </>
            )}
            
        </div>
        </div>
        </>
    )
}

export default TeacherDetail