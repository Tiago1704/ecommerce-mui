import React from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductoML } from '../../shared/interface';
import { textPrecio } from '../../shared/functions';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardMedia: {
    paddingTop: '5%',
  },
  cardContent: {
    padding: '8px',
  },
  addButton: {
    backgroundColor: '#ff4081',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
});

interface DetalleProductoProps {
  producto: ProductoML;
}

const DetalleProducto: React.FC<DetalleProductoProps> = (props: DetalleProductoProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBuyButton = () => {
    toast.success('Producto agregado al carrito', {
      position: 'bottom-center',
    });
  };

  return (
    <Grid item>
      <Card onClick={() => navigate(`/product/${props.producto.id}`)} className={classes.card}>
        <CardMedia
          component="img"
          alt={props.producto.title}
          image={props.producto.thumbnail}
          className={classes.cardMedia}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" gutterBottom>
            {props.producto.title}
          </Typography>
          <Typography variant="body2">Precio: {textPrecio(props.producto.price)}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleBuyButton} className={classes.addButton}>
            Agregar al carrito
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default DetalleProducto;
