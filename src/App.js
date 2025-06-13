import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ToastContainer} from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const myRouter = createBrowserRouter([
    {path:'',Component:Login},
    {path: 'login',Component:Login},
    {path: 'signup',Component:Signup},
    {path: 'dashboard',Component:Dashboard}
  ])
  return (
    <>
      <RouterProvider router={myRouter}/>
      <ToastContainer />
    </>
  )
}

export default App;
