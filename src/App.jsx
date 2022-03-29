
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as businessService from './services/businessService'
import * as profileService from './services/profileService'
import CreateBusiness from './pages/CreateBusiness/CreateBusiness'
import EditBusiness from './pages/EditBusiness/EditBusiness'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import BusinessDetails from './pages/BusinessDetails/BusinessDetails'
import CreateList from './pages/CreateList/CreateList'
import ListDetails from './pages/ListDetails/ListDetails'


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [businesses, setBusinesses]= useState([])
  const [profile, setProfile] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    if(user) {
      businessService.getAll()
      .then(allBusinesses => setBusinesses(allBusinesses))
    }
  }, [user])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(()=> {
    if(user) {
      businessService.getAll()
      .then(allBusinesses => setBusinesses(allBusinesses))
    }
  }, [user])

  useEffect(()=> {
    profileService.getProfile(user.profile)
    .then(profile => setProfile(profile))
  }, [])

  const handleAddBusiness = async newBusinessData => {
    const newBusiness = await businessService.create(newBusinessData)
    setBusinesses([...businesses, newBusiness])
    navigate('/')
  }

  const handleEditBusiness = updatedBusinessData => {
    businessService.update(updatedBusinessData)
    .then(updatedBusiness => {
      const newBusinessArray = businesses.map(business => business._id === updatedBusiness._id ? updatedBusiness : business)
      setBusinesses(newBusinessArray)
    })
  }

  const handleDeleteBusiness = id => {
    businessService.deleteOne(id)
    .then(deletedBusiness => setBusinesses(businesses.filter(business => business._id !== deletedBusiness._id)))
  }

  const handleAddToList = (profile, list, updatedList) => {
    profileService.addToList(profile, list, updatedList)
    .then(updatedProfile => {
      setProfile(updatedProfile)
    })
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        {/* <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
        
        <Route
          path="/create"
          element={user ? <CreateBusiness  handleAddBusiness={handleAddBusiness}  /> : <Navigate to="/login" />}
          />

          <Route 
          path="/edit"
          element={
            user ? <EditBusiness  handleEditBusiness={handleEditBusiness}  /> : <Navigate to="/login" />}
          />
  
          <Route
            path='/'
            element={
              user ? <Landing handleDeleteBusiness={handleDeleteBusiness} businesses={businesses} user={user} /> : <Navigate to='/login' />}
          />

          <Route
            path='/business-details'
            element={
              user ? <BusinessDetails handleDeleteBusiness={handleDeleteBusiness} businesses={businesses} user={user} /> : <Navigate to='/login' />} />

          <Route 
            path='/profile'
            element={
              user ? <ProfileDetails businesses={businesses} user={user} profile={profile} /> : <Navigate to='/login' />}
          />

          <Route
          path='/addList'
          element={
            user ? <CreateList businesses={businesses} user={user} /> : <Navigate to='/login' />}
          />

          <Route
          path='/listDetails'
          element={
            user ? <ListDetails handleAddToList={handleAddToList} businesses={businesses} user={user} profile={profile} /> : <Navigate to='/login' />}
          />

      </Routes>
    </>
  )
}

export default App
