import React, {useState} from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '../fireBaseConfig';
import { GoogleAuthProvider } from "firebase/auth";
import '../CSS/style.css';
import '../CSS/index.css';
import '../CSS/menu_style.css';
import '../CSS/create-new.css';


 
const SignUp = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/Login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }

    // Configure Google Sign-In
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
    // Enable email linking
    emailLinkSignInEnabled: true
    });

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
      };

    useEffect(() => {
        document.body.classList.add('no-padding-bottom');
    
        return () => {
          document.body.classList.remove('no-padding-bottom');
        };
      }, []);

  return (
    <div class = "createNew">
    <div className="container-createnew">
        <div className="row">
            <div className="col-lg-7 col-md-12 d-flex align-items-center">
                <div className="text text-center">
                    <div className="quotes-telugu">
                        {/* <h3>ఆహార సంస్కృతి అనుభవాలు, వారసత్వాలను సృష్టించడానికి ప్రయత్నం</h3> */}
                        <h3>Effort To Create Best Experiences, Legacies Of Food Culture</h3>
                    </div>
                    {/* <h2>Bon Appétit, నీ భోజనాన్ని ఆస్వాదించు, ప్రేమించు!!</h2> */}
                </div>
            </div>
            <div className="col-lg-5 col-md-10 col-sm-12">
                <div className="form-container px-5 py-4">
                    <h3 className="item text-center">JOT FOODS | SIGNUP</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email-address"></label>
                            <input type="email" label = "Email Address" className="form-control" value = {email}
                            id="email-address" placeholder="Email Address" 
                            required onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <input type="password" label = "Create Password" value = {password}
                            className="form-control" id="password" placeholder="Password"
                            required onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <button type="submit"
                            className="btn btn-primary form-control create-button"
                            onClick={onSubmit}>
                                Sign Up
                            </button>
                        </div>
                        <p className="text-sm text-black text-center">
                            Already have an account? {' '}
                            <NavLink to="/Login">
                                Sign In
                            </NavLink>
                        </p>

                        <hr></hr>

                        <div className="form-group">
                            <button type="submit"
                                className="btn form-control btn-google"
                                onClick={handleGoogleLogin}>
                                {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google G Logo" /> */}
                                CONTINUE WITH GOOGLE
                            </button>
                        </div>

                        <div className="form-group">
                            <button type="submit"
                                className="btn form-control btn-google"
                                onClick={handleGoogleLogin}>
                                {/* <img src="" alt="Google G Logo" /> */}
                                CONTINUE WITH GITHUB
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    
  );
}

export default SignUp;
