import './Classes.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const BASE_URL = "http://127.0.0.1:8000/api";
function Classes() {
    const [courses,setCourses]=useState([]);
 
        useEffect(()=>{
            document.title="All Courses";
            try {
    
                axios.get(BASE_URL+'/course/?result=4').then((response)=>{
                    setCourses(response.data)
                }).catch((error)=> console.log("Error: ",error));
            } catch (error) {
                console.log("Error: ",error);
            }
            
        },[]);
    
    console.log(courses)

    const CourseCard = React.memo(({ course }) => {
        return(
            <div className="col-md-3">
            <div className="card text-bg-dark">
                <Link to={`/course-detail/${course.id}`}>
                    <img src={course.image_url} className="card-img-top" alt={course.name} />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">
                        {course.name}
                    </h5>
                    <Link to={`/course-detail/${course.id}`} className="btn btn-primary">Access Course</Link>
                </div>
            </div>
        </div>
        );
        
    });


    return(
    <div className="container mt-4">
    <div className="row mt-4">
        {courses && courses.map((course,index) =>
        <CourseCard key={course.id} course={course}/>
        )}
    </div>
    <br></br>

    

</div>
    )
}

export default Classes