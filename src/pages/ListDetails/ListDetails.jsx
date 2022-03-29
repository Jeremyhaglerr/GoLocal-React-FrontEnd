import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import * as profileService from '../../services/profileService'

const ListDetails = (props) => {
  const location = useLocation()
  const list = location.state.list
  const navigate = useNavigate()
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: list.name,
    description: list.description,
    business: '',
    id: list._id
  })

  useEffect(()=> {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
		const listFormData = new FormData()
    listFormData.append('business', formData.business)
    listFormData.append('name', list.name)
    listFormData.append('description', list.description)
    listFormData.append('id', list._id)
    profileService.addToList(props.user.profile, list,  listFormData)
    // navigate('/profile')
  }



  return ( 
  <>
  <h1>{list.name}</h1>
  <h2>{list.description}</h2>
  {list.businesses.map(business => (
    <>
    <p>{business._id}</p>
    <button>X</button>
    </>
  ))}
  <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
        <label htmlFor="business-select">Add a business:</label>
        <select className="form-control" value={formData.business} name="business" id="business-select" onChange={handleChange}>
        <option  value='none'>Choose a business</option>
            {props.businesses.map((business)=>(
            <option key={business._id} value={business._id} >{business.name}</option>
            ))}
        </select>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Update List
					</button>
				</div>
        </div>
			</form>
  {/* <label for="business-select">Add a business:</label>

<select name="pets" id="business-select">
    <option value="">--Please choose an option--</option>
    {props.businesses.map((business)=>(
      <option value={business.name} >{business.name}</option>
    ))}
</select>
<button onClick={}>Add</button> */}
  </> );
}
 
export default ListDetails;