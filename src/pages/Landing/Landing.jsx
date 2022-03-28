import BusinessCard from '../../components/BusinessCard/BusinessCard'
import styles from './Landing.module.css'

const Landing = (props) => {
  return (
    <main className={styles.container}>
      <h1 className={styles.hello}>hello, {props.user ? props.user.name : 'friend'}</h1>
      <h2 className={styles.businessContainer}> {props.businesses.map (business => (
        <div className={styles.businessCont}>
        <BusinessCard
         key={business._id}
         business={business}
         user={props.user}
          />
        </div>
        
      ))}

      </h2>
    </main>
  )
}

export default Landing
