import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
                setProducts(res.data);
            } catch (err) {
                console.log('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (err) {
            console.log('Error deleting product:', err);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/add-product">
                Add Product
            </Button>
            <List>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ListItem key={product._id} divider>
                            <ListItemText
                                primary={product.name}
                                secondary={product.category}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" component={Link} to={`/edit-product/${product._id}`}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(product._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1">No products found</Typography>
                )}
            </List>
        </Container>
    );
};

export default ProductList;
