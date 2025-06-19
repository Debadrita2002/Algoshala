import React from 'react'
import '../components/style.css'
import SideNav from './SideNav'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate();
  const logoutHandler=()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className='dashboard-main-container'>
      <div className='dashboard-container'>
        <SideNav/>
        <div className='main-container'>
          <div className='top-bar'>
            <div className='logo-container'>
              <img className='profile-logo' src={localStorage.getItem('imageUrl')} />
            </div>
            <div className='profile-container'>
              <h2 className='profile-name'>Algoshala</h2>
              <button className='logout-button' onClick={logoutHandler}>Logout</button>
            </div>
          </div>
          <div className='outlet-area'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard