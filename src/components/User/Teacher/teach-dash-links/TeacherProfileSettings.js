import TeacherSideMenu from "../TeacherSideMenu"
import { Col, Form, Row,Button } from "react-bootstrap"
import { useEffect,useState } from "react"
import axios from "axios"

const BASE_URL = process.env.REACT_END_BACKEND_URL;
function TeacherProfileSettings(){
  const [teacherData,setTeacherData]=useState({
    'email':'',
    'mobile_no':'',
    'qualification':'',
    'gender':'',
    'profile_photo':null
})
const [errors,setErrors] = useState({});
const [isLoading,setIsLoading]=useState(false);
const teacherId = localStorage.getItem('teacherId');
  useEffect(()=>{
    document.title="Profile Settings | Teacher"
})

const handleChange=(event)=>{
  setTeacherData({
   ...teacherData,
   [event.target.name]:event.target.value
  });
}

const validateForm = () =>{
  const newErrors={};
  if(!teacherData.email)  newErrors.email="Email is required";
   if(!teacherData.qualification) newErrors.qualification = "Qualification is required!"
  if(!teacherData.mobile_no) newErrors.mobile_no = "Mobile Number is required"
  const mobilePattern = /^[7-9][0-9]{9}$/;
  if(!mobilePattern.test(teacherData.mobile_no)){
      newErrors.mobile_no = "Mobile number must start with 7, 8, or 9 and contain exactly 10 digits."
  }
  if(!teacherData.gender) newErrors.gender = "Gender is required"

  setErrors(newErrors);
  
  return Object.keys(newErrors).length === 0;
}

const handleSubmit = async (e) =>{
  debugger;
  e.preventDefault();
  if(validateForm()){
      setIsLoading(true);
      const teacherFormData = new FormData();
      teacherFormData.append("email",teacherData.email);
      teacherFormData.append("mobile_no",teacherData.mobile_no);
      teacherFormData.append("qualification",teacherData.qualification);
      teacherFormData.append("gender",teacherData.gender);
      if(teacherData.profile_photo){
          teacherFormData.append("profile_photo",teacherData.profile_photo);
      }
      try {
           axios.patch(BASE_URL+'/api/teacher/'+teacherId,teacherFormData,{
              headers:{
                  'Content-Type':"multipart/form-data",
              },
          }).then((res)=>{
          setTeacherData({
              'email':'',
              'mobile_no':'',
              'qualification':'',
              'profile_photo':null,
              'gender':'',
              'status':'success'
          });
          }).catch((error)=>{
            if (error.response) {
              console.error("Response Data: ", error.response.data); // Backend response
              console.error("Response Status: ", error.response.status); // HTTP status
          } else if (error.request) {
              console.error("Request: ", error.request); // Request made but no response received
          } else {
              console.error("Error Message: ", error.message); // Other errors
          }
          });
          
          
      } catch (error) {
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
        <aside className="col-md-3">
            <TeacherSideMenu/>
        </aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">Profile Settings</h5>
                <div className="card-body">
                <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="emailID">
                <Form.Label column sm="2">Email Address</Form.Label>
                <Col sm="10">
                    <Form.Control defaultValue={"uname@email.com"} onChange={handleChange} name="email" value={teacherData.email} isInvalid={!!errors.email}/>
                </Col>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
        <Form.Label column sm="2">
          Phone Number
        </Form.Label>
        <Col sm="10">
          <Form.Control type="phone" placeholder="Mobile No" pattern="[789]{1}\d{9}$" onChange={handleChange} name="mobile_no" value={teacherData.mobile_no} isInvalid={!!errors.mobile_no}/>
        </Col>
        <Form.Control.Feedback type="invalid">{errors.mobile_no}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="qualification">
        <Form.Label column sm="2">
          Qualification
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Qualification" onChange={handleChange} name="qualification" isInvalid={!!errors.qualification} value={teacherData.qualification}/>
        </Col>
        <Form.Control.Feedback type="invalid">{errors.qualification}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="Gender">
        <Form.Label column sm="2">
          Gender
        </Form.Label>
        <Col sm="10">
          <Form.Select onChange={handleChange} isInvalid={!!errors.gender} name="gender" value={teacherData.gender}>
            <option>Select gender..</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </Form.Select>
        </Col>
        
        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="pfp">
        <Form.Label column sm="2">
          Profile Photo
        </Form.Label>
        <Col sm="10">
          <Form.Control type="file"  onChange={(e)=> setTeacherData({
                                ...teacherData,
                                profile_photo:e.target.files[0],
                            })} 
                            isInvalid={!!errors.profile_photo}/>
        </Col>
        <Form.Control.Feedback type="invalid">{errors.profile_photo}</Form.Control.Feedback>
      </Form.Group>
      <Button disabled={isLoading} type="submit">{isLoading ? "Updating.. ": "Update"}</Button>
        </Form>
                </div>
            
            </div>
        
        </section>
        </div>
    </div>
    )
}

export default TeacherProfileSettings