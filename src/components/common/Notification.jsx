import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Notification.module.css';

const Notification = () => {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (!notification || !visible) return null;

  return (
    <div className={`${styles.notification} ${styles[notification.type]}`}>
      <div className={styles.notificationContent}>
        {notification.message}
      </div>
      <button 
        className={styles.closeButton}
        onClick={() => setVisible(false)}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;