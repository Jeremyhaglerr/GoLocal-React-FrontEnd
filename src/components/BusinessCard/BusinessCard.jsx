import { Link } from 'react-router-dom'

function BusinessCard({business}) {
  console.log()
    return(
      <>
   <Link key={business._id} state={{business}}  to='/business-details' >
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{props.business.name}</h2>
        <p className="card-text"> 📍 {props.business.address}</p>
        <p className="card-text"> 🔗 {props.business.url}</p>
        <p className="card-text"> 📞 {props.business.phoneNum}</p> 
        <p className="card-text"> 📅 {props.business.hours}</p> 
        <p className="card-text">Added by {props.business.owner.name}</p> 
      </div>
     </div>
    </Link>    

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