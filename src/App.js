import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar"
import ForgotPassword from "./pages/ForgotPassword";
import VeryfiEmail from "./pages/VeryfiEmail";
import UpdatePassword from "./pages/UpdatePassword";
import AboutPage from "./pages/AboutPage";
import ContecPage from "./pages/ContecPage";
import Error from "./pages/Error";
import Dashbord from "./pages/Dashbord";
import MyProfile from "./dashboard/MyProfile";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import DashboardSettings from "./dashboard/setting";
import AddCourse from "./dashboard/addCourses";
import MyCourses from "./dashboard/addCourses/myCourses/MyCourses";
import Catlog from "./pages/Catlog";
import CourseDetails from "./pages/CourseDetails";
import EnrolledCourses from "./dashboard/EnrolledCourses";
import Cart from "./dashboard/cart";
import LectureSection from "./dashboard/viewLecture/LectureSection";
import LectureView from "./dashboard/viewLecture/LectureView";
import Insturctor from "./dashboard/insturctorDasbord/Insturctor";



function App() {
  return (
   <div className=" flex flex-col font-inter ">
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/verify-email" element={<VeryfiEmail/>}/>
      <Route path="/update-password/:id" element={<UpdatePassword/>}/>
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/contact" element={<ContecPage/>} />
      <Route path="*" element={<Error/>} />
      <Route path="catalog/:courseName" element={<Catlog/>} />
      <Route path="course/:courseId" element={<CourseDetails/>} />
      
      <Route element={<LectureView/>}>
      <Route path="view-course/:courseId/:subsectionId" element={<LectureSection/>}/> 
      </Route>

      <Route  element={
            <PrivateRoute>
              <Dashbord/>
            </PrivateRoute>
      } > 
       <Route path="dashboard/my-profile" element={<MyProfile/>} />
       <Route path="/dashboard/settings" element={<DashboardSettings/>} />
       <Route path="dashboard/add-course" element={<AddCourse/>} />
       <Route path="dashboard/my-courses" element={<MyCourses/>} />
       <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
       <Route path="dashboard/cart" element={<Cart/>} />
       <Route path="dashboard/instructor" element={<Insturctor/>} />
      </Route>

     
    </Routes>
   </div>
  );
}

export default App;
