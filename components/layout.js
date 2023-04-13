import styles from './layout.module.css'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default function Layout({ isAuthenticated, handleLogout, children }) {
  return (
    <div className={styles.app}>
        <Sidebar />
        <div className={styles.main_content}>
            <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            {children}
        </div>
    </div>
  );
}