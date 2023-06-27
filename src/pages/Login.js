import React, {useState} from 'react';
import { useEffect } from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '../fireBaseConfig';
import { GoogleAuthProvider } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom';
import '../CSS/style.css';
import '../CSS/index.css';
import '../CSS/menu_style.css';
import '../CSS/create-new.css';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
            // onLoginSuccess(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
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
    <div className ="createNew">
    <div className="container-createnew">
        <div className="row">
            <div className="col-lg-7 col-md-12 d-flex align-items-center">
                <div className="text text-center">
                    <div className="quotes-telugu">
                        <h3>ఆకలితో వున్న వాని మాటలకు ఆగ్రహించవద్దు ! "గౌతమ బుద్దుడు"</h3>
                        <h3>Don't be offended by the words of a hungry person! "Gautama Buddha"</h3><br/>
                    </div>
                    {/* <h2>Bon Appétit, నీ భోజనాన్ని ఆస్వాదించు, ప్రేమించు!!</h2> */}
                </div>
            </div>
            <div className="col-lg-5 col-md-10 col-sm-12">
                <div className="form-container px-5 py-4">
                    <h2 className="item text-center">JOT FOODS | LOGIN</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email-address"></label>
                            <input type="email" className="form-control" id="email-address" placeholder="Email Address" required onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <input type="password" className="form-control" id="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <button type="submit"
                            className="btn btn-primary form-control create-button"
                            onClick={onLogin}>
                                Login
                            </button>
                        </div>

                        <p className="text-sm text-black text-center">
                            No account yet? {' '}
                            <NavLink to="/SignUp">
                                Sign up
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

export default Login;
