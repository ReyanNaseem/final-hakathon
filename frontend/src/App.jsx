import './App.css'
import Login from '../src/pages/Login.jsx'
import Signup from '../src/pages/Signup.jsx'
import 'remixicon/fonts/remixicon.css'
import { Route, Routes } from 'react-router-dom'
import OtpInput from './pages/OtpInput.jsx'
// import { Home } from './pages/Home.jsx'
import AuthGuard from './routes/AuthGuard.jsx'
import { IsLogin } from './routes/IsLogin.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Home from './pages/Home.jsx'
import Reports from './pages/Reports.jsx'
import Vitals from './pages/Vitals.jsx'
import UploadReport from './pages/UploadReport.jsx'
import DashboardPage from './components/DashboardLayout.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {

  return (
    <>
    <Routes>
      {/* Auth Routes */}
      <Route element={<IsLogin/>}>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<OtpInput/>}/>
      </Route>

      {/* Secure Routes */}
      <Route element={<AuthGuard/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadReport />} />
        <Route path="/vitals" element={<Vitals />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      
      {/* Not found Routes */}
      <Route path='*' element={<PageNotFound/>}/>

    </Routes>
    </>
  )
}

export default App