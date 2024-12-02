const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function TeacherLogout(){
    localStorage.clear();
    
    window.location.href=`${BASE_URL}/teacher-login`
    return(
        <div>
        </div>
    )
}

export default TeacherLogout;