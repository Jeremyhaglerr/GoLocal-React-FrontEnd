import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import BusinessCard from '../../components/BusinessCard/BusinessCard';

const ProfileDetails = (props) => { 
  const [profile, setProfile] = useState([])

  useEffect(()=> {
    profileService.getProfile(props.user.profile)
    .then(profile => setProfile(profile))
  }, [])
console.log(profile);
  const ownedBusinesses = props.businesses.filter(business => business.owner._id === profile._id)
console.log(ownedBusinesses);
  useEffect(()=>{
    
  })
  
  return (
    <>
    <h1>Hello, {profile.name}</h1>
    <h4>{profile.city}</h4>
    <Link to='/changePassword'>Change Password</Link>
    <h2> {ownedBusinesses.map (business => (
        <BusinessCard
          key={business._id}
          business={business}
          user={props.user}
          />
        
      ))}

      </h2>
    </> 
    );
}

export default ProfileDetails;