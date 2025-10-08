import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Paper,
  Rating,
  Modal,
  Fade,
  Backdrop,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSentimentAnalysis } from '../../../hooks/useSentimentAnalysis';
import { getSentimentColor } from '../../../utils/getSentimentColor';

const ProductDetailModal = ({ open, onClose, product }) => {
  const { data, isLoading, isError } = useSentimentAnalysis(product?.description, "KeyPhraseExtraction");

  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '70%', md: '50%' },
            bgcolor: '#1E1E1E',
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
            outline: 'none',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" color="white">
              {product.title}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 12,
              marginTop: 16,
            }}
          />

          <Typography variant="body1" color="gray" mt={2} mb={2}>
            {product.description}
          </Typography>

          <Typography variant="h6" color="primary" mb={1}>
            ${product.price}
          </Typography>

          <Rating value={product.rating} precision={0.5} readOnly size="small" sx={{ mb: 2 }} />

          {isLoading && <CircularProgress color="secondary" size={24} />}
          {isError && <Alert severity="error">Error analyzing key phrases.</Alert>}

          {data && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" color="white" mb={1}>
                Azure Key Phrases
              </Typography>
              {data.keyPhrases?.length > 0 ? (
                data.keyPhrases.map((key, index) => (
                  <Chip
                    key={index}
                    label={key}
                    color={getSentimentColor(data.sentiment)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="gray">
                  No key phrases detected.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductDetailModal;
