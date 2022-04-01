import BusinessCard from '../../components/BusinessCard/BusinessCard'
import styles from './Landing.module.css'

const Landing = (props) => {
  return (
    <div className={styles.container} >
      <h1>All Businesses</h1>
      <div className={styles.bizCard}> {props.businesses?.map (business => ( 
        <div key={business._id} className={styles.card} >
          <BusinessCard business={business}
           user={props.user}
           />
        </div>
        ))}
      </div>
    </div>
    
  )
}

export default Landing
