import { useParams,useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function CourseDetail(){
    let {course_id}=useParams()
    const navigate=useNavigate();
    const [enrollStatus,setEnrollStatus]=useState();
    const [courseData,setCourseData]=useState([]);
    const [loading,setLoading] = useState(false);
    
    useEffect(()=>{
        document.title="Course Detail"
        const role=localStorage.getItem("userRole");
        const student_id=localStorage.getItem("studentId");
        if(!role){
            navigate('/login');
        }else if(role === "teacher"){
            const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
            if(!teacherLoginStatus) navigate('/teacher-login');
            
        }else if(role === "student"){
            const studentLoginStatus = localStorage.getItem("studentLoginStatus");
            if(!studentLoginStatus) navigate('/login')
           
        }
        const fetchCourses = async ()=>{
            try{
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/api/course/${course_id}/teacher`)
                setCourseData(response.data)
            }catch(error){
                console.log("Error: ",error);
            }finally{
                setLoading(false);
            }
        }

        try{
             axios.get(BASE_URL+'/api/fetch-status/'+student_id+'/'+course_id)
             .then((res)=>{
                if(res.data.bool === true){
                    setEnrollStatus('success');
                }
                
             }).catch((err)=>{
                console.log(err);
             })
        }catch(error){
            console.log(error);
            setEnrollStatus('error');
        }

        fetchCourses();
        
    },[course_id,navigate])
    const enrollCourse = async () => {
        const student_id = localStorage.getItem("studentId");
        const subject_id = courseData[0]?.subject_details?.id;
        if (!student_id || !subject_id) {
            console.error("Missing required data: student_id or subject_id");
            return;
        }
    
        try {
            const response = await axios.post(`${BASE_URL}/api/student-enroll-course/${student_id}/${subject_id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
                
            });
            window.location.href='/'
        } catch (error) {
            console.error("Error during enrollment:", error.response?.data || error);
        }
    };


    if(loading){
        return(
            <div className="loading-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    if(!courseData){
        return(
            <div>Error: Course not found</div>
        )
    }

    return(
        <>
        
        <div className="container mt-3">
        <div className="row">
            <div className="col-4">
            <img src={ courseData[0]?.subject_details?.image_url || "/graph.png"} className="img-thumbnail" alt={courseData[0]?.subject_details?.name || "graph theory"}/> 
            </div>
           {
            courseData && courseData.length > 0 ? (
                <>
                <div className="col-8">
                <h3>{`${courseData[0]?.subject_details?.name}` || "Course Name"}</h3>
                <p className="fw-bold">Taught by: <Link to={`/teacher-detail/${courseData[0]?.id}` || '/teacher-detail/1'}>{`${courseData[0]?.first_name} ${courseData[0]?.last_name}` || "Teacher Name"}</Link></p>
                <p>{courseData[0]?.subject_details?.description}</p>
                <p className="fw-bold">Total enrolled students : {courseData[0]?.subject_details?.total_students} </p>
                {localStorage.getItem("userRole") === "teacher" ? (
                    <p><Link to="/teacher-dashboard" className="btn btn-primary">Back to Dashboard</Link></p>
                ):localStorage.getItem("userRole") === "student"  ?(
                    enrollStatus === "success" ? (
                        <>
                        <p className="text-success">You have already enrolled in this course.</p>
                        <p><Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link></p>
                        </>
                    ) : (
                        <p><Button onClick={enrollCourse} type="button" className="btn btn-success">Enroll in this course</Button></p>
                    )
                    
                ):null}
            </div>
                </>
            ):(
                <div className="col-8">
                <h3>Course Title</h3>
                <p className="fw-bold">Taught by:<Link to={'/teacher-detail/1'}> Shanmugam</Link></p>
                <p>Lorem consequat aute amet tempor cupidatat culpa quis nostrud mollit eu et. Culpa ipsum tempor reprehenderit aliqua mollit officia exercitation aliqua. Sint sit labore occaecat sint magna deserunt. Ex eiusmod reprehenderit excepteur laborum est amet. Lorem adipisicing officia tempor excepteur. Irure qui qui enim excepteur consectetur dolore in consequat dolor consectetur ullamco sint irure amet. Amet in et eiusmod excepteur id cillum labore consectetur esse nisi ea occaecat.</p>
            </div>
            )
           }        
            
        </div>
        </div>
        </>
    )
}

export default CourseDetail