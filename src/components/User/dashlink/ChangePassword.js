import { Form,Row,Col, Button } from "react-bootstrap"
import SideMenu from "../SideMenu"
import { useEffect,useState } from "react"
import axios from "axios"
const base_url = 'http://127.0.0.1:8000/api'
function ChangePassword(){
  const [studentPassword,setStudentrPassword] = useState({
    'oldpassword':'',
    'newpassword':'',
    'confirmpassword':''
  });
  const [errors,setErrors] = useState({});
const [isLoading,setIsLoading]=useState(false);
const studentId = localStorage.getItem('studentId');
  useEffect(()=>{
    document.title="Change Password | student"
})

const handleChange = (e)=>{
  setStudentrPassword({
    ...studentPassword,
    [e.target.name]:e.target.value,
  })
}

const validateForm = (e)=>{
  const newErrors={};
  if(!studentPassword.oldpassword) newErrors.oldpassword = "Old password is required";
  if(!studentPassword.newpassword) newErrors.newpassword = "New password is required";
  if(!studentPassword.confirmpassword) newErrors.confirmpassword = "Confirmation of new password is required"; 
  if(studentPassword.newpassword !== studentPassword.confirmpassword) newErrors.confirmpassword = "Passwords are not the same";
  if(studentPassword.newpassword.length < 8) newErrors.newpassword="New password must be of about 8 characters length"
  setErrors(newErrors);
  return Object.keys(newErrors).length ===0;

}

const submitForm = (e)=>{
  e.preventDefault();
  if(validateForm()){
    setIsLoading(true)
    const payLoad = {
      oldpassword:studentPassword.oldpassword,
      newpassword:studentPassword.newpassword,
      confirmpassword:studentPassword.confirmpassword
    }
    try {
      axios.patch(base_url+'/student-change-password/'+studentId,payLoad,{
        headers:{
          'Content-Type':'application/json'
        }
      }).then((res)=>{
      console.log("Success: ",res.data)
    setStudentrPassword({
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
          setStudentrPassword({
            ...studentPassword,
            'status':'error'
          })
    }finally{
      setIsLoading(false);
    }
  }else{
    console.log(errors);
    setStudentrPassword({
      ...studentPassword,
      'status':'error'
    })
  }
}
    return(
        <div className="container mt-4">
        <div className="row">
        <aside className="col-md-3">
            <SideMenu/>
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
          <Form.Control type="password"  placeholder="Old Password" name="oldpassword" value={studentPassword.oldpassword} onChange={handleChange} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="newpasswordId">
        <Form.Label column sm="2">
          New Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="New Password" name="newpassword" value={studentPassword.newpassword} onChange={handleChange}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="confirmpasswordId">
        <Form.Label column sm="2">
          Confirm Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Confirm Password"  name="confirmpassword" value={studentPassword.confirmpassword} onChange={handleChange}/>
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
export default ChangePassword