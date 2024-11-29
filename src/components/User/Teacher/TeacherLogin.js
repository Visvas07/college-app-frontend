import './Teacher.css'
import { Form,Button } from 'react-bootstrap'
import { useEffect,useState } from 'react'
import axios from 'axios'
const base_url = 'http://127.0.0.1:8000/api/'
function TeacherLogin(){
    
    useEffect(()=>{
        document.title="Teacher Login"
    })
    const [isLoading,setIsLoading]=useState(false);
    const [errors,setErrors]=useState({});
    const [teacherLoginData,setTeacherLoginData]=useState({
        'username':'',
        'password':''
    })


    const handleChange = (event) =>{
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        })
    }

    const validateForm = () =>{
        const newErrors={};
        if(!teacherLoginData.username) newErrors.username = "username must be required to log in";
        if(!teacherLoginData.password) newErrors.password = "Password is required"
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const submitForm = async (event) =>{
        event.preventDefault();
        try {
            if(validateForm()){
                setIsLoading(true);
                const teacherFormData = new FormData();
                teacherFormData.append('username',teacherLoginData.username);
                teacherFormData.append('password',teacherLoginData.password)
                const response =  await axios.post(base_url+'teacher-login',teacherFormData);
                console.log("Success",response.data);
                
                if(response.data.bool===true){
                    setTeacherLoginData({
                        'username':'',
                        'password':'',
                        'status':'success'
                    })
                    setErrors({});
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacherId',response.data.teacher_id);
                    localStorage.setItem('userRole',"teacher");
                    window.location.href='/teacher-dashboard'
                }else{
                    setTeacherLoginData({...teacherLoginData,'status':'error'})
                }
         }
        } catch (error) {
            console.log(error.message);
            setTeacherLoginData({...teacherLoginData,'status':'error'})
        }finally{
            setIsLoading(false);
        }
        
    }

    return(
        <div className="container mt-4">
        <div className="row">
            <div className="col-6 offset-3">
            {teacherLoginData.status==='success' && <p className='text-success'>Login Success!!</p>}
                    {teacherLoginData.status==='error' && <p className='text-danger'>Please verify your credentials!</p>}
                    
                <div className="card">
                    <h3 className="card-header txt">Teacher Login</h3>
             
                    <div className="card-body">
                    <Form onSubmit={submitForm}>
                    <Form.Group className="mb-5" controlId="usernameId">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={teacherLoginData.username} onChange={handleChange} name='username' isInvalid={!!errors.username} />
                        <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-5" controlId="passwordId">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={teacherLoginData.password} onChange={handleChange} name='password' isInvalid={!!errors.password} />
                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading} >
                        {isLoading ? "Logging in...":"Login"}
                    </Button>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TeacherLogin