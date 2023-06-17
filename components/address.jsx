import { useEffect, useState } from 'react';
import styles from "../styles/Address.module.css";
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import axios from 'axios';


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


  const [storeStatus, setStoreStatus] = useState(0);



useEffect(() => {
const fetchStoreStatus = async () => {
  try {
    const response = await axios.get("/api/stores");
    const stores = response.data;
    if (stores.length > 0) {
      const { status } = stores[0]; // Assuming the status is stored in the first store
      if (status === 1) {
        setStoreStatus(1);
      } else {
        setStoreStatus(0);
      }
    }
  } catch (error) {
    // Handle network or other errors
  }
};

fetchStoreStatus();
}, []);

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
      
      <div className={styles.status}>
      {storeStatus === 1 ? (
        <h5 className={styles.statusWord}>Open</h5>
      ): (
        <h5 className={styles.statusWord}>Closed</h5>
      )}
      
      
      </div>
    </div>
  );
};

export default Address;