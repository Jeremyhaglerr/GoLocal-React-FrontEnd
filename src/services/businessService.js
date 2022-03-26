import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/business`


function create(business) {
  console.log(business)
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

  
  
  export {
    create,
    getAll,
    deleteOne,
    update
  }