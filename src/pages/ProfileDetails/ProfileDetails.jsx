import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import ListCard from '../../components/ListCard/ListCard';

const ProfileDetails = (props) => { 
  const ownedBusinesses = props.businesses.filter(business => business.owner._id === props.profile._id)
console.log(props.profile);
  
  return (
    <>
    {props.profile ?
    <>
    <h1>Hello, {props.profile.name}</h1>
    <h4>{props.profile.city}</h4>
    <div className="listcontainer">
    <h5>Lists:</h5>
    {props.profile.lists ? 
    <h2> {props.profile.lists.map (list => (
      <>
        <ListCard key={list._id} list={list}/ >
        <br />
        <button onClick={()=> profileService.deleteList(props.user.profile, list._id)} >X</button>
        </>
      ))}
      </h2>
      : <p></p>
    }
    </div>

    <h2> {ownedBusinesses.map (business => (
        <BusinessCard
          key={business._id}
          business={business}
          user={props.user}
          />
        
      ))}

      </h2>
      </> 

    :
    <h2>loading...</h2>
}
</>
    );
}

export default ProfileDetails;