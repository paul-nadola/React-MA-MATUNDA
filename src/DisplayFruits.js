
import React, { useState, useEffect } from "react";
import SocialMedia from "./SocialMedia";
import AddFruit from "./AddFruit";


function DisplayFruits() {
  const [fruitData, setFruitData] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantityInput, setQuantityInput] = useState(1);

  function fetchFruits() {
    fetch(`http://localhost:3000/fruits`)
      .then((response) => response.json())
      .then((data) => {
        setFruitData(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchFruits();
  }, []);

  function addToCart(fruit, quantity) {
    const cartItem = cart.find((item) => item.fruit.name === fruit.name);

    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
      setCart([...cart]);
    } else {
      setCart([
        ...cart,
        {
          fruit: fruit,
          quantity: parseInt(quantity),
        },
      ]);
    }
  }

  function removeCartItem(fruit) {
    const cartIndex = cart.findIndex((item) => item.fruit.name === fruit.name);
    cart.splice(cartIndex, 1);
    setCart([...cart]);
  }

  function buyItems() {
    cart.forEach((item) => {
      const fruitIndex = fruitData.findIndex(
        (fruit) => fruit.name === item.fruit.name
      );
      fruitData[fruitIndex].quantity -= item.quantity;

      fetch(`http://localhost:3000/fruits/${fruitData[fruitIndex].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          quantity: fruitData[fruitIndex].quantity,
        }),
      });
    });

    alert("Thank you for your purchase, rudi tena na tena!!");
    setCart([]);
    fetchFruits();
  }

  const showFruits = fruitData.map((fruit) => {
    return (
      <div id="fruits" key={fruit.id}>
        <div className="fruit-list">
          <div className="fruit">
            <img src={fruit.imageUrl} alt={fruit.name} />
            <h3>{fruit.name}</h3>
            <p>{fruit.description}</p>
            <p>KSH: {fruit.price}</p>
            <p>Available Quantity: {fruit.quantity}</p>
            <input
              type="number"
              onChange={(e) => setQuantityInput(e.target.value)}
            />
            <button id="btn" onClick={() => addToCart(fruit, quantityInput)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  });

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.fruit.price * item.quantity,
    0
  );

  const showCart = cart.map((item) => {
    return (
      <div className="cart-list" key={item.fruit.id}>
        <div className="cart-item">
          <span>{item.fruit.name}</span>
          <span>{item.quantity}</span>
          <button
            className="remove-button"
            onClick={() => removeCartItem(item.fruit)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <AddFruit fetchFruits = {fetchFruits}/>
      <SocialMedia />
      {showFruits}
      {showCart}
      <span>Total: {cartTotal}</span>
     <span> <button id="buy-button" onClick={buyItems}>BUY</button></span>
    </div>
  )
  }
export default DisplayFruits
