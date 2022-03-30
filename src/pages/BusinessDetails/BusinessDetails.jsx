import userEvent from '@testing-library/user-event';
import { useState, useRef, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import * as businessService from "../../services/businessService"

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
      <h3>Business Details</h3>
      <img alt={business.name} src={business.photo}/>
      <h2>{business.name}</h2>
      <h3> 📍 {business.address}</h3>
      <h3> 🔗 {business.url}</h3>
      <h3> 📞 {business.phoneNum}</h3>
      <h3> 📅 {business.hours}</h3>
      <h3> Added by: {business.owner.name}</h3>
      {business.owner._id===props.user.profile ? 
      <>
        <Link to='/editBusiness' state={{business}} >
        <button className="btn btn-sm btn-danger m-left" >
          Edit
        </button>
        </Link>
        <button className="btn btn-sm btn-danger m-left" onClick={()=>props.handleDeleteBusiness(business._id)}>
          Delete
        </button>
      </>
      :
      <></>
      }

      <h3>Reviews:</h3>
      {business.reviews.length ?
      <>
      {business.reviews.map(review =>
        <div key={review.name}>
          <h4>{review.name}</h4>
          <h5>{review.rating}</h5>
          <h5>{review.review}</h5>
          {/* <h6>{review.author}</h6> */}
          <button
              className="btn btn-sm btn-danger m-left"
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
      <>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
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
      {/* <div className="form-group mb-3">
        <label htmlFor="rating-input" className="form-label"></label>
      <div id="full-stars-example-two">
    <div class="rating-group">
        <input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio">
        <label aria-label="1 star" class="rating__label" for="rating3-1"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-1" value="1" type="radio">
        <label aria-label="2 stars" class="rating__label" for="rating3-2"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-2" value="2" type="radio">
        <label aria-label="3 stars" class="rating__label" for="rating3-3"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-3" value="3" type="radio">
        <label aria-label="4 stars" class="rating__label" for="rating3-4"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-4" value="4" type="radio">
        <label aria-label="5 stars" class="rating__label" for="rating3-5"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-5" value="5" type="radio">
        </div>
        <p class="desc" style="font-family: sans-serif; font-size:0.9rem">Full stars<br/>
    Must select a star value</p>
        </div>
        </div> */}
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
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary btn-fluid"
          disabled={!validForm}
        >
          Add Review
        </button>
      </div>
    </form>
    </>
  </>
  )
    }


export default BusinessDetails;