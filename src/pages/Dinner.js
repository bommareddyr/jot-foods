import React from 'react';
import roti from '../Images/roti.jpg';
import vegbiryani from '../Images/veg-Biryani-.jpg';
import chickenbiryani from '../Images/chicken-biryani.jpg';
import '../CSS/style.css';
import '../CSS/index.css';
import '../CSS/menu_style.css';
import '../CSS/create-new.css';


function Dinner() {
  return (
    <div className="container menu-all">
                    <div className="row g-3">
                        <div className="col-md-4 col-6">
                            <div className="card h-100">
                                <img src= {roti} className="card-img-top img-fit" alt="Curry" />
                                <div className="card-body">
                                    <h5 className="card-title">Roti/Phulka With Curry</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Roti or Phulka, Curry</p>
                                    <p className="card-text"><strong>$20</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="spicy"><i className="fa-solid fa-pepper-hot fa-sm"></i></span>Spicy</li>
                                            <li><span className="new"><i className="fa-solid fa-star fa-sm"></i></span>New</li>
                                        </ul>
                                    </div>
                                    <div className="order-now">
                                        <a href="#" className="btn mybutton">Order Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="card h-100">
                                <img src= {vegbiryani} className="card-img-top img-fit" alt="veg biryani" />
                                <div className="card-body">
                                    <h5 className="card-title">Vegetarian Biryani</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Basmati Rice, Raitha</p>
                                    <p className="card-text"><strong>$20</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="spicy"><i className="fa-solid fa-pepper-hot fa-sm"></i></span>Spicy</li>
                                            <li><span className="recommended"><i className="fa-solid fa-face-grin-stars fa-sm"></i></span>Trusted</li>
                                        </ul>
                                    </div>
                                    <div className="order-now">
                                        <a href="#" className="btn mybutton">Order Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="card h-100">
                                <img src= {chickenbiryani} className="card-img-top img-fit" alt="chicken-biryani" />
                                <div className="card-body">
                                    <h5 className="card-title">Non-Vegetarian Biryani</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Basmati Rice, Meat, Raitha</p>
                                    <p className="card-text"><strong>$20</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="spicy"><i className="fa-solid fa-pepper-hot fa-sm"></i></span>Spicy</li>
                                            <li><span className="best-seller"><i className="fa-solid fa-medal fa-sm"></i></span>Premium</li>
                                        </ul>
                                    </div>
                                    <div className="order-now">
                                        <a href="#" className="btn mybutton">Order Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  );
}

export default Dinner;
