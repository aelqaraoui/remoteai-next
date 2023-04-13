import styles from './navbar.module.css';
import Link from 'next/link';

export default function Navbar(props) {

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_container}>
                { props.isAuthenticated ? (
                <ul className={styles.nav_links}>
                    {/*<li>
                    <Link href="/profile" className={styles.nav_link}>Profile</Link>
                    </li>*/}
                    <li>
                    <button className={styles.nav_link} onClick={props.handleLogout} >Logout</button>
                    </li>
                </ul>
                ) : (
                <ul className={styles.nav_links}>
                    <li>
                    <Link href="/login" className={styles.nav_link}>Login</Link>
                    </li>
                    <li>
                    <Link href="/register" className={styles.nav_link}>Register</Link>
                    </li>
                </ul>
                )}
                
            </div>
        </nav>
    );
};
