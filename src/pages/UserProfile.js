import { useLocation } from 'react-router-dom';

import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const location = useLocation();
  console.log('location', location);
  const { user = {} } = location.state;

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.saveBtn}`}>Add friend</button>

        <button className={`button ${styles.saveBtn}`}>Remove friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
