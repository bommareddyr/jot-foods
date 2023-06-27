// import React from 'react';
// import { addToCart, removeOneFromCart, removeFromCart } from './CartHandler';
// import '../CSS/cart.css';

// function Cart({ cartItems, onRemoveFromCart, onAddToCart, onRemoveOneFromCart }) {
//     console.log(cartItems);
//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handleAddToCart = (item) => {
//     const updatedCartItems = addToCart(cartItems, item);
//     onAddToCart(updatedCartItems);
//   };

//   const handleRemoveOneFromCart = (item) => {
//     const updatedCartItems = removeOneFromCart(cartItems, item);
//     onRemoveOneFromCart(updatedCartItems);
//   };

//   const handleRemoveFromCart = (itemId) => {
//     const updatedCartItems = removeFromCart(cartItems, itemId);
//     onRemoveFromCart(updatedCartItems);
//   };

//   return (
//     <div className="CartContainer">
//       <div className="Header">
//         <h1 className="Heading">Shopping Cart</h1>
//         <h5 onClick={() => onRemoveFromCart([])} className="Action">
//           Remove all
//         </h5>
//       </div>

//       {cartItems.map((item) => (
//         <div key={item.id} className="Cart-Items">
//           <div className="image-box">
//             <img src={item.image} alt={item.name} style={{ height: '120px' }} />
//           </div>
//           <div className="about">
//             <h3 className="title">{item.name}</h3>
//           </div>
//           <div className="counter">
//             <div onClick={() => handleAddToCart(item)} className="btn">
//               +
//             </div>
//             <div className="count">{item.quantity}</div>
//             <div onClick={() => handleRemoveOneFromCart(item)} className="btn">
//               -
//             </div>
//           </div>
//           <div className="prices">
//             <div className="amount">${(item.price * item.quantity).toFixed(2)}</div>
//             <div onClick={() => handleRemoveFromCart(item.id)} className="remove">
//               <u>Remove</u>
//             </div>
//           </div>
//         </div>
//       ))}

//       {cartItems.length > 0 && (
//         <>
//           <hr />
//           <div className="checkout">
//             <div className="total">
//               <div>
//                 <div className="Subtotal">Sub-Total</div>
//                 <div className="items">{cartItems.length} items</div>
//               </div>
//               <div className="total-amount">${totalPrice.toFixed(2)}</div>
//             </div>
//             <button className="button">Checkout</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;

import React from 'react';
import { addToCart, removeOneFromCart, removeFromCart } from './CartHandler';
import '../CSS/cart.css';

function Cart({ cartItem, onRemoveFromCart, onAddToCart, onRemoveOneFromCart }) {
  console.log(cartItem);
  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleAddToCart = (item) => {
    const updatedCartItems = addToCart(cartItem, item);
    onAddToCart(updatedCartItems);
  };

  const handleRemoveOneFromCart = (item) => {
    const updatedCartItems = removeOneFromCart(cartItem, item);
    onRemoveOneFromCart(updatedCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = removeFromCart(cartItem, itemId);
    onRemoveFromCart({ cartItem: updatedCartItems });
  };

  const renderCartItems = () => {
    return cartItem.map((item) => (
      <div key={item.id} className="Cart-Items">
        <div className="image-box">
          <img src={item.image} alt={item.name} style={{ height: '120px' }} />
        </div>
        <div className="about">
          <h3 className="title">{item.name}</h3>
        </div>
        <div className="counter">
          <div onClick={() => handleAddToCart(item)} className="btn">
            +
          </div>
          <div className="count">{item.quantity}</div>
          <div onClick={() => handleRemoveOneFromCart(item)} className="btn">
            -
          </div>
        </div>
        <div className="prices">
          <div className="amount">${(item.price * item.quantity).toFixed(2)}</div>
          <div onClick={() => handleRemoveFromCart(item.id)} className="remove">
            <u>Remove</u>
          </div>
        </div>
      </div>
    ));
  };

  const renderCheckout = () => {
    if (cartItem.length > 0) {
      return (
        <>
          <hr />
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Sub-Total</div>
                <div className="items">{cartItem.length} items</div>
              </div>
              <div className="total-amount">${totalPrice.toFixed(2)}</div>
            </div>
            <button className="button">Checkout</button>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="CartContainer">
      <div className="Header">
        <h1 className="Heading">Shopping Cart</h1>
        <h5 onClick={() => onRemoveFromCart([])} className="Action">
          Remove all
        </h5>
      </div>
      {renderCartItems()}
      {renderCheckout()}
    </div>
  );
}

export default Cart;
