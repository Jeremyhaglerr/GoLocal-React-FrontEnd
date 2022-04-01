import BusinessCard from '../../components/BusinessCard/BusinessCard'
import styles from './Landing.module.css'

const Landing = (props) => {
  return (
    <main className={styles.container}>
      <h1>All Businesses</h1>
      <h2 className={styles.bizCard}> {props.businesses?.map (business => ( 
        <BusinessCard key={business._id} business={business}
         user={props.user}
         />
        ))}
      </h2>
    </main>
  )
}

export default Landing
