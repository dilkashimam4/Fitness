import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import './App.css';
import Home from './pages/Home'
import ExerciseDetail from './pages/ExerciseDetail'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const [user, setUser] = useState({ name: "", pic: "" })
  const [exercises, setExercises] = useState([])
  useEffect(() => {
    async function onCall() {
      try {
        // TODO:update login url
        const res = await fetch("http://localhost:8000/login/api/success", {
          method: "GET",
          credentials: "include",
          "Access-Control-Allow-Origin": "*"
        })
        const result = await res.json()
        console.log({ result })
        localStorage.setItem("name", result.name)
        localStorage.setItem("pic", result.pic)
        setUser(pre => {
          return {
            ...pre,
            name: result.name,
            pic: result.pic
          }
        })
      } catch (err) {
        console.log(err)
        localStorage.clear()
      }
    }
    onCall()
  }, [])
  return (
    <Router>
      <Box width='400px' sx={{ width: { xl: '1488px' } }} m='auto'>
        <Navbar user={user} />
        <Routes>
          {
            user.name && user.pic ? (
              <>
                <Route path='/' exact  element={<Home  setExercises={setExercises} exercises={exercises}/>} />
                <Route path='/exercises/:id' exact  element={<ExerciseDetail exercises={exercises} />} />
                <Route path='/*' element={<Navigate to={"/"} replace />} />
              </>
             ) :
              (
                <>
                  <Route path='/login' exact element={<Login />} />
                  <Route path='*' element={<Navigate to={"/login"} replace />} />
                </>
              )
            }:
        </Routes>
        <Footer />
      </Box>
    </Router>
  )
}

export default App