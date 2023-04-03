import styles from '../styles/userProfile.module.css';
import React from 'react';

const UserProfile = () => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container1}>
        <div className={styles.text}> SETTINGS</div>
        <div className={styles.text}> Profile Information</div>
        <div className={styles.text}> Shipping Information</div>
        <div className={styles.text}> Payment Information</div>
        <div className={styles.text}> Order History</div>
      </div>

      <div className={styles.container2}>
        <div className={styles.inputContainer}>
          <label htmlFor="firstName" className={styles.label}>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="*First Name"
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
