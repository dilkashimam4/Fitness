import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Stack } from '@mui/material'
import Logo from '../assets/images/fitbytes2.png'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const onLogout = async () => {
    try {
      // TODO:handle logout
      const res = await fetch("http://localhost:8000/login/api/logout", { credentials: "include" })
      console.log(await res.text())
      localStorage.clear()
      navigate("/")
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Stack direction='row' justifyContent='space-around' sx={{ gap: { sm: '100px', xs: '30px' }, mt: { sm: '32px', xs: '40px' }, justifyContent: 'none' }} px='20px'>
      <Link to='/'>
        <img src={Logo} alt="logo" className='logo-img' />
      </Link>
      <Stack
        direction='row'
        alignItems='flex-end'
        sx={{ gap: { xs: '15px', md: '20px' } }}
        className='nav-items'
      >
        <Link to='/' style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #ff2625' }}>Home</Link>
        {/* <Link to='/exercises/' style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #ff2625' }}>Exercises</Link> */}
        <a href="#exercises" style={{ textDecoration: 'none', color: '#3A1212' }}>Exercises</a>
        {!user.name && !user.pic ?
          <Link to='/login' style={{ textDecoration: 'none', color: '#3A1212', }}>Login</Link> :
          // <Link to='/Login' style={{ textDecoration: 'none', color: '#3A1212', }}>logout</Link>
          <button onClick={onLogout} style={{ padding: ".5rem", color: "#3A1212", border: "none", borderRadius: "5px", cursor: "pointer" }}>logout</button>
        }
      </Stack>
      {user.name && user.pic && <div className="container flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="name">
          <p className='' style={{ fontSize: "1.7rem", paddingRight: ".8rem" }}>{user.name}</p>
        </div>
        <div className="image">
          <Avatar
            alt="img"
            src={user.pic}
            sx={{ width: 45, height: 45 }}
          />
        </div>
      </div>}
    </Stack>
  )
}

export default Navbar