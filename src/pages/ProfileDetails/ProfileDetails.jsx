import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import ListCard from '../../components/ListCard/ListCard';
import styles from './ProfileDetails.module.css'

const ProfileDetails = (props) => {
  const [profile, setProfile] = useState()
  const ownedBusinesses = props.businesses.filter(business => business.owner._id === profile?._id)
  

  useEffect(() => {
    profileService.getProfile(props.user?.profile)
      .then(profile => setProfile(profile))
  }, [props.user?.profile])

  return (
    <>
      {profile ?
        <>
        <br />
          <div className={styles.container}>
            <h4 className={styles.title} > Your Lists</h4>
            <div className={styles.listButton} >
            <Link to='/addlist'><button className="btn btn-outline-secondary" >Add New List</button></Link>
            </div>
            {profile.lists ?
              <h2> {profile.lists.map(list => (
                <div className={styles.list} key={list._id}>
                  <ListCard list={list} />
                  <br />
                  <button className='btn btn-outline-secondary'  onClick={() => props.handleDeleteList(props.user.profile, list._id)} >Delete</button>
                </div>
              ))}
              </h2>
              : <p></p>
            }

          </div>
          <div className={styles.container} >
          <h4 className={styles.title} >Your Businesses</h4>
          {ownedBusinesses.map(business => (
            <div key={business._id} className={styles.container} >
            <div className={styles.bizCard}>  
              <div className={styles.card} >
                <BusinessCard key={business._id} business={business}
                  user={props.user}
              />
              </div>
            </div>
          </div>

          ))}
          </div>
        </>

        :
        <h2>loading...</h2>
      }
    </>
  );
}

export default ProfileDetails;