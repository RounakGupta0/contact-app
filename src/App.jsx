// import './App.css'
// import Contact from './Contact'
// import Header from './Header'

// const App = () => {
//   return (
//     <>
//     <Header/>
//     <Contact/>
//     </>
//   )
// }

// export default App

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './Contact'
import './App.css'
import Header from './Header'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <Header/>
            <Contact/>
          </>
        }/>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App