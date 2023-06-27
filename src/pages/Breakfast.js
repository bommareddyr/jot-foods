import React from 'react';
import foods from '../data/foods';
import idly from '../Images/idly.png';
import dosa from '../Images/dosa.jpg';
import tea from '../Images/tea.jpg';
import '../CSS/style.css';
import '../CSS/index.css';
import '../CSS/menu_style.css';
import '../CSS/create-new.css';


function Breakfast() {
  return (
    <div className="container menu-all">
                    <div className="row g-3">
                        <div className="col-md-4 col-6">
                            <div className="card h-100">
                                <img src= {idly} className="card-img-top img-fit" alt="Idly" />
                                <div className="card-body">
                                    <h5 className="card-title">Idly</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Rice, Urad Daal, Fenugreek Seeds</p>
                                    <p className="card-text"><strong>$10</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="sambar"><i className="fa-solid fa-mug-hot fa-sm"></i></span>Sambar</li>
                                            <li><span className="chutney"><i className="fa-solid fa-seedling fa-sm"></i></span>Chutney</li>
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
                                <img src= {dosa} className="card-img-top img-fit" alt="Dosa" />
                                <div className="card-body">
                                    <h5 className="card-title">Dosa</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Rice, Urad Daal, Fenugreek Seeds</p>
                                    <p className="card-text"><strong>$10</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="sambar"><i className="fa-solid fa-mug-hot fa-sm"></i></span>Sambar</li>
                                            <li><span className="chutney"><i className="fa-solid fa-seedling fa-sm"></i></span>Chutney</li>
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
                                <img src= {tea} className="card-img-top img-fit" alt="Tea/Coffee" />
                                <div className="card-body">
                                    <h5 className="card-title">Tea/Coffee</h5>
                                    <p className="card-text"><strong>Ingredients:</strong> Tea Leaves Or Coffee Powder, Milk, Water</p>
                                    <p className="card-text"><strong>$6</strong></p>
                                    <div className="ingredients-card">
                                        <ul className="list-group list-group-horizontal ingredients-list">
                                            <li><span className="milk"><i className="fa-solid fa-mug-saucer fa-sm"></i></span>Milk</li>
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

export default Breakfast;
