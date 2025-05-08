import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchStudentById } from '../../services/mockApi';
import { useAuth } from '../../context/AuthContext';
import styles from './StudentDetails.module.css';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // agr not authenticated to redirect to login
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: `/student/${id}` } } });
    }
  }, [currentUser, navigate, id]);

  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchStudentById(parseInt(id));
        setStudent(data);
      } catch (err) {
        setError('Failed to load student details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      getStudentDetails();
    }
  }, [id, currentUser]);

  if (!currentUser) return null;

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading student details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <Link to="/dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!student) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Student Not Found</h2>
        <p>The student you're looking for doesn't exist or has been removed.</p>
        <Link to="/dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsHeader}>
        <Link to="/dashboard" className={styles.backButton}>
          ← Back to Dashboard
        </Link>
      </div>
      
      <div className={styles.studentProfile}>
        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            <img src={student.avatar} alt={student.name} />
          </div>
          
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{student.name}</h1>
            <p className={styles.profileEmail}>{student.email}</p>
            <div className={styles.profileBadges}>
              <span className={styles.courseBadge}>{student.course}</span>
              <span className={`${styles.gradeBadge} ${styles[`grade${student.grade.charAt(0)}`]}`}>
                Grade: {student.grade}
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles.profileDetails}>
          <div className={styles.detailsCard}>
            <h3 className={styles.detailsTitle}>Academic Information</h3>
            <div className={styles.detailsRow}>
              <div className={styles.detailsLabel}>Enrollment Date:</div>
              <div className={styles.detailsValue}>{student.enrollmentDate}</div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsLabel}>Course:</div>
              <div className={styles.detailsValue}>{student.course}</div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsLabel}>Current Grade:</div>
              <div className={styles.detailsValue}>{student.grade}</div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsLabel}>Student ID:</div>
              <div className={styles.detailsValue}>{student.id}</div>
            </div>
          </div>
          
          <div className={styles.detailsCard}>
            <h3 className={styles.detailsTitle}>Contact Information</h3>
            <div className={styles.detailsRow}>
              <div className={styles.detailsLabel}>Email:</div>
              <div className={styles.detailsValue}>{student.email}</div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsLabel}>Phone:</div>
              <div className={styles.detailsValue}>+1 (555) 123-4567</div>
            </div>
            <div className={styles.detailsRow}>
              <div className={styles.detailsLabel}>Address:</div>
              <div className={styles.detailsValue}>123 Campus Drive, University City</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;