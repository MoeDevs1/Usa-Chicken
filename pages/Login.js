
import React from 'react'
import styles from '../styles/Login.module.css';
import Image from 'next/image'
import { useRouter } from 'next/router';
import axios from 'axios';

import { useSession, signIn, signOut } from 'next-auth/react'

const Login = () => {

    const router = useRouter();
    const { data: session } = useSession(); // check if the user is signed in
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
      
        try {
            const response = await axios.post('/api/auth/Login', { email, password });
            console.log(response.data);
        
            if (await response.data.status == 'success') {
            //   await signIn(); // Update the session and authenticate the user
              router.push('/Signup');
              console.log("HERE")
            }
            console.log("HERE1")
          } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
              router.push('/login');
            }
          }
        };
    
    
    


    return (


        <section className={styles.Container}>

            <div className={styles.formLogin}>
                <div className={styles.formContent}>
                    <div className={styles.head}>

                        <Image src="/img/lol.png" alt="" width="222" height="222" />


                        <header>Welcome To Usa Chicken</header>
                    </div>

                    <div className={styles.form}>
                        
                        
                        
                        
                        <div className={styles.inputFeild}>
                            <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className={styles.inputFeild2}>
                            <input type="password" placeholder="Password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>


                        <div className={styles.Container2} >
                            <label>  <input   type="checkbox" className={styles.RemeberPassword}/> Remeber Password</label>
                        <a href="#" className={styles.forgotPasswordLink}> Forgot Password?</a>


                        </div>

                        <div>
                            <button className={styles.loginButton} onClick={handleSignIn}>Log In</button>

                        </div>

                        <div>

                            <button className={styles.signUp}>Sign Up</button>
                        </div>

                        <div className={styles.or}>Or</div>

                        <div>
                            <button className={styles.GoogleButton} onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>Sign up with Google  <Image src="/img/google-logo-9808.png"
                                alt="" width="14" height="14" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;