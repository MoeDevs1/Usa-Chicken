import { useState } from 'react';
import styles from "../styles/Address.module.css";
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Address = () => {
  const [isAddressChanged, setIsAddressChanged] = useState(false);
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);


  const handleClick = () => {
    setIsAddressChanged(!isAddressChanged);
    setIsPhoneChanged(!isPhoneChanged);

  };

  const getAddressText = () => {
    if (isAddressChanged) {
      return 'Pickup at: 123 south St, Nashua, NH';
    } else {
      return 'Pickup at: 990 Elm St, Manchester, NH';
    }
  };

  const getPhoneText = () => {
    if (isPhoneChanged) {
      return 'Phone: (603) 888-4444';
    } else {
      return 'Phone: (603) 232-2934';
    }
  };


  return (
    <div className={styles.navbar}>
      {/* <div className={styles.selection}>
        <FaMapMarkerAlt className={styles.icon} />
        <div className={styles.content}>
          <h4 className={styles.label}>{getAddressText()}</h4>
        </div>
      </div> */}

  <div className={styles.selection}>
        <FaMapMarkerAlt className={styles.icon} />
        <div className={styles.content}>
        <a href="https://www.google.com/maps?client=safari&output=search&q=Pickup+at:+990+Elm+St,+Manchester,+NH&entry=mc&sa=X&ved=2ahUKEwjd6IeTkJj_AhXNFlkFHaz3BqEQ0pQJegQIChAB" target="_blank">
          <h4 className={styles.label}>Pickup at: 990 Elm St, Manchester, NH</h4>
          </a>
        </div>
      </div>
      <div className={styles.selection}>
        <FaPhone className={styles.icon} />
        <div className={styles.content}>
          <p className={`${styles.label} ${styles.labelLast}`}>
          <a href="tel:+16032322934" className={styles.phoneNumber}>(603) 232-2934</a>
          </p>
        </div>
      </div>
      {/* <button className={styles.button} onClick={handleClick}>
        {isAddressChanged ? 'Change back' : 'Change'}
        {isPhoneChanged}
      </button> */}
    </div>
  );
};

export default Address;