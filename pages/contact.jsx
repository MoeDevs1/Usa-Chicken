import Image from "next/image";
import axios from "axios";
import { formatPhoneNumber } from 'libphonenumber-js';
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { sendContactForm } from "../lib/api";
import styles from '@/styles/Contact.module.css';



const initValues = { name: "", email: "", subject: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

const Contact = () => {

  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };
  return (
    <div className={styles.newContainer}>
    <div className={styles.tracker}>
    <h1 className={styles.title}>Contact         <Image className={styles.cartImg} src="/img/contact.png" alt="" width="40" height="40"/>
</h1>
    
    <h5 className={styles.sentence}>Have a question or feedback? We'd love to hear from you! Contact us and our friendly team will be happy to assist you with any inquiries or reservations.</h5>
    
      </div>
    <div className={styles.container}>




      <div className={styles.billingInfo}>
      <div className={styles.titleContainer}>
    <h1 className={styles.titleCart}>Contact Form</h1>
  </div>
  <div className={styles.line1}></div> 
      <FormControl className={styles.FormControl} isRequired isInvalid={touched.name && !values.name} mb={5}>
        <FormLabel className={styles.FormLabel}>Name</FormLabel>
        <Input
          type="text"
          name="name"
          className={styles.Input}
          errorBorderColor="red.300"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage className={styles.FormErrorMessage}>Required</FormErrorMessage>
      </FormControl>

      <FormControl  className={styles.FormControl} isRequired isInvalid={touched.email && !values.email} mb={5}>
        <FormLabel className={styles.FormLabel}>Email</FormLabel>
        <Input
          type="email"
          name="email"
          className={styles.Input}
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage className={styles.FormErrorMessage}>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={5}
        isRequired
        isInvalid={touched.subject && !values.subject}
        className={styles.FormControl}

      >
        <FormLabel className={styles.FormLabel}>Subject</FormLabel>
        <Input
          type="text"
          name="subject"
          className={styles.Input}
          errorBorderColor="red.300"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage className={styles.FormErrorMessage}>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={touched.message && !values.message}
        mb={5}
        className={styles.FormControl}
      >
        <FormLabel className={styles.FormLabel}>Message</FormLabel>
        <Textarea
          type="text"
          name="message"
          className={styles.Textarea}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage className={styles.FormErrorMessage}>Required</FormErrorMessage>
      </FormControl>

      <Button
        variant="outline"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={
          !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </Button>

      </div>


      <div className={styles.total}>
      <div className={styles.titleContainer}>
    <h1 className={styles.titleCart}>Contact Information</h1>
      </div>
  <div className={styles.lineTotal}></div> {/* add this div for the line */}



            <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Address: </b>990 Elm St, Manchester, NH
            {/* // .slice(0, 6)}... */}
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Phone: </b>(603) 232-2934
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.phoneText}`}>Email: </b>Usachickennh@gmail.com
          </div>
       
{/*         
          <div className={styles.wholePriceArea}>
          <button className={styles.checkoutButton}>
            Paid
          </button>
          </div> */}
</div>



    </div>
    </div>
  );
};



export default Contact;


//-----------------------------------