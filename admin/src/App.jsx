import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Admin from './pages/Admin/Admin'


const App = () => {

  const url = "http://localhost:4000"

  return (
    <div>
      <ToastContainer />
      <hr />
      <div className="app-content">
          <Routes>
            <Route path="/" element={<Admin url={url} />} />
          </Routes>
      </div>
    </div>
  )
}

export default App;
