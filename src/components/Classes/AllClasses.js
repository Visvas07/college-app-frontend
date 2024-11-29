import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import React from "react";

const BASE_URL = "http://127.0.0.1:8000/api";
function AllClasses(){
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        document.title="All Courses";
        try {
            axios.get(BASE_URL+'/course/').then((response)=>{
                setCourses(response.data)
            })
        } catch (error) {
            console.log("Error: ",error);
        }
        
    },[]);
    //console.log(teachers); 
    console.log(courses)

    const CourseCards =React.memo(({course})=>{
        return(
            <div className="col-md-3 mb-4">
        <div className="card text-bg-dark">
            <Link to={`/course-detail/${course.id}`}><img src={course.image_url} className="card-img-top" alt={course.name} /></Link>
            <div className="card-body">
                <h5 className="card-title">{course.name}</h5>

                <Link to={`/course-detail/${course.id}`} className="btn btn-primary">Access Course</Link>
            </div>
        </div>
    </div>
        );
    });

    return(
        <div className="container mt-4">
            <h3 className="text-center">All Classes</h3>
            <div className="row mb-4">
                {courses && courses.map((course,index)=>
            <CourseCards key={course.id} course={course}/>
        )}

        </div>
        </div>
    )
}
export default AllClasses