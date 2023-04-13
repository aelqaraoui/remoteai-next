import styles from './sidebar.module.css'
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        {/* Replace with your logo */}
        <Link href="/" className={styles.logo}><h1>remoteAI.ai</h1></Link>

      </div>
      <div className={styles.menu}>
        {/* Add menu items */}
        <ul>
          <li><Link href="/" className={styles.logo}>Jobs</Link></li>
          {/*<li><a href='https://buy.stripe.com/eVafZqeiUeRf46Y6ot' className='logo'>Post a job</a></li>*/}
        </ul>
      </div>
      <div className={styles.footer}>
        {/* Add your footer content */}
        <p>remoteAI.ai is a personalized feed of remote AI jobs. create a profile to get personalized jobs that get you hired. this site is very much a work in progress. please send suggestions and feedback!</p>
        <Link href='https://twitter.com/amine_elqaraoui'>Twitter</Link> 
        <br/><br/>
      </div>
    </div>
  );
};