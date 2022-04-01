import { useState, useRef, useEffect } from "react"
import styles from './CreateBusiness.module.css'

function CreateBusiness (props) {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNum: '',
  })

  useEffect(()=> {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
		const businessFormData = new FormData()
		businessFormData.append('photo', formData.photo)
    businessFormData.append('name', formData.name)
    businessFormData.append('address', formData.address)
    businessFormData.append('url', formData.url)
    businessFormData.append('phoneNum', formData.phoneNum)
    businessFormData.append('hours', formData.hours)
    businessFormData.append('coupon', formData.coupon)
    props.handleAddBusiness(businessFormData)
  }

	const handleChangePhoto = evt => {
		setFormData({...formData, photo: evt.target.files[0]})
	}

	return (
		<>
			<h1 className={styles.title}>Add a business</h1>
			<form autoComplete="off" ref={formElement} onSubmit={handleSubmit} className={styles.createBusinessForm}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
						Business Name<span>* </span>
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
					<label htmlFor="address-input" className="form-label">
            Address<span>* </span>
					</label>
					<input 
						type="text"
						className="form-control"
						id="address-input"
						name="address"
            value={formData.address}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="url-input" className="form-label">
						Website URL
					</label>
					<input 
						type="text"
						className="form-control"
						id="url-input"
						name="url"
            value={formData.url}
            onChange={handleChange}
					/>
				</div>
        <div className="form-group mb-4">
					<label htmlFor="phoneNum-input" className="form-label">
						Phone Number<span>* </span>
					</label>
					<input 
						type="text"
						className="form-control"
						id="phoneNum-input"
						name="phoneNum"
            value={formData.phoneNum}
            onChange={handleChange}
            placeholder='Ex: (123)456-7890'
						required
					/>
				</div>
        <div className="form-group mb-4">
					<label htmlFor="hours-input" className="form-label">
						Hours of Operation
					</label>
					<input 
						type="text"
						className="form-control"
						id="hours-input"
						name="hours"
            value={formData.hours}
            onChange={handleChange}
            placeholder='Ex: Sun: 9:00 - 500, Mon: Closed'
					/>
				</div>
        <div className="form-group mb-4">
					<label htmlFor="coupon-input" className="form-label">
						Coupons/Sale Info
					</label>
					<input 
						type="text"
						className="form-control"
						id="coupon-input"
						name="coupon"
            value={formData.coupon}
            onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="photo-upload" className="form-label">
						Upload Photo
					</label>
					<input
						type="file"
						className="form-control"
						id="photo-upload"
						name="photo"
						onChange={handleChangePhoto}
					/>
				</div>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Add Business
					</button>
          <br />
          <span>* </span> indicates a requried field

				</div>
			</form>
		</>
	)
}

export default CreateBusiness 