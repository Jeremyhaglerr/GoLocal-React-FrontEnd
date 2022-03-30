import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import ListCard from '../../components/ListCard/ListCard';

const ProfileDetails = (props) => {
  const [profile, setProfile] = useState(props.profile)
  console.log(profile);
  const ownedBusinesses = props.businesses.filter(business => business.owner._id === profile?._id)
  

  useEffect(() => {
    profileService.getProfile(props.user?.profile)
      .then(profile => setProfile(profile))
  }, [props.user?.profile])

  return (
    <>
      {profile ?
        <>
          <h1>Hello, {profile.name}</h1>
          <h4>{profile.city}</h4>
          <div className="listcontainer">
            <h5>Lists:</h5>
            {profile.lists ?
              <h2> {profile.lists.map(list => (
                <div key={list._id}>
                  <ListCard list={list} />
                  <br />
                  <button onClick={() => profileService.deleteList(props.user.profile, list._id)} >X</button>
                </div>
              ))}
              </h2>
              : <p></p>
            }

          <Link to='/addlist'>Add List</Link>
          </div>
          {ownedBusinesses.map(business => (
            <BusinessCard
              key={business._id}
              business={business}
              user={props.user}
            />

          ))}
        </>

        :
        <h2>loading...</h2>
      }
    </>
  );
}

export default ProfileDetails;