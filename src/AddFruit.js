import React, { useState } from 'react';

function AddFruit({fetchFruits}) {
  const [fruitName, setFruitName] = useState('');
  const [fruitDes, setFruitDes] = useState('');
  const [fruitImg, setFruitImg] = useState('');
  const [fruitPrice, setFruitPrice] = useState('');
  const [fruitQuantity, setFruitQuantity] = useState('');

  const handleFruitNameChange = (event) => {
    setFruitName(event.target.value);
  }

  const handleFruitDesChange = (event) => {
    setFruitDes(event.target.value);
  }

  const handleFruitImgChange = (event) => {
    setFruitImg(event.target.value);
  }

  const handleFruitPriceChange = (event) => {
    setFruitPrice(event.target.value);
  }

  const handleFruitQuantityChange = (event) => {
    setFruitQuantity(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addFruit();
  }

  const addFruit = () => {
    const newFruit = {
      name: fruitName,
      imageUrl: fruitImg,
      description: fruitDes,
      price: fruitPrice,
      quantity: fruitQuantity
    };

    fetch('http://localhost:3000/fruits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newFruit)
    })
    .then(response => response.json())
    .then((fruit) => {
      fetchFruits(fruit)
      setFruitName('');
      setFruitImg('');
      setFruitDes('');
      setFruitPrice('');
      setFruitQuantity('');
    })
    .catch(error => console.error(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fruitName">Enter fruit Name:</label>
      <input
        id="fruitName"
        type="text"
        name="fruitName"
        placeholder="Enter fruit Name"
        required
        value={fruitName}
        onChange={handleFruitNameChange}
      />
      <label htmlFor="fruitDes">Enter fruit Description:</label>
      <input
        id="fruitDes"
        type="text"
        name="fruitDes"
        placeholder="Enter fruit Description"
        required
        value={fruitDes}
        onChange={handleFruitDesChange}
      />
      <label htmlFor="fruitImg">Enter fruit Image link:</label>
      <input
        id="fruitImg"
        type="text"
        name="fruitImg"
        placeholder="Enter fruit image link"
        required
        value={fruitImg}
        onChange={handleFruitImgChange}
      />
      <label htmlFor="fruitPrice">Enter fruit Price:</label>
      <input
        id="fruitPrice"
        type="number"
        name="fruitPrice"
        placeholder="Enter fruit price"
        required
        value={fruitPrice}
        onChange={handleFruitPriceChange}
      />
      <label htmlFor="fruitQuantity">Enter fruit quantity:</label>
      <input
        id="fruitQuantity"
        type="number"
        name="fruitQuantity"
        placeholder="Enter fruit Quantity"
        required
        value={fruitQuantity}
        onChange={handleFruitQuantityChange}
      />
      <button type="submit">TUMA-TUNDA</button>
    </form>
  );
}


export default AddFruit