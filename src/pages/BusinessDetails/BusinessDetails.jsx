import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as businessService from '../../services/businessService'

const BusinessDetails = (props) => {
    const [businessDetails, setBusinessDetails] = useState([])
    const location = useLocation()
    const business = location.state.business
  



  

  return (
    <>
      <div>
        <h3>{business.name}</h3>
      </div>
    </>
  );
}
 
export default BusinessDetails;