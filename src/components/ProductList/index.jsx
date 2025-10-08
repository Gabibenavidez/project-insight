import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts.js';
import {
  Box, Grid, Card, CardContent, CardMedia, Typography,
  CircularProgress, Rating, Alert,
} from '@mui/material';
import ProductDetailModal from './ProductDetailModal/index.jsx';

const ProductsList = () => {
  const { data, isLoading, isError } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (selectedProduct) {
    return <ProductDetailModal open={!!selectedProduct} product={selectedProduct} onClose={() => setSelectedProduct(null)} />;
  }

  if (isLoading)
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress color="secondary" />
    </Box>;

  if (isError)
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Alert severity="error">Error loading products.</Alert>
    </Box>;

  return (
    <Box sx={{ p: 4, bgcolor: '#121212', minHeight: '100vh' }}>
      <Typography variant="h4" color="white" fontWeight={700} mb={4}>
        🛍️ Products
      </Typography>

      <Grid container spacing={3}>
        {data.map((product) => (
          <Grid key={product.id}>
            <Card
              sx={{
                bgcolor: '#1E1E1E',
                borderRadius: 3,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)', cursor: 'pointer' },
              }}
              onClick={() => setSelectedProduct(product)}
            >
              <CardMedia
                component="img"
                height="180"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" color="white" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="gray" mb={1}>
                  {product.description.slice(0, 60)}...
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
