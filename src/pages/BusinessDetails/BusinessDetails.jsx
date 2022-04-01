import userEvent from '@testing-library/user-event';
import { useState, useRef, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import * as businessService from "../../services/businessService"
import styles from './BusinessDetails.module.css'

const BusinessDetails = (props) => {
    // const [businessDetails, setBusinessDetails] = useState([])
    const location = useLocation()
    const business = location.state?.business
    console.log(business);

    // function CreateReview (props) {
      const formElement = useRef()
      const [validForm, setValidForm] = useState(false)
      const [formData, setFormData] = useState({
        name: '',
        rating: '',
        review: '',
      })

      useEffect(()=> {
        formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
      }, [formData])
    
      const handleChange = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value})
      }
    
      const handleSubmit = evt => {
        evt.preventDefault()
        const reviewFormData = new FormData()
        reviewFormData.append('name', formData.name)
        reviewFormData.append('rating', formData.rating)
        reviewFormData.append('review', formData.review)
        // reviewFormData.append('author', formData.author)
        console.log(reviewFormData);
        props.handleAddReview(reviewFormData, business._id)
      }

    return (
      <>
      
      <img alt={business.name} src={business.photo} className={styles.businessPic}/>
      <div className={styles.bizContainer}>
      <div className={styles.businessInfo}>
      <h3><strong>{business.name}</strong></h3>
      <h3> 📍 {business.address}</h3>
      <h3> 🔗 {business.url}</h3>
      <h3> 📞 {business.phoneNum}</h3>
      <h3> 📅 {business.hours}</h3>
      <h3> Added by: {business.owner.name}</h3>
      </div>
      {business.owner._id===props.user.profile ? 
      <>
        <div className={styles.buttonContainer}>
        <Link to='/editBusiness' state={{business}} >
        <button className="btn btn-sm btn-danger m-left edit-btn" >
          Edit
        </button>
        </Link>
        {/* <span className={styles.deleteBtn}> */}

        <button className="btn btn-sm btn-danger m-left delete-btn" onClick={()=>props.handleDeleteBusiness(business._id)}>
          Delete
        </button>
        {/* </span> */}
        </div>
        </>
        :
          <></>
          
      }
      </div>
      <div className={styles.reviewFormDiv}>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit} className={styles.reviewForm}>
      <div className="form-group mb-3">
        <label htmlFor="name-input" className="form-label">
          Name<span>*</span>
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
        <label htmlFor="rating-input" className="form-label">
          Rating<span>* </span>
        </label>
        <input 
          type="text"
          className="form-control"
          id="rating-input"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="review-input" className="form-label">
          Review
        </label>
        <input 
          type="text"
          className="form-control"
          id="review-input"
          name="review"
          value={formData.review}
          onChange={handleChange}
        />
      </div>
      <div className={styles.deleteReview}>
        <button
          type="submit"
          className={"btn btn-primary btn-fluid"}
          disabled={!validForm}
        >
          Add Review
        </button>
      </div>
    </form>
    </div>
      {business.reviews.length ?
      <>
      {business.reviews.map(review =>
        <div key={review.name} className={styles.reviewList}>
          <h4 className={styles.reviewsTitle}><strong>Reviews:</strong></h4>
          <h4>{review.name}</h4>
          <h4>{review.rating}</h4>
          <h4>{review.review}</h4>
          {/* <h6>{review.author}</h6> */}
          <button
              className={styles.deleteReviewBtn}
              onClick={()=> businessService.deleteReview(review._id, business._id)}
              >
              Delete
            </button>
        </div>
      )}
      
      </>
      :
      <p></p>
    }

    </>
  )
    }


export default BusinessDetails;