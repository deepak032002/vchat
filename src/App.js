// import React, { useState } from 'react'
// // import VideoDashboard from './components/Dashboard/VideoDashboard'
// import LandingPage from './components/LandingPage/LandingPage'
// import LoginSignup from './components/LoginSignup/LoginSignup'
// import VideoDashboard from './components/Dashboard/VideoDashboard'
// import { Route, Routes } from 'react-router-dom'
// import Alert from './components/Alert'
// import Loader from './components/Loader/Loader'
// import VerifyEmail from './components/VerifyEmail'
// import Room from './components/Room/Room'
// import './App.css'

// const App = () => {
//   const [alert, setAlert] = useState({
//     msg: "",
//     type: "",
//   });

//   const [progress, setProgress] = useState(0)

//   const showAlert = (message, type) => {
//     setAlert({
//       msg: message,
//       type: type,
//       show: true,
//     })

//     setTimeout(() => {
//       setAlert({
//         msg: message,
//         type: type,
//         show: false,
//       });
//     }, 4000);


//   }
//   return (
//     <>
//       <Alert alert={alert} />
//       <Loader progress={progress} setProgress={setProgress} />
//       <Routes>
//         <Route path="/" exact element={<LandingPage />} />
//         <Route path="/loginsingup" exact element={<LoginSignup showAlert={showAlert} setProgress={setProgress} />} />
//         <Route path="/dashboard" exact element={<VideoDashboard setProgress={setProgress} />} />
//         <Route path="/verifyEmail/:email" exact element={<VerifyEmail showAlert={showAlert} setProgress={setProgress} />} />
//         <Route path="/room/:roomId" exact element={<Room />} />
//         <Route path="*" element={<><h1>404 page <br /> Link not found</h1></>} />
//       </Routes>
//     </>
//   )
// }

// export default App


import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App