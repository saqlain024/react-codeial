import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import { fetchUserProfile } from '../api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const auth = useAuth();

  console.log('userId', userId);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return <Navigate to="/" />;
      }

      setLoading(false);
    };

    getUser();
  }, [userId, Navigate, addToast]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    if (auth.user && auth.user.friends) {
      const friends = auth.user.friends;

      const friendIds = friends.map((friend) => friend.to_user._id);
      const index = friendIds.indexOf(userId);

      if (index !== -1) {
        return true;
      }
    }

    return false;
  };

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
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
