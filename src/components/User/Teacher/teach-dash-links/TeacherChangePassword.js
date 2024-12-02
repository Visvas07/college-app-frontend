import { Form,Row,Col, Button } from "react-bootstrap"
import TeacherSideMenu from "../TeacherSideMenu"
import { useEffect,useState } from "react"
import axios from "axios"
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
function TeacherChangePassword(){
  const [teacherPassword,setTeacherPassword] = useState({
    'oldpassword':'',
    'newpassword':'',
    'confirmpassword':''
  });
  const [errors,setErrors] = useState({});
const [isLoading,setIsLoading]=useState(false);
const teacherId = localStorage.getItem('teacherId');
  useEffect(()=>{
    document.title="Change Password | Teacher"
})

const handleChange = (e)=>{
  setTeacherPassword({
    ...teacherPassword,
    [e.target.name]:e.target.value,
  })
}

const validateForm = (e)=>{
  const newErrors={};
  if(!teacherPassword.oldpassword) newErrors.oldpassword = "Old password is required";
  if(!teacherPassword.newpassword) newErrors.newpassword = "New password is required";
  if(!teacherPassword.confirmpassword) newErrors.confirmpassword = "Confirmation of new password is required"; 
  if(teacherPassword.newpassword !== teacherPassword.confirmpassword) newErrors.confirmpassword = "Passwords are not the same";
  if(teacherPassword.newpassword.length < 8) newErrors.newpassword="New password must be of about 8 characters length"
  setErrors(newErrors);
  return Object.keys(newErrors).length ===0;

}

const submitForm = (e)=>{
  e.preventDefault();
  if(validateForm()){
    setIsLoading(true)
    const payLoad = {
      oldpassword:teacherPassword.oldpassword,
      newpassword:teacherPassword.newpassword,
      confirmpassword:teacherPassword.confirmpassword
    }
    try {
      axios.patch(BASE_URL+'/api/teacher-change-password/'+teacherId,payLoad,{
        headers:{
          'Content-Type':'application/json'
        }
      }).then((res)=>{
    setTeacherPassword({
      'oldpassword':'',
    'newpassword':'',
    'confirmpassword':'',
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
          setTeacherPassword({
            ...teacherPassword,
            'status':'error'
          })
    }finally{
      setIsLoading(false);
    }
  }else{
    setTeacherPassword({
      ...teacherPassword,
      'status':'error'
    })
  }
}
    return(
        <div className="container mt-4">
        <div className="row">
        <aside className="col-md-3">
            <TeacherSideMenu/>
        </aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">Change Password</h5>
                <div className="card-body">
                <Form onSubmit={submitForm}>
                <Form.Group as={Row} className="mb-3" controlId="oldpasswordId" >
        <Form.Label column sm="2">
          Old Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password"  placeholder="Old Password" name="oldpassword" value={teacherPassword.oldpassword} onChange={handleChange} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="newpasswordId">
        <Form.Label column sm="2">
          New Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="New Password" name="newpassword" value={teacherPassword.newpassword} onChange={handleChange}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="confirmpasswordId">
        <Form.Label column sm="2">
          Confirm Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Confirm Password"  name="confirmpassword" value={teacherPassword.confirmpassword} onChange={handleChange}/>
        </Col>
      </Form.Group>
      <Button disabled={isLoading} type="submit">{isLoading ? "Updating...":"Update"}</Button>
                </Form>
                </div>
                </div>
                </section>
                </div>
                </div>
    )
}
export default TeacherChangePassword