function Logout(){
    localStorage.clear();
    window.location.href=`${BASE_URL}/teacher-login`
    return <div></div>
}

export default Logout