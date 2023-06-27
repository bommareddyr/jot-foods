import React from 'react';
import andhrameals from '../Images/andhra_meals.png';
import nonvegmeals from '../Images/non-veg-meals.jpg';
import paan from '../Images/paan.jpg';
import '../CSS/style.css';
import '../CSS/index.css';
import '../CSS/menu_style.css';
import '../CSS/create-new.css';


function Lunch() {
  return (
    <div className="container menu-all">
                    <div className="row g-3">
                        <div className="col-md-4 col-6">
                            <div className="card h-100">
                                <img src= {andhrameals} className="card-img-top img-fit" alt="Vegetarian Meals" />
                                <div className="card-body">
                                    <h5 className="card-title">Vegetarian Meals</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Rice, Curries, Curd</p>
                                    <p className="card-text"><strong>$20</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="spicy"><i className="fa-solid fa-pepper-hot fa-sm"></i></span>Spicy</li>
                                            <li><span className="chutney"><i className="fa-solid fa-seedling fa-sm"></i></span>Chutney</li>
                                            <li><span className="recommended"><i className="fa-solid fa-cheese fa-sm"></i></span>Curd</li>
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
                                <img src= {nonvegmeals} className="card-img-top img-fit" alt="Non-Vegetarian Meals" />
                                <div className="card-body">
                                    <h5 className="card-title">Non-Vegetarian Meals</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Rice, Meat, Curd</p>
                                    <p className="card-text"><strong>$25</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="spicy"><i className="fa-solid fa-pepper-hot fa-sm"></i></span>Spicy</li>
                                            <li><span className="meat"><i className="fa-solid fa-drumstick-bite fa-sm"></i></span>Meat</li>
                                            <li><span className="curd"><i className="fa-solid fa-cheese fa-sm"></i></span>Curd</li>
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
                                <img src= {paan} className="card-img-top img-fit" alt="paan" />
                                <div className="card-body">
                                    <h5 className="card-title">Paan</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Betel Leaves, Areca Nuts, Sweeteners</p>
                                    <p className="card-text"><strong>$10</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="leaves"><i className="fa-solid fa-leaf fa-sm"></i></span>Leaves</li>
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

export default Lunch;
