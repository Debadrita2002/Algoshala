import React from 'react'
import '../components/style.css'
import SideNav from './SideNav'

const Dashboard = () => {
  return (
    <div className='dashboard-main-container'>
      <div className='dashboard-container'>
        <SideNav/>
        <div className='main-container'>
          <div className='top-bar'>
            <div className='logo-container'>
              <img className='profile-logo' src={require('../assets/imu.png')} />
            </div>
            <div className='profile-container'>
              <h2 className='profile-name'>Algoshala</h2>
              <button className='logout-button'>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard