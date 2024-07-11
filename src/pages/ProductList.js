import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteProduct = id => {
    axios.delete(`http://localhost:3000/api/products/${id}`)
      .then(() => setProducts(products.filter(product => product._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/add">Add Product</Link>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price} - {product.description}
            <Link to={`/edit/${product._id}`}>Edit</Link>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
