import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import Logo from '../assets/images/fitbytes2.png'


const Navbar = () => {
  return (
    <Stack direction='row' justifyContent='space-around' sx={{ gap: { sm:'100px', xs:'30px'},mt:{sm:'32px',xs:'40px'},justifyContent:'none'}} px='20px'>
      <Link to='/'>
        <img src={Logo} alt="logo" className='logo-img'/>
      </Link>
      <Stack
        direction='row'
        alignItems='flex-end'
        sx={{ gap: { xs: '15px', md: '20px' } }}
        className='nav-items'
      >
        <Link to='/' style={{textDecoration:'none',color:'#3A1212', borderBottom:'3px solid #ff2625'}}>Home</Link>
        <a href="#exercises" style={{ textDecoration: 'none', color:'#3A1212'}}>Exercises</a>
        <Link to='/Login' style={{textDecoration:'none',color:'#3A1212',}}>Login</Link>

      </Stack>
    </Stack>
  )
}

export default Navbar