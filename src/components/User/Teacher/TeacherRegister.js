import './Teacher.css'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { useEffect,useState } from 'react'
import axios from 'axios'
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function TeacherRegister(){
    useEffect(()=>{
        document.title="Teacher Register"
    })
    const [isLoading,setIsLoading]=useState(false)
        const [errors,setErrors]=useState({});
    const [teacherData,setTeacherData]=useState({
        'first_name':'',
        'last_name':'',
        'username':'',
        'email':'',
        'password':'',
        'confirmPassword':'',
        'mobile_no':'',
        'qualification':'',
        'profile_photo':null
    })

    const handleChange=(event)=>{
       setTeacherData({
        ...teacherData,
        [event.target.name]:event.target.value
       });
    }

    const validateForm = () =>{
        const newErrors={};
        if(!teacherData.first_name)  newErrors.first_name="First Name is required";
        if(!teacherData.last_name)  newErrors.last_name="Last Name is required";
        if(!teacherData.email)  newErrors.email="Email is required";
        if(!teacherData.username)  newErrors.username="Username is required";
        if(!teacherData.password) newErrors.password="Password is required"
        else if(teacherData.password.length <8) newErrors.password="Password must have more than 8 characters."
        else{
            if(teacherData.first_name && teacherData.password.toLowerCase().includes(teacherData.first_name.toLowerCase())) newErrors.password="Password must not contain first name"
            if(teacherData.last_name && teacherData.password.toLowerCase().includes(teacherData.last_name.toLowerCase())) newErrors.password="Password must not contain last name"
        }
        
        
        
        if(teacherData.password !== teacherData.confirmPassword) newErrors.password="Passwords does not match"
        if(!teacherData.qualification) newErrors.qualification = "Qualification is required!"
        if(!teacherData.mobile_no) newErrors.mobile_no = "Mobile Number is required"
        const mobilePattern = /^[7-9][0-9]{9}$/;
        if(!mobilePattern.test(teacherData.mobile_no)){
            newErrors.mobile_no = "Mobile number must start with 7, 8, or 9 and contain exactly 10 digits."
        }

        setErrors(newErrors);
        

        return Object.keys(newErrors).length === 0;
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(validateForm()){
            setIsLoading(true);
            const teacherFormData = new FormData();
            teacherFormData.append("first_name",teacherData.first_name);
            teacherFormData.append("last_name",teacherData.last_name);
            teacherFormData.append("username",teacherData.username);
            teacherFormData.append("email",teacherData.email);
            teacherFormData.append("password",teacherData.password);
            teacherFormData.append("mobile_no",teacherData.mobile_no);
            teacherFormData.append("qualification",teacherData.qualification);
            if(teacherData.profile_photo){
                teacherFormData.append("profile_photo",teacherData.profile_photo);
            }
            try {
                const response = await axios.post(`${BASE_URL}/api/teacher`,teacherFormData,{
                    headers:{
                        'Content-Type':"multipart/form-data",
                    },
                });
                setTeacherData({
                    'first_name':'',
                    'last_name':'',
                    'username':'',
                    'email':'',
                    'password':'',
                    'confirmPassword':'',
                    'mobile_no':'',
                    'qualification':'',
                    'profile_photo':null,
                    'status':'success'
                });
            } catch (error) {
                console.log("Error: ", error);
                if (error.response) {
                  console.error("Response Data: ", error.response.data); // Backend response
                  console.error("Response Status: ", error.response.status); // HTTP status
              } else if (error.request) {
                  console.error("Request: ", error.request); // Request made but no response received
              } else {
                  console.error("Error Message: ", error.message); // Other errors
              }
                setTeacherData({...teacherData,'status':'error'});
            }finally{
                setIsLoading(false);
            }
        }else{
            setTeacherData({
                ...teacherData,
                'status':'error'
            })
        }
    };

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {teacherData.status==='success' && <p className='text-success'>Thank you! You have been registered successfully!</p>}
                    {teacherData.status==='error' && <p className='text-danger'>Some error has come up!Please resolve them!</p>}
                    <div className="card">
                        <h3 className="card-header txt">Teacher Login</h3>
                        <div className="card-body">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="firstnameId">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter first name" name='first_name' value={teacherData.first_name} isInvalid={!!errors.first_name} />
                            <Form.Control.Feedback type='invalid'>{errors.first_name}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-4" controlId="lastnameId">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter last name" name='last_name' value={teacherData.last_name} isInvalid={!!errors.last_name} />
                            <Form.Control.Feedback type='invalid'>{errors.last_name}</Form.Control.Feedback>
                        </Form.Group>
                            </Col>
                            </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="usernameId">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter username" name='username' value={teacherData.username} isInvalid={!!errors.username}/>
                            <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="emailId">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter email" name='email' value={teacherData.email} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="passwordId">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Password" name='password' value={teacherData.password} isInvalid={!!errors.password}/>
                            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="confirmpasswordId">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Password" name='confirmPassword' value={teacherData.confirmPassword} isInvalid={!!errors.confirmPassword} />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="quaificationID">
                            <Form.Label>Quaification</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter qualification" name='qualification' value={teacherData.qualification} isInvalid={!!errors.qualification}/>
                            <Form.Control.Feedback type='invalid'>{errors.qualification}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="mobilenoID">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter mobile no" name='mobile_no' value={teacherData.mobile_no} isInvalid={!!errors.mobile_no} pattern='[789]{1}\d{9}$' />
                            <Form.Control.Feedback type='invalid'>{errors.mobile_no}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className='mb-4' controlId='profilePhotoID'>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type='file' name='profile_photo' 
                            onChange={(e)=> setTeacherData({
                                ...teacherData,
                                profile_photo:e.target.files[0],
                            })}
                            isInvalid={!!errors.profile_photo}/>
                                <Form.Control.Feedback type='invalid'>{errors.profile_photo}</Form.Control.Feedback>
                            
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Submitting..":"Register"}
                        </Button>
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegister