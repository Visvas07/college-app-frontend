import { Button, Col, Form, Row } from "react-bootstrap";
import TeacherSideMenu from "../TeacherSideMenu";
import { useEffect,useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function AddCourse(){
    
    useEffect(()=>{
        document.title="Add Course";
    })
    const [isLoading,setIsLoading]=useState(false)

    const [addCourseData,setAddCourseData] = useState({
        'name':'',
        'description':'',
        'course_image':null
    });
    const [errors,setErrors] = useState({});

    const handleChange = (e) =>{
        setAddCourseData({
            ...addCourseData,
            [e.target.name]:e.target.value
        })
    }

    const validateForm = () =>{
        const newErrors = {};
        if(!addCourseData.name) newErrors.name="Course Name is required"
        if(!addCourseData.description) newErrors.description="Course description is required"
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const submitForm = async (e) =>{
        e.preventDefault();
        if(validateForm()){
            setIsLoading(true);
            const addCourseFormData = new FormData();
            addCourseFormData.append('name',addCourseData.name);
            addCourseFormData.append('description',addCourseData.description)
            if(addCourseData.course_image){
                addCourseFormData.append('course_image',addCourseData);
            }
            try {
                const response = await axios.post(`${BASE_URL}/api/course`,addCourseFormData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                setAddCourseData({
                    'name':'',
                    'description':'',
                    'course_image':null,
                    'status':'success'
                })
            } catch (error) {
                setAddCourseData({
                    ...addCourseData,
                    'status':'error'
                })
            }finally{
                setIsLoading(false)
            }
        }else{
            console.log(errors);
        }
    }

    return(
        <div className=" container mb-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSideMenu/>
                </aside>
                <section className="col-md-9">
                {addCourseData.status==='success' && <p className='text-success'>Thank you! Course has been added successfully!</p>}
                    {addCourseData.status==='error' && <p className='text-danger'>Some error has come up! Please resolve this issue!</p>}
                    <div className="card">
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                            <Form onSubmit={submitForm}>
                                <Form.Group as={Row} className="mb-3" controlId="courseNameID">
                                <Form.Label>Course Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" name="name" onChange={handleChange} placeholder="Enter course name" isInvalid={!!errors.name} />
                                </Col>
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group as={Row} className="mb-3" controlId="courseDescriptionId">
                                <Form.Label>Class Description</Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} placeholder="Enter course description" isInvalid={!!errors.description}/>
                                </Col>
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="courseImageId">
                                    <Form.Label>Course Image</Form.Label>
                                    <Form.Control type="file" onChange={(e)=>setAddCourseData({
                                        ...addCourseData,
                                        course_image:e.target.files[0],
                                    })} isInvalid={!!errors.course_image}/>
                                    <Form.Control.Feedback type="invalid">{errors.course_image}</Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isLoading}>{isLoading ? "Adding... ":"Add"}</Button>
                            </Form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddCourse;