import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
            <span className={styles.logoText}>Student Manager</span>
          </div>
        </Link>
        
        <div className={styles.navLinks}>
          <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
          {currentUser ? (
            <>
              <Link to="/add-student" className={styles.navLink}>Add Student</Link>
              <div className={styles.userMenu}>
                <div className={styles.userInfo}>
                  <span className={styles.userEmail}>{currentUser.email}</span>
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className={styles.loginButton}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;