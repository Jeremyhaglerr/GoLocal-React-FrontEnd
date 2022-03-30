import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

function getProfile(id) {
  return fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  .then(res => res.json())
}

function createList(id, list) {
  return fetch(`${BASE_URL}/${id}`, { 
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: list
  })
  .then(res => res.json())
}

function deleteList(id, list) {
  console.log(list);
  return fetch(`${BASE_URL}/${id}/${list}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
  })
  .then(res => res.json())
}

function addToList(id, list, updatedList) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
    body: updatedList

  })
  .then(res => res.json())
}

function removeFromList(id, list, business) {
  const data = {list, business}
  return fetch(`${BASE_URL}/${id}/remove`, {
    method: "PUT",
    headers: { 
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'content-type': 'application/json' 
    },
  body: JSON.stringify(data)


  })
  .then(res => res.json())
}

export { getAllProfiles,getProfile, createList, addToList, deleteList, removeFromList }
