import { useParams,useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import swal from 'sweetalert';

const base_url = 'http://127.0.0.1:8000/api'
function CourseDetail(){
    let {course_id}=useParams()
    const navigate=useNavigate();
    const [enrollStatus,setEnrollStatus]=useState();
    const [courseData,setCourseData]=useState([]);
    //const [teacherData,setTeacherData]=useState({});
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
                const response = await axios.get(`${base_url}/course/${course_id}/teacher`)
                setCourseData(response.data)
            }catch(error){
                console.log("Error: ",error);
            }finally{
                setLoading(false);
            }
        }

        try{
             axios.get(base_url+'/fetch-status/'+student_id+'/'+course_id)
             .then((res)=>{
                if(res.data.bool === true){
                    console.log("Enroll status: ",res.data);
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
    console.log(enrollStatus);
    const enrollCourse = async () => {
        const student_id = localStorage.getItem("studentId");
        const subject_id = courseData[0]?.subject_details?.id;
        console.log(student_id);
        console.log(subject_id);
        if (!student_id || !subject_id) {
            console.error("Missing required data: student_id or subject_id");
            return;
        }
    
        try {
            const response = await axios.post(`${base_url}/student-enroll-course/${student_id}/${subject_id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
                
            });
            window.location.href='/'
            console.log("Enrollment successful:", response.data);
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
    console.log(courseData);

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
                {/* <p><Link to='/' className="btn btn-success">Enroll in this course</Link></p> */}
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