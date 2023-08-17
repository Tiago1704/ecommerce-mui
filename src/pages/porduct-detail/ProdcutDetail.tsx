import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductoML } from '../../shared/interface';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { textPrecio, textEstado } from '../../shared/functions';
import { GET_ITEM_DETAIL } from '../../shared/api';
import { toast } from 'react-toastify';
import { ArrowBack } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles({
  backButton: {
    position: 'absolute',
    top: '75px',
    left: '10px',
    color: '#ff4081', // Pink color
  },
  card: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '16px',
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
  },
  carouselContainer: {
    width: '100%',
    marginTop: '8px',
    marginBottom: '8px',
  },
  carouselImage: {
    height: 'auto',
    width: '100%',
    objectFit: 'cover',
  },
  buyButton: {
    backgroundColor: '#ff4081', // Pink color
    color: '#ffffff', // White color
    '&:hover': {
      backgroundColor: '#d81b60', // Darker pink color
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
});

const ProdcutDetail: React.FC<{}> = () => {
  const classes = useStyles();
  const params = useParams();
  const [prod, setProd] = React.useState<ProductoML>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (params.id) {
      fetch(`${GET_ITEM_DETAIL}/${params.id}`)
        .then((res) => res.json())
        .then((result) => setProd(result))
        .catch((err) => toast.error(`Error al obtener el producto: ${err}`));
    }
  }, [params]);

  const handleBuyButton = () => {
    toast.success('Producto agregado al carrito', {
      position: 'bottom-center',
    });
  };

  return (
    <div className={classes.content}>
      <IconButton onClick={() => navigate(-1)} className={classes.backButton}>
        <ArrowBack />
      </IconButton>
      {prod && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {prod.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {textEstado(prod.condition)}
            </Typography>
            <Typography variant="body1">Precio: {textPrecio(prod.price)}</Typography>
            <Typography variant="body2">{prod.warranty}</Typography>
            <div className={classes.carouselContainer}>
              <Carousel autoPlay={false} animation="slide">
                {prod.pictures.map((picture, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    alt={prod.title}
                    image={picture.url}
                    className={classes.carouselImage}
                  />
                ))}
              </Carousel>
            </div>
          </CardContent>
          <CardActions>
            <Button onClick={handleBuyButton} className={classes.buyButton}>
              Agregar al carrito
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default ProdcutDetail;
