import { Form,Button,Row,Col } from "react-bootstrap"
import './User.css'

import { useEffect,useState } from 'react'
import axios from 'axios'
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function Register() {
    useEffect(()=>{
        document.title="Student Register";
    })
    const [isLoading,setIsLoading]=useState(false)
    const [errors,setErrors]=useState({});
    const [studentData,setStudentData]=useState({
        'first_name':'',
        'last_name':'',
        'username':'',
        'email':'',
        'password':'',
        'confirmPassword':'',
        'mobile_no':'',
        'degree':'',
        'dob':'',
        'address':'',
        'gender':'',
        'blood_group':'',
        'profile_photo':null
    })

    const handleChange=(event)=>{
        setStudentData({
         ...studentData,
         [event.target.name]:event.target.value
        });
     }
 
     const validateForm = () =>{
         const newErrors={};
         if(!studentData.first_name)  newErrors.first_name="First Name is required";
         if(!studentData.last_name)  newErrors.last_name="Last Name is required";
         if(!studentData.email)  newErrors.email="Email is required";
         if(!studentData.username)  newErrors.username="Username is required";
         if(!studentData.password) newErrors.password="Password is required"
         else if(studentData.password.length <8) newErrors.password="Password must have more than 8 characters."
         else{
             if(studentData.first_name && studentData.password.toLowerCase().includes(studentData.first_name.toLowerCase())) newErrors.password="Password must not contain first name"
             if(studentData.last_name && studentData.password.toLowerCase().includes(studentData.last_name.toLowerCase())) newErrors.password="Password must not contain last name"
         }
         
         
         
         if(studentData.password !== studentData.confirmPassword) newErrors.password="Passwords does not match"
         if(!studentData.degree) newErrors.degree = "Qualification is required!"
         if(!studentData.mobile_no) newErrors.mobile_no = "Mobile Number is required"
         const mobilePattern = /^[7-9][0-9]{9}$/;
         if(!mobilePattern.test(studentData.mobile_no)){
             newErrors.mobile_no = "Mobile number must start with 7, 8, or 9 and contain exactly 10 digits."
         }
         if(!studentData.dob) newErrors.dob = "Date of birth is required"
         else {
            const dob = new Date(studentData.dob);
            const today = new Date()
            let age = today.getFullYear() - dob.getFullYear()
            if(isNaN(today.getFullYear()-dob.getFullYear())){
                newErrors.dob="Invalid Date"
            }
            const monthDiff = today.getMonth() - dob.getMonth()
            const daydiff = today.getDate() - dob.getDate()
            if(monthDiff < 0 || (monthDiff <0 && daydiff <0)) age--;
            if(age < 18 || isNaN(age)) newErrors.dob="Student must be at least 18 years old!"
         }

         if(!studentData.address) newErrors.address = "Address is required"
         const bloodGroup=/^(A|B|AB|O)[+-]$/
         if(!bloodGroup.test(studentData.blood_group)) newErrors.blood_group = "Invalid Blood Group"
         else if(!studentData.blood_group) newErrors.blood_group = "Blood Group is required"

         if(!studentData.gender) newErrors.gender ="Gender is required"
         setErrors(newErrors);
         return Object.keys(newErrors).length === 0;
     }
 
     const handleSubmit = async (e) =>{
        e.preventDefault();
        if(validateForm()){
            setIsLoading(true);
            const studentFormData = new FormData();
            studentFormData.append("first_name",studentData.first_name);
            studentFormData.append("last_name",studentData.last_name);
            studentFormData.append("username",studentData.username);
            studentFormData.append("email",studentData.email);
            studentFormData.append("password",studentData.password);
            studentFormData.append("mobile_no",studentData.mobile_no);
            studentFormData.append("degree",studentData.degree);
            studentFormData.append("dob",studentData.dob);
            studentFormData.append("address",studentData.address);
            studentFormData.append("blood_group",studentData.blood_group);
            studentFormData.append("gender",studentData.gender);
            if(studentData.profile_photo){
                studentFormData.append("profile_photo",studentData.profile_photo);
            }
            try {
                const response = await axios.post(`${BASE_URL}/api/student/`,studentFormData,{
                    headers:{
                        'Content-Type':"multipart/form-data",
                    },
                });
                setStudentData({
                    'first_name':'',
                    'last_name':'',
                    'username':'',
                    'email':'',
                    'password':'',
                    'confirmPassword':'',
                    'mobile_no':'',
                    'degree':'',
                    'dob':'',
                    'address':'',
                    'gender':'',
                    'blood_group':'',
                    'profile_photo':null,
                    'status':'success'
                })
            } catch (error) {
                console.log("Error: ", error.message);
                setStudentData({...studentData,'status':'error'})
            }finally{
                setIsLoading(false);
            }
        }else{
            console.log(errors);
        }
    };


    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                {studentData.status==='success' && <p className='text-success'>Thank you! You have been registered successfully!</p>}
                    {studentData.status==='error' && <p className='text-danger'>Some error has come up!Please resolve them!</p>}
                    <div className="card">
                        <h3 className="card-header txt">Student Register</h3>
                        <div className="card-body">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="firstnameId">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter first name" name='first_name' value={studentData.first_name} isInvalid={!!errors.first_name} />
                            <Form.Control.Feedback type='invalid'>{errors.first_name}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-4" controlId="lastnameId">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter last name" name='last_name' value={studentData.last_name} isInvalid={!!errors.last_name} />
                            <Form.Control.Feedback type='invalid'>{errors.last_name}</Form.Control.Feedback>
                        </Form.Group>
                            </Col>
                            </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="usernameId">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter username" name='username' value={studentData.username} isInvalid={!!errors.username}/>
                            <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="emailId">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter email" name='email' value={studentData.email} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="passwordId">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Password" name='password' value={studentData.password} isInvalid={!!errors.password}/>
                            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="confirmpasswordId">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Password" name='confirmPassword' value={studentData.confirmPassword} isInvalid={!!errors.confirmPassword} />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="degreeID">
                            <Form.Label>Degree</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter qualification" name='degree' value={studentData.degree} isInvalid={!!errors.degree}/>
                            <Form.Control.Feedback type='invalid'>{errors.degree}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="mobilenoID">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter mobile no" name='mobile_no' value={studentData.mobile_no} isInvalid={!!errors.mobile_no} pattern='[789]{1}\d{9}$' />
                            <Form.Control.Feedback type='invalid'>{errors.mobile_no}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="dobID">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control onChange={handleChange} type="date" placeholder="Enter Date of birth" name='dob' value={studentData.dob} isInvalid={!!errors.dob}/>
                            <Form.Control.Feedback type='invalid'>{errors.dob}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="bloodGroupID">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter Blood Group" name='blood_group' value={studentData.blood_group} isInvalid={!!errors.blood_group} pattern='^(A|B|AB|O)[+-]$' />
                            <Form.Control.Feedback type='invalid'>{errors.blood_group}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-4" controlId="addressID">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter Address" name='address' value={studentData.address} isInvalid={!!errors.address}/>
                            <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-4" controlId="genderID">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" value={studentData.gender} isInvalid={errors.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                 <option value="F">Female</option>
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>{errors.gender}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className='mb-4' controlId='profilePhotoID'>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type='file' name='profile_photo' 
                            onChange={(e)=> setStudentData({
                                ...studentData,
                                profile_photo:e.target.files[0],
                            })}
                            isInvalid={!!errors.profile_photo}/>
                                <Form.Control.Feedback type='invalid'>{errors.profile_photo}</Form.Control.Feedback>
                            
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Submitting...":"Register"}
                        </Button>
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register