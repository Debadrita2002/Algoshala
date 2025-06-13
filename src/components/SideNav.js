import React from 'react'
import '../components/style.css'

const SideNav = () => {
  return (
    <div className='nav-container'>
        <div className='brand-container'>
            <img className='profile-logo' src={require('../assets/imu.png')}/>
            <div>
              <h2 className='brand-name'>classes by Debadrita Dey</h2>
              <p className='brand-slogan'>Manage your app...</p>
            </div>
        </div>
        <div className='menu-container'>
          k
        </div>
    </div>
  )
}

export default SideNav