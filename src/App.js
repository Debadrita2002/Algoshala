import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ToastContainer} from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Courses from './components/Courses';
import AddCourses from './components/AddCourses';
import Students from './components/Students';
import AddStudent from './components/AddStudent';
import CollectFee from './components/CollectFee';
import PaymentHistory from './components/PaymentHistory';

function App() {
  const myRouter = createBrowserRouter([
    {path:'',Component:Signup},
    {path: 'login',Component:Login},
    {path: 'signup',Component:Signup},
    {path: 'dashboard',Component:Dashboard,children:[
      {path:'',Component:Home},
      {path:'home',Component:Home},
      {path:'courses',Component:Courses},
      {path:'add-course',Component:AddCourses},
      {path:'students',Component:Students},
      {path:'add-student',Component:AddStudent},
      {path:'collect-fee',Component:CollectFee},
      {path:'payment-history',Component:PaymentHistory}
    ]}
  ])
  return (
    <>
      <RouterProvider router={myRouter}/>
      <ToastContainer />
    </>
  )
}

export default App;
