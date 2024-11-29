function TeacherLogout(){
    localStorage.clear();
    
    window.location.href='/teacher-login'
    return(
        <div>
        </div>
    )
}

export default TeacherLogout;