import React, { useState } from 'react';
import onAddToCart from '../pages/CartHandler';
import foods from '../data/foods';
import hero1 from '../Images/hero1.jpeg';
import hero2 from '../Images/hero2.jpg';
import hero3 from '../Images/hero3.jpg';
import '../CSS/style.css';
import '../CSS/index.css';
import '../CSS/menu_style.css';
import '../CSS/create-new.css';

function Menu({ cartItems, onAddToCart }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('breakfast');
  const handleOrderNow = (food) => {
    onAddToCart(food);
    console.log(food);
  };


  return (
    <div>
      <div className="container-fluid">
        <div id="hero-Carousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active c-item">
              <img src={hero1} className="d-block w-100 c-img" alt="Image 1" />
              <div className="carousel-caption d-none d-md-block">
                <h2>Breakfast</h2>
                <p>Start your day with a hearty Andhra Pradesh breakfast.
                  Indulge in the popular "Pesarattu," a green gram lentil crepe served with tangy ginger chutney, or savor
                  the savory "Upma" accompanied by coconut chutney.
                  For a more indulgent option, try the crispy "Garelu" fritters paired with a spicy tomato chutney. These
                  breakfast delights will energize you for the day ahead.
                </p>
              </div>
            </div>
            <div className="carousel-item c-item">
              <img src={hero2} className="d-block w-100 c-img" alt="Image 2" />
              <div className="carousel-caption d-none d-md-block">
                <h2>Lunch</h2>
                <p>For lunch, immerse yourself in the traditional dishes of both regions. Sample the tangy tamarind rice,
                  "Pulihora," paired with the flavorful "Gutti Vankaya Kura," an eggplant curry cooked with a unique blend
                  of spices. Indulge in the spicy "Royyala Iguru" prawn curry or the fiery "Gongura Mamsam" mutton curry
                  with the distinctive tang of sorrel leaves. Complete your meal with comforting "Pappu," aromatic "Sambar,"
                  and refreshing "Perugu" (curd) served with steamed rice.</p>
              </div>
            </div>
            <div className="carousel-item c-item">
              <img src={hero3} className="d-block w-100 c-img" alt="Image 3" />
              <div className="carousel-caption d-none d-md-block">
                <h2>Dinner</h2>
                <p>As the sun sets, indulge in a Telangana dinner that showcases the region's rich culinary heritage.
                  Delight your taste buds with the fragrant "Hyderabadi Biryani," a flavorful rice dish infused with
                  aromatic spices. Savor the tender "Bagara Baingan," baby eggplants simmered in a nutty sesame and peanut
                  sauce. For non-vegetarian options, relish the spicy "Kodi Kura" chicken curry or the tangy "Chepala
                  Pulusu" fish stew. Accompanied by "Pulao" or "Roti," this dinner experience will leave you satisfied and
                  content.</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#hero-Carousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#hero-Carousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="center-nav">
        <nav className="navigation">
          <a href="#breakfast" onClick={() => setSelectedMenuItem('breakfast')} className={selectedMenuItem === 'breakfast' ? 'selected' : ''}>
            Breakfast
          </a>
          <a href="#lunch" onClick={() => setSelectedMenuItem('lunch')} className={selectedMenuItem === 'lunch' ? 'selected' : ''}>
            Lunch
          </a>
          <a href="#dinner" onClick={() => setSelectedMenuItem('dinner')} className={selectedMenuItem === 'dinner' ? 'selected' : ''}>
            Dinner
          </a>
          <div className="animation"></div>
        </nav>
      </div>
      <div className="container menu-all">
        <div className="row g-3">
          {foods.filter(food => food.category.toLowerCase() === selectedMenuItem).map(food => (
            <div className="col-md-4 col-6" key={food.id}>
              <div className="card h-100">
                <img src={food.image} className="card-img-top img-fit" alt={food.alt} />
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text"><strong>Ingredients:</strong> {food.ingredients.join(", ")}</p>
                  <p className="card-text"><strong>${food.price}</strong></p>
                  <div className="ingredients-card">
                    <ul className="list-group list-group-horizontal ingredients-list">
                      {food.options.map(option => (
                        <li key={option.name}>
                          <span className={option.name.toLowerCase()}>
                            <i className={option.icon}></i>
                          </span>
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-now">
                    <button onClick={() => handleOrderNow(food)} className="btn mybutton">Order Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
