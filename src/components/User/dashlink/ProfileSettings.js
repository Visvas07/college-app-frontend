import SideMenu from "../SideMenu"
import { Col, Form, Row,Button } from "react-bootstrap"
import { useEffect,useState } from "react"
import axios from "axios"
const base_url='http://127.0.0.1:8000/api'
function ProfileSettings(){
  const [studentData,setStudentData]=useState({
    'email':'',
    'mobile_no':'',
    'degree':'',
    'address':'',
    'dob':'',
    'blood_group':'',
    'gender':'',
    'profile_photo':null
  });
  const [errors,setErrors] = useState({});
  const [isLoading,setIsLoading]=useState(false);
  const studentId = localStorage.getItem('studentId');
  console.log(studentId);
  useEffect(()=>{
    document.title="Profile Settings | Student"
})

const handleChange=(event)=>{
  setStudentData({
   ...studentData,
   [event.target.name]:event.target.value
  });
}

const validateForm = () =>{
  const newErrors={};
  if(!studentData.email)  newErrors.email="Email is required";
   if(!studentData.degree) newErrors.degree = "Degree is required!"
  if(!studentData.mobile_no) newErrors.mobile_no = "Mobile Number is required"
  const mobilePattern = /^[7-9][0-9]{9}$/;
  if(!mobilePattern.test(studentData.mobile_no)){
      newErrors.mobile_no = "Mobile number must start with 7, 8, or 9 and contain exactly 10 digits."
  }
  if(!studentData.gender) newErrors.gender = "Gender is required"
  if(!studentData.address) newErrors.address = "Address is required"
  if(!studentData.blood_group) newErrors.blood_group = "Blood Group is required"
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

  setErrors(newErrors);
  console.log(newErrors.length);
  
 // console.log(errors)
  //console.log("What error?");
  return Object.keys(newErrors).length === 0;
}

const handleSubmit = async (e) =>{
  debugger;
  e.preventDefault();
  if(validateForm()){
      setIsLoading(true);
      const studentFormData = new FormData();
      studentFormData.append("email",studentData.email);
      studentFormData.append("mobile_no",studentData.mobile_no);
      studentFormData.append("degree",studentData.degree);
      studentFormData.append("gender",studentData.gender);
      studentFormData.append("dob",studentData.dob);
      studentFormData.append("blood_group",studentData.blood_group);
      studentFormData.append("address",studentData.address);
      if(studentData.profile_photo){
          studentFormData.append("profile_photo",studentData.profile_photo);
      }
      try {
           axios.patch(base_url+'/student/'+studentId,studentFormData,{
              headers:{
                  'Content-Type':"multipart/form-data",
              },
          }).then((res)=>{
            console.log("Success: ",res.data)
          setStudentData({
            'email':'',
            'mobile_no':'',
            'degree':'',
            'address':'',
            'dob':'',
            'blood_group':'',
            'gender':'',
            'profile_photo':null,
              'status':'success'
          });
          }).catch((error)=>{
            console.log("Error: ", error);
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
          console.log("Error: ", error);
          if (error.response) {
            console.error("Response Data: ", error.response.data); // Backend response
            console.error("Response Status: ", error.response.status); // HTTP status
        } else if (error.request) {
            console.error("Request: ", error.request); // Request made but no response received
        } else {
            console.error("Error Message: ", error.message); // Other errors
        }
          setStudentData({...studentData,'status':'error'});
      }finally{
          setIsLoading(false);
      }
  }else{
      console.log(errors);
      setStudentData({
          ...studentData,
          'status':'error'
      })
  }
};


    return(
        <div className="container mt-4">
        <div className="row">
        <aside className="col-md-3">
            <SideMenu/>
        </aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">Profile Settings</h5>
                <div className="card-body">
                <Form onSubmit={handleSubmit} >
            <Form.Group as={Row} className="mb-3" controlId="emailID">
                <Form.Label column sm="2">Email Address</Form.Label>
                <Col sm="10">
                    <Form.Control name="email" value={studentData.email} onChange={handleChange} isInvalid={!!errors.email}/>
                </Col>
            </Form.Group>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
        <Form.Label column sm="2">
          Phone Number
        </Form.Label>
        <Col sm="10">
          <Form.Control type="phone" placeholder="Mobile No" pattern="[789]{1}\d{9}$"  name="mobile_no" value={studentData.mobile_no} onChange={handleChange} isInvalid={!!errors.mobile_no} />
        </Col>
        <Form.Control.Feedback type="invalid">{errors.mobile_no}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="degree">
        <Form.Label column sm="2">
          Degree
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Degree"  name="degree" value={studentData.degree} onChange={handleChange} isInvalid={!!errors.degree}/>
          <Form.Control.Feedback type="invalid">{errors.degree}</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="address">
        <Form.Label column sm="2">
          Address
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Address"  name="address" value={studentData.address} onChange={handleChange} isInvalid={!!errors.address} />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="dob">
        <Form.Label column sm="2">
          Date of Birth
        </Form.Label>
        <Col sm="10">
          <Form.Control type="date" placeholder="D.O.B"  name="dob" value={studentData.dob} onChange={handleChange} isInvalid={!!errors.dob}/>
        </Col>
        <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="Gender"  >
        <Form.Label column sm="2">
          Gender
        </Form.Label>
        <Col sm="10">
          <Form.Select name="gender" value={studentData.gender} onChange={handleChange} isInvalid={!!errors.gender}>
            <option>Select gender..</option>
            <option value="M">M</option>
            <option value="F">F</option>
            
          </Form.Select>
        </Col>
        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="bloodGroup"  >
        <Form.Label column sm="2">
          Blood Group
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Blood Group" name="blood_group" value={studentData.blood_group} onChange={handleChange} isInvalid={!!errors.blood_group} />
        </Col>
        <Form.Control.Feedback type="invalid">{errors.blood_group}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="pfp">
        <Form.Label column sm="2">
          Profile Photo
        </Form.Label>
        <Col sm="10">
          <Form.Control type="file" onChange={(e)=> setStudentData({
                                ...studentData,
                                profile_photo:e.target.files[0],
                            })} isInvalid={!!errors.profile_photo} />
        </Col>
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

export default ProfileSettings