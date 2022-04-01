import BusinessDetails from '../pages/BusinessDetails/BusinessDetails'
import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/business`


function create(business) {
  return fetch(BASE_URL, { 
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: business
  })
  .then(res => res.json())
}

function getAll() {
  return fetch(BASE_URL, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
}

function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  })
  .then(res => res.json())
}
  
function update(business) {
  return fetch(`${BASE_URL}/${business.get('_id')}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: business
  })
  .then(res => res.json())
}

function getBusinessDetails(id) {
  return fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  .then(res => res.json())
}

function createReview(review, business) {
  return fetch(`${BASE_URL}/${business}/reviews`, { 
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: review
  })
  .then(res => res.json())
}

function deleteReview(reviewId, businessId) {
  return fetch(`${BASE_URL}/${businessId}/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  })
  .then(res => res.json())
}
  
  export {
    create,
    getAll,
    deleteOne,
    update,
    getBusinessDetails,
    deleteReview,
    createReview
  }