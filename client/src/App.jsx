import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import CollectionJobs from './pages/CollectionJobs'
import Handbook from './pages/Handbook'
import RecruiterLogin from './pages/RecruiterLogin'
import Dashboard from './pages/Recuiter/Dashboard'
import ManageJobs from './pages/Recuiter/ManageJobs'
import ViewApplication from './pages/Recuiter/ViewApplication'
import AddJob from './pages/Recuiter/AddJob'
import AccoutRecuiter from './pages/Recuiter/AccoutRecuiter'
import 'quill/dist/quill.snow.css'
import InfoCompany from './pages/Recuiter/InfoCompany'
import AddCompany from './pages/Recuiter/AddCompany'
import Info from './pages/Info'
import SaveJob from './pages/SaveJob'

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/apply-job/:id' element={<ApplyJob/>}/>
        <Route  path='/collection-jobs' element={<CollectionJobs/>}/>
        <Route  path='/applications' element={<Application/>}/>
        <Route path='/handbook' element={<Handbook/>}/>
        <Route path='/recruiterLogin' element={<RecruiterLogin/>}/>
        <Route path='/info' element={<Info/>}/>
        <Route path='/saved-jobs' element={<SaveJob/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='add-job' element={<AddJob/>}/>
          <Route path='manage-jobs' element={<ManageJobs/>}/>
          <Route path='view-applications' element={<ViewApplication/>}/>
          <Route path='info-account' element={<AccoutRecuiter/>}/>
          <Route path='info-company' element={<InfoCompany/>}/>
          <Route path='add-info-company' element={<AddCompany/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App