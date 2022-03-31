import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import BusinessCard from "../../components/BusinessCard/BusinessCard"
import styles from './ListDetails.module.css'

const ListDetails = (props) => {
  const location = useLocation()
  const [currentList, setCurrentList] = useState(location.state?.list)
  const navigate = useNavigate()
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: currentList.name,
    description: currentList.description,
    business: '',
    id: currentList._id
  })

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  useEffect(() => {
    profileService.getProfile(props.user.profile)
    .then(updatedProfile => {
      updatedProfile.lists.forEach(list => {
        if (list._id === currentList._id ) {
        setCurrentList(list)
        }
      })
    })
  },[])

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    const listFormData = new FormData()
    listFormData.append('business', formData.business)
    listFormData.append('name', currentList.name)
    listFormData.append('description', currentList.description)
    listFormData.append("id", currentList._id)
    props.handleAddToList(props.user.profile, currentList, listFormData)
  }



  return (
    <>
      <div className={styles.header} >
        <h1 className={styles.listName}>{currentList.name}</h1>
        <h4 className={styles.title} >{currentList.description}</h4>
      </div>
      <form className={styles.form} autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="business-select">Add a business</label>
          <select className="form-control" value={formData.business} name="business" id="business-select" onChange={handleChange} required>
            <option value=""></option>
            {props.businesses.map((business) => (
              <option key={business._id} value={business._id} >{business.name}</option>
            ))}
          </select>
          <div className={styles.button} >
            <button
              type="submit"
              className="btn btn-outline-primary btn-fluid"
              disabled={!validForm}
            >
              Update List
            </button>
          </div>
        </div>
      </form>
      {currentList.businesses.length ? 
      <div className={styles.businessList} >
      {currentList.businesses.map(business => (
        <div className={styles.card} key={business._id}>
          <BusinessCard business={business} user={props.user} />
          <div className={styles.button} >
            <button type='submit' className="btn btn-outline-secondary" onClick={() => props.handleRemoveFromList(props.user.profile, currentList, business)} >Remove From List</button>
          </div>
        </div>
      ))}
      </div>
      :
        <></>
      }
    </>);
}

export default ListDetails;