import { Link } from 'react-router-dom'
import styles from './BusinessCard.module.css'

function BusinessCard({business}) {
  console.log()
    return(
      <>
    <div className="card">
        <img className={styles.cardImg} alt={business.name} src={business.photo}/>
      <div className="card-body">
      <Link key={business._id} state={{business}}  to='/business-details' >
        <h2 className="card-text">{business.name}</h2>
      </Link>  
        <p className="card-text"> 📍 {business.address}</p>
        <p className="card-text"> 🔗 {business.url}</p>
        <p className="card-text">Added by {business.owner.name}</p> 
      </div>
     </div>  

      {/* {
        user.profile === business.owner?._id ?
        <div className="card-footer">
        {/* <Link
        className='btn btn-sm btn-warning'
        to='/edit'
        state={{business}}
      > */}
              {/* Edit
            </Link>
            <button
            className="btn btn-sm btn-danger m-left"
            onClick={()=> handleDeletebusiness(business._id)}
            >
            Delete
            </button>
          </div> */}
        
        {/* <div className="card-body">
          <p className="card-text">- {business.owner?.name ? business.owner?.name : 'Some person'}'s pup</p>
        </div> */}
      
        </>
  )
}

export default BusinessCard