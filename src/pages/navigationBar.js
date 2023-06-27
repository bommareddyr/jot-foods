import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../fireBaseConfig';


function NavigationBar() {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const email = user.email;
                const username = email.split('@')[0];
                setUsername(username);
                setIsLoggedIn(true);
            } else {
                setUsername('');
                setIsLoggedIn(false);
                navigate("/Login");
            }
        });

    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/Login");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error catched successfully")
        });
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Joy Of Telugu Cuisine</a>
                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav align-items-center mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Menu">Menu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="AboutUS">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Contact">Contact Us</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="Cart">Cart</a>
                        </li>
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="Login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="SignUp">SignUp</a>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="">{username}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={handleLogout}>SignOut</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );



}

export default NavigationBar;