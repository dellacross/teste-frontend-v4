import React from 'react'
import './navbar.css'
import AikoLogo from '../../assets/img/aiko.png'

const NavBar = () => {
  return (
    <div id="nav-bar">
        <img 
            src={AikoLogo} 
            alt='aiko-logo'
        />    
    </div>
  )
}

export default NavBar