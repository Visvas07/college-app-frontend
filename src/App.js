import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import Main from './components/Main'
import CourseDetail from './components/CourseDetail/CourseDetail';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Dashboard from './components/User/Dashboard';
import MyCourses from './components/User/dashlink/MyCourses';
import ProfileSettings from './components/User/dashlink/ProfileSettings';
import ChangePassword from './components/User/dashlink/ChangePassword';
import TeacherLogin from './components/User/Teacher/TeacherLogin';
import TeacherRegister from './components/User/Teacher/TeacherRegister';
import TeacherDashboard from './components/User/Teacher/TeacherDashboard';
import TeacherMyCourses from './components/User/Teacher/teach-dash-links/TeacherMyCourses';
import TeacherProfileSettings from './components/User/Teacher/teach-dash-links/TeacherProfileSettings';
import TeacherChangePassword from './components/User/Teacher/teach-dash-links/TeacherChangePassword';
import TeacherMyStudents from './components/User/Teacher/teach-dash-links/TeacherMyStudents';
import MyStudents from './components/User/Teacher/teach-dash-links/MyStudents';
import MyTeachers from './components/User/dashlink/MyTeachers';
import TeacherDetail from './components/User/Teacher/TeacherDetail';
import AllClasses from './components/Classes/AllClasses';
import TeacherLogout from './components/User/Teacher/TeacherLogout';
import Logout from './components/User/Logout';
import AddCourse from './components/User/Teacher/teach-dash-links/AddCourse';


function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/home' element={<Main/>}/>
      <Route path='/*' element={<NotFound/>}/>
      <Route path='/all-classes' element={<AllClasses/>}/>
      <Route path='/course-detail/:course_id' element={<CourseDetail/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/my-courses' element={<MyCourses/>}/>
      <Route path='/profile-settings' element={<ProfileSettings/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/teacher-login' element={<TeacherLogin/>}/>
      <Route path='/teacher-register' element={<TeacherRegister/>}/>
      <Route path='/teacher-dashboard' element={<TeacherDashboard/>}/>
      <Route path='/teacher-my-courses' element={<TeacherMyCourses/>}/>
      <Route path='/teacher-profile-settings' element={<TeacherProfileSettings/>}/>
      <Route path='/teacher-change-password' element={<TeacherChangePassword/>}/>
      <Route path='/my-students' element={<TeacherMyStudents/>}/> 
      <Route path='/my-teachers' element={<MyTeachers/>}/> 
      <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail/>}/>
      <Route path='/teacher-logout' element={<TeacherLogout/>}/>
      <Route path='/teacher-add-course' element={<AddCourse/>}/>
      <Route path='/my-students/:course_id' element={<MyStudents/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
