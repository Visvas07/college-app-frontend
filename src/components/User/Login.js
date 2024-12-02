import { Form,Button } from "react-bootstrap"
import './User.css'
import { useEffect,useState } from "react"
import axios from 'axios'
const BASE_URL = process.env.REACT_END_BACKEND_URL || "https://college-app-backend-7m7a.onrender.com";
const FRONT_END_URL = "https://college-app-frontend-t2jw.onrender.com";

function Login() {
    useEffect(()=>{
        document.title="Student Login"
    })

    const [isLoading,setIsLoading] = useState(false);
    const [errors,setErrors] = useState({});
    const [studentLoginData,setStudentLoginData] = useState({
        'username':'',
        'password':''
    })


    const handleChange = (event) =>{
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        })
    }

    const validateForm = () =>{
        const newErrors = {};
        if(!studentLoginData.username) newErrors.username="Username is required to login"
        if(!studentLoginData.password) newErrors.password="Password is required to login"
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const submitForm = async (e) =>{
        debugger;
        e.preventDefault();
        try {
            if(validateForm()){
                const studentFormData = new FormData();
                studentFormData.append('username',studentLoginData.username);
                studentFormData.append('password',studentLoginData.password);
                const response = await axios.post(BASE_URL+'/api/login',studentFormData);

                if(response.data.bool ===true){
                    setStudentLoginData({
                        'username':'',
                        'password':'',
                        'status':'success'
                    });
                    setErrors({});
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',response.data.student_id);
                    localStorage.setItem('userRole',"student");
                    window.location.href=FRONT_END_URL+'/dashboard'
                }else{
                    setStudentLoginData({...studentLoginData,'status':'error'})
                }
            }
        } catch (error) {
            console.log("Errors: ",error.message);
            setStudentLoginData({...studentLoginData,'status':'error'})
            
        }finally{
            setIsLoading(false);
        }
    }



    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {studentLoginData.status === 'success' && <p className="text-success">Login Success</p>}
                    {studentLoginData.status === 'error' && <p className="text-danger">Please verify the credentials</p>}
                    <div className="card">
                        <h3 className="card-header txt">Student Login</h3>
                        <div className="card-body">
                        <Form onSubmit={submitForm}>
                        <Form.Group className="mb-5" controlId="usernameId">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={studentLoginData.username} onChange={handleChange} isInvalid={!!errors.username} />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="passwordId">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={studentLoginData.password} onChange={handleChange} isInvalid={!!errors.password}/>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login