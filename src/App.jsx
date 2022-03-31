
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
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
    profileService.getProfile(user?.profile)
    .then(profile => setProfile(profile))
  }, [])

  const handleAddBusiness = newBusinessData => {
    const newBusiness = businessService.create(newBusinessData)
    setBusinesses([...businesses, newBusiness])
    navigate('/')
  }

  const handleAddReview = (newReviewData, business) => {
    businessService.createReview(newReviewData, business)
    businessService.getAll()
    .then(allBusinesses => setBusinesses(allBusinesses))
    window.location.reload(false)
  }

  const handleDeleteReview = (reviewId, businessId) => {
    businessService.deleteReview(reviewId, businessId)
    businessService.getAll()
    .then(allBusinesses => setBusinesses(allBusinesses))
    window.location.reload(false)
  }

  const handleEditBusiness = updatedBusinessData => {
    businessService.update(updatedBusinessData)
    .then(updatedBusiness => {
      const newBusinessArray = businesses.map(business => business._id === updatedBusiness._id ? updatedBusiness : business)
      setBusinesses(newBusinessArray)
      navigate('/')
    })

  }

  const handleDeleteBusiness = id => {
    businessService.deleteOne(id)
    .then(deletedBusiness => setBusinesses(businesses.filter(business => business._id !== deletedBusiness._id)))
    navigate('/')
  }

  const handleCreateList = (profile, listFormData) => {
    profileService.createList(profile, listFormData)
    profileService.getProfile(profile)
    .then(updatedProfile => {
      setProfile(updatedProfile)
    })
    navigate('/profile')
  }

  const handleDeleteList = (profile, listId) => {
    profileService.deleteList(profile, listId)
    profileService.getProfile(profile)
    .then(updatedProfile => {
      setProfile(updatedProfile)
    })
    window.location.reload(false)
  }

  const handleAddToList = (profile, list, updatedList) => {
    profileService.addToList(profile, list, updatedList)
    profileService.getProfile(profile)
    .then(updatedProfile => {
      setProfile(updatedProfile)
    })
    window.location.reload(false)
  }
  
  const handleRemoveFromList = (profile, list, business) => {
    profileService.removeFromList(profile, list, business )
    profileService.getProfile(profile)
    .then(updatedProfile => {
      setProfile(updatedProfile)
    })
    window.location.reload(false)
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
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
        
        <Route
          path="/create"
          element={user ? <CreateBusiness  handleAddBusiness={handleAddBusiness}  /> : <Navigate to="/login" />}
          />

          <Route 
          path="/editBusiness"
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
              user ? <BusinessDetails  handleAddReview={handleAddReview} handleDeleteReview={handleDeleteReview} handleDeleteBusiness={handleDeleteBusiness} businesses={businesses} user={user} /> : <Navigate to='/login' />} />

          <Route
          path='/business-details'
          element={
            user ? <BusinessDetails handleDeleteReview={handleDeleteReview} user={user} /> : <Navigate to='/login' />}
          />

          <Route 
            path='/profile'
            element={
              user ? <ProfileDetails handleDeleteList={handleDeleteList} businesses={businesses} user={user} profile={profile} /> : <Navigate to='/login' />}
          />

          <Route
          path='/addList'
          element={
            user ? <CreateList businesses={businesses} handleCreateList={handleCreateList}  user={user} /> : <Navigate to='/login' />}
          />

          <Route
          path='/listDetails'
          element={
            user ? <ListDetails handleAddToList={handleAddToList} handleRemoveFromList={handleRemoveFromList} businesses={businesses} user={user} profile={profile} /> : <Navigate to='/login' />}
          />

      </Routes>
    </>
  )
}

export default App
