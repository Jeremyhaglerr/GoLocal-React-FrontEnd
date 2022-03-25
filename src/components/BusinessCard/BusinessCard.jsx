// import { Link } from 'react-router-dom'

function BusinessCard(props) {
  console.log()
    return(
    <div className="card">
  
      <div className="card-body">
        <h2 className="card-text">Business Name{props.business.name}</h2>
        <p className="card-text">Located at {props.business.address}</p>
        <p className="card-text">Website {props.business.url}</p>
        <p className="card-text">PhoneNumber {props.business.phoneNum}</p> 
        <p className="card-text">Hours {props.business.hours}</p> 
        <p className="card-text">Created by: {props.business.owner.name}</p> 
        

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
      
    </div>
  )
}

export default BusinessCard