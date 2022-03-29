import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as businessService from '../../services/businessService'
import { getBusinessDetails } from '../../services/businessService';
import { Link } from 'react-router-dom'

const BusinessDetails = (props) => {
    // const [businessDetails, setBusinessDetails] = useState([])
    const location = useLocation()
    const business = location.state.business

    // useEffect(() => {
    //   getBusinessDetails(business._id)
    //   .then(businessDetails => setBusinessDetails(businessDetails))

    // }, [])
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
          <h6>{review.author}</h6>
        </div>
      )}
      </>
      :
      <p>No reviews yet! Add your own</p>
      }
    </>
    );
  }


export default BusinessDetails;