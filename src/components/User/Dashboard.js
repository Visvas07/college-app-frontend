import SideMenu from './SideMenu';
import { useEffect,useState } from 'react'
import './User.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

const base_url='http://127.0.0.1:8000/api'

function TeacherDashboard(){
    const [dashboardData,setDashboardData]=useState()
    const studentId=localStorage.getItem('studentId');
    useEffect(()=>{
        document.title="Student Dashboard"
        const fetchDashboardData = () =>{
            try {
                axios.get(base_url+'/student-dashboard/'+studentId)
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
    },[studentId])
    return(
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3">
                <SideMenu/>
            </aside>
            <section className="col-md-9">
            <div className='row'>
            <div className='col-md-4'>
                
                <div className='card border-primary'>
                    <h5 className='card-header bg-primary text-white'>Total Courses</h5>
                    <div className='card-body'>
                        <h3><Link to={'/my-courses'}>{dashboardData?.total_courses}</Link></h3>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='card border-primary'>
                    <h5 className='card-header bg-primary text-white'>Total Teachers</h5>
                    <div className='card-body'>
                        <h3><Link to={'/my-teachers/'}>{dashboardData?.total_teachers}</Link></h3>
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