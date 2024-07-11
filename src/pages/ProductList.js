import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
                console.log('Fetched products:', res.data); // Log dữ liệu sản phẩm trả về từ API
                setProducts(res.data);
            } catch (err) {
                console.log('Error fetching products:', err); // Log lỗi nếu có
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (err) {
            console.log('Error deleting product:', err); // Log lỗi nếu có
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            <Link to="/add-product">Add Product</Link>
            <ul>
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product._id}>
                            {product.name}
                            <button onClick={() => handleDelete(product._id)}>Delete</button>
                            <Link to={`/edit-product/${product._id}`}>Edit</Link>
                        </li>
                    ))
                ) : (
                    <p>No products found</p> // Hiển thị thông báo khi không có sản phẩm
                )}
            </ul>
        </div>
    );
};

export default ProductList;
