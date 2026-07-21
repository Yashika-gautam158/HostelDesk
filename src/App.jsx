import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Adminlayout from './components/admin/adminlayout/Adminlayout'
import { BrowserRouter ,Routes , Route} from 'react-router-dom'
import Admindashboard from './components/admin/admindashboard/Admindashboard'
import Students from './components/admin/students/Students'
import './firebaseConfig/firebaseConfig'
import Rooms from './components/admin/rooms/Rooms'
import ComplaintDisplay from './components/admin/complaints/ComplaintDisplay'
import AddWarden from './components/admin/adminwardens/Addwarden'
import Studentdisplay from './components/admin/students/Studentdisplay'
import AddRoom from './components/admin/rooms/Addroom'
import Assignroom from "./components/admin/assignroom/Assignroom";
import Login from './components/auth/Login'
import StudentDashboard from './components/students/studentdashboard/StudentDashboard'
import Studentlayout from './components/students/studentlayout/Studentlayout'
import Profile from './components/students/studentprofile/Profile'
import RoomDetails from './components/students/studentroomdetails/Roomdetails'
import Studentcomplaints from './components/students/studentcomplaints/Studentcomplaints'
import Studentfees from './components/students/studentfees/Studentfees'
import Leave from './components/students/leave/Studentleave'

import LeaveRequests from './components/admin/adminleave/LeaveRequests'
import Adminfees from './components/admin/adminfees/adminfees'
import ComplaintService from './components/students/studentcomplaints/ComplaintService'
import Studentleave from './components/students/leave/Studentleave'
import { ToastContainer } from "react-toastify";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/admin' element={<Adminlayout/>}> <Route path ='/admin' element={<Admindashboard/>}></Route>
      <Route path='students' element={<Students/>}></Route>
      <Route path='Rooms' element={<Rooms/>}></Route>
     <Route path='complaintdisplay' element={<ComplaintDisplay/>}></Route>
      <Route path='wardenadd' element={<AddWarden/>}></Route>
      <Route path='studentdisplay' element={<Studentdisplay/>}></Route>
      <Route path='addroom' element={<AddRoom/>}></Route>
     <Route path='leaverequests' element={<LeaveRequests/>}></Route>
     <Route path='adminfees' element={<Adminfees/>}></Route>
      </Route>
     <Route
    path="/admin/assign-room/:id"
    element={<Assignroom />}
/>



<Route path="/student" element={<Studentlayout />}>

    <Route index element={<StudentDashboard />} />

    <Route path="profile" element={<Profile />} />

    <Route path="room" element={<RoomDetails />} />

    <Route path="studentcomplaints" element={<Studentcomplaints />} />

    <Route path="fees" element={<Studentfees />} />

    <Route path="leave" element={<Studentleave />} />

</Route>
    </Routes>
    </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
