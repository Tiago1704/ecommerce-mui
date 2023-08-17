import React from 'react';
import { ProductoML } from '../../shared/interface';
import { URL_API } from '../../shared/api';
import DetalleProducto from '../../components/DetalleProductos/DetalleProducto';
import { Grid, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  homeContainer: {
    padding: '16px',
    textAlign: 'center',
  },
  pageTitle: {
    marginBottom: '16px',
    color: '#ff4081',
  },
  productGrid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
  pagination: {
    marginTop: '16px',
    '& button': {
      marginRight: '8px',
      backgroundColor: 'transparent',
      border: '1px solid #ff4081',
      color: '#ff4081',
      borderRadius: '4px',
      padding: '4px 8px',
      cursor: 'pointer',
      '&.active': {
        backgroundColor: '#ff4081',
        color: '#ffffff',
      },
    },
  },
});

const Home: React.FC<{}> = () => {
  const classes = useStyles();
  const [productos, setProductos] = React.useState<ProductoML[]>([]);
  const [paginado, setPaginado] = React.useState(1);
  const limit = 9;

  React.useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(URL_API);
        const data = await response.json();
        setProductos(data.results);
      } catch (error) {
        toast.error(`Error al obtener los productos: ${error}`);
      }
    };

    obtenerProductos();
  }, []);

  const indiceFinal = paginado * limit;
  const indiceP = indiceFinal - limit;
  const listadoProductos = productos.slice(indiceP, indiceFinal);

  return (
    <div className={classes.homeContainer}>
      <Typography variant="h4" className={classes.pageTitle}>
        Inicio
      </Typography>
      <div className={classes.productGrid}>
        {listadoProductos.map((producto) => (
          <Grid container key={producto.id}>
            <DetalleProducto producto={producto} />
          </Grid>
        ))}
      </div>
      <div className={classes.pagination}>
        {Array.from({ length: Math.ceil(productos.length / limit) }).map((_, index) => (
          <Button
            key={index}
            onClick={() => setPaginado(index + 1)}
            className={paginado === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Home;
