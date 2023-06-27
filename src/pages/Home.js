import React, {  } from 'react';
import mainImage from '../Images/pexels-evie-shaffer-3825880.jpg'
import '../CSS/style.css';
import '../CSS/index.css';
import TypedEffect from "./TypedEffect";


function Home() {

    return (
        <>
            <div className="container-fluid py-5 first-one">
                <div className="row">
                    <div className="col-md-6 image-className">
                        <div className="flashcard">
                            <img src={mainImage} alt="Left Flashcard Image" className="welcome-image" />
                        </div>
                    </div>
                    <div className="col-md-6 text-center welcome-header-className">
                        <section id="introduction">
                            <div className="introduction-container">
                                <div className="introduction-content">
                                    <div className="hello-container">
                                        <h4><TypedEffect /></h4>
                                    </div>
                                    <h1 className="welcome-h1">Welcome to JOT Foods</h1>
                                    <p className="lead welcome-p">Where Culture Meets Food</p>
                                    <div className="button">
                                        <a href="/Menu" className="btn btn-primary order-button">Order Now</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div>
            <h1 class="heading">Amazing health solution whatever your needs</h1>
            <br/>
                <p class="line-text">Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo tem incididunt labore apericons.</p>
            <div className="container">
                <div className="grid-container">
                     <div className="grid-item">
                         <img src="1.png" alt="Image 1" />
                             <p className="text-paragraph">NATURAL FOOD</p>
                             <br/>
                            <p className="text-paragraph">Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo tem incididunt labore apericons.</p>
                        </div>
                <div className="grid-item">
                    <img src="2.png" alt="Image 2"/>
                    <p className="text-paragraph">SAFE FORMALIN</p>
                    <br/>
                    <p className="text-paragraph">Lorem ipsum dolor conse ctetur 
                        adipisicing elit sed do eiusmo 
                        tem incididunt labore apericons.</p>
                </div>
                <div className="grid-item">
                    <img src="3.png" alt="Image 3" />
                    <p className="text-paragraph">100% TASTY FOOD</p>
                    <br/>
                    <p className="text-paragraph">Lorem ipsum dolor conse ctetur 
                        adipisicing elit sed do eiusmo 
                        tem incididunt labore apericons.</p>
                </div>
                <div className="grid-item">
                    <img src="4.png" alt="Image 4" />
                    <p className="text-paragraph">EXCLUSIVE TEAM</p>
                    <br/>
                    <p className="text-paragraph">Lorem ipsum dolor conse ctetur 
                        adipisicing elit sed do eiusmo 
                        tem incididunt labore apericons.</p>
                </div>
            </div>
            </div>
            </div>
        </>

    );
}

export default Home;