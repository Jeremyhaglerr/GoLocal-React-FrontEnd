import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import styles from './CreateList.module.css'

function CreateList (props) {
  const navigate = useNavigate()
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
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
    listFormData.append('name', formData.name)
    listFormData.append('description', formData.description)
    props.handleCreateList(props.user.profile, listFormData)
    navigate('/profile')
  }

	return (
		<>
			<h1 className={styles.createListHeader}>Create A List</h1>
			<form autoComplete="off" ref={formElement} onSubmit={handleSubmit} className={styles.createListForm}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
						List Name<span>* </span>
					</label>
					<input 
						type="text"
						className="form-control"
						id="name-input"
						name="name"
            value={formData.name}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="description-input" className="form-label">
            Description
					</label>
					<input 
						type="text"
						className="form-control"
						id="description-input"
						name="description"
            value={formData.description}
            onChange={handleChange}
					/>
				</div>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Create List
					</button>
          <br />
          <span>* </span> indicates a requried field

				</div>
			</form>
		</>
	)
}

export default CreateList 