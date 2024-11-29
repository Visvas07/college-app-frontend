function Logout(){
    localStorage.clear();
    window.location.href='/login'
    return <div></div>
}

export default Logout