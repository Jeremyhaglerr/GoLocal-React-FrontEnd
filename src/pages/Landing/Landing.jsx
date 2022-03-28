import BusinessCard from '../../components/BusinessCard/BusinessCard'
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = (props) => {
  return (
    <main className={styles.container}>
      <h1>hello, {props.user ? props.user.name : 'friend'}</h1>
      <h2> {props.businesses.map (business => (
        
        <BusinessCard key={business._id} business={business}
         user={props.user}/>
         
         
        
      ))}

      </h2>
    </main>
  )
}

export default Landing
