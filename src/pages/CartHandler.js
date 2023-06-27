function addToCart(cartItems, item) {
    const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += 1;
      return updatedCartItems;
    } else {
      const updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
      return updatedCartItems;
    }
  }
  
  function removeOneFromCart(cartItems, item) {
    const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[itemIndex].quantity > 1) {
        updatedCartItems[itemIndex].quantity -= 1;
        return updatedCartItems;
      } else {
        updatedCartItems.splice(itemIndex, 1);
        return updatedCartItems;
      }
    }
  
    return cartItems;
  }
  
  function removeFromCart(cartItems, itemId) {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    return updatedCartItems;
  }
  
  export { addToCart, removeOneFromCart, removeFromCart };
