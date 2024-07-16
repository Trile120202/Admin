import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        title: '',
        category: '',
        imageUrl: [''],
        oldPrice:'',
        price: '',
        description: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
                setProduct(res.data);
            };
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (index, value) => {
        const newImageUrls = [...product.imageUrl];
        newImageUrls[index] = value;
        setProduct((prev) => ({
            ...prev,
            imageUrl: newImageUrls
        }));
    };

    const handleAddImage = () => {
        setProduct((prev) => ({
            ...prev,
            imageUrl: [...prev.imageUrl, '']
        }));
    };

    const handleRemoveImage = (index) => {
        const newImageUrls = product.imageUrl.filter((_, i) => i !== index);
        setProduct((prev) => ({
            ...prev,
            imageUrl: newImageUrls
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${id}`, product);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, product);
            }
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {id ? 'Edit Product' : 'Add Product'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="name" label="Name" value={product.name} onChange={handleChange} fullWidth />
                <TextField name="title" label="Title" value={product.title} onChange={handleChange} fullWidth />
                <TextField name="category" label="Category" value={product.category} onChange={handleChange} fullWidth />
                {product.imageUrl.map((url, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            name={`imageUrl-${index}`}
                            label={`Image URL ${index + 1}`}
                            value={url}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            fullWidth
                        />
                        <IconButton onClick={() => handleRemoveImage(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddImage} startIcon={<AddIcon />}>
                    Add Image
                </Button>
                <TextField name="oldPrice" label="Old Price" value={product.oldPrice} onChange={handleChange} fullWidth />
                <TextField name="price" label="Price" value={product.price} onChange={handleChange} fullWidth />
                <TextField
                    name="description"
                    label="Description"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button variant="contained" color="primary" type="submit">
                    {id ? 'Update' : 'Add'}
                </Button>
            </Box>
        </Container>
    );
};

export default ProductForm;
