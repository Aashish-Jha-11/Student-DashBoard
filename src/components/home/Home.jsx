import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Efficiently Manage <span className={styles.highlight}>Student</span> Information
          </h1>
          <p className={styles.heroSubtitle}>
            A modern dashboard to keep track of your students, their courses, and academic progress.
          </p>
          <div className={styles.ctaButtons}>
            <Link 
              to={currentUser ? "/dashboard" : "/login"} 
              className={styles.primaryButton}
            >
              {currentUser ? "Go to Dashboard" : "Get Started"}
            </Link>
            {!currentUser && (
              <Link to="/login" className={styles.secondaryButton}>
                Sign In
              </Link>
            )}
          </div>
        </div>
        <div className={styles.heroImage}>
          <img 
            src="https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Students collaborating" 
          />
        </div>
      </div>
      
      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👨‍👩‍👧‍👦</div>
            <h3 className={styles.featureTitle}>Student Management</h3>
            <p className={styles.featureDescription}>
              View and manage all student information in one centralized location.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3 className={styles.featureTitle}>Advanced Filtering</h3>
            <p className={styles.featureDescription}>
              Quickly find students by course, name, or other criteria.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>Secure Access</h3>
            <p className={styles.featureDescription}>
              Firebase authentication ensures only authorized users can access sensitive information.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3 className={styles.featureTitle}>Responsive Design</h3>
            <p className={styles.featureDescription}>
              Access the dashboard from any device - desktop, tablet, or mobile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;