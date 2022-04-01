import { Link } from 'react-router-dom'
import styles from './BusinessCard.module.css'

function BusinessCard({ business }) {
  return (
    <div className="card">
      <img className='card-img-top' alt={business.name} src={business.photo} />
      <div className="card-body">
        <Link key={business._id} state={{ business }} to='/business-details' >
          <h2 className="card-text">{business.name}</h2>
        </Link>
        <p className="card-text"> 📍 {business.address}</p>
        <p className="card-text"> 🔗 {business.url}</p>
        <p className="card-text">Added by {business.owner.name}</p>
      </div>
    </div>
  )
}

export default BusinessCard