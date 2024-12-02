import TeacherSideMenu from './TeacherSideMenu'
import { useEffect,useState } from 'react'
import './Teacher.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";

function TeacherDashboard(){
    const [dashboardData,setDashboardData]=useState()
    const teacherId=localStorage.getItem('teacherId');
    useEffect(()=>{
        document.title="Teacher Dashboard"
        const fetchDashboardData = () =>{
            try {
                axios.get(BASE_URL+'/api/teacher-dashboard/'+teacherId)
                .then((res)=>{
                    console.log(res);
                    setDashboardData(res.data);
                }).catch((err)=>{
                    console.log("Errors: ",err);
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchDashboardData();
    },[teacherId])
    return(
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3">
                <TeacherSideMenu/>
            </aside>
            <section className="col-md-9">
            <div className='row'>
            <div className='col-md-4'>
                
                <div className='card border-primary'>
                    <h5 className='card-header bg-primary text-white'>Total Courses</h5>
                    <div className='card-body'>
                        <h3><Link to={'/teacher-my-courses'}>{dashboardData?.total_courses}</Link></h3>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='card border-primary'>
                    <h5 className='card-header bg-primary text-white'>Total Enrolled Students</h5>
                    <div className='card-body'>
                        <h3><Link to={'/my-students/'+teacherId}>{dashboardData?.total_students}</Link></h3>
                    </div>
                </div>
            </div>
            </div>
            
            
            
            </section>
            </div>
        </div>
    )
}
export default TeacherDashboard