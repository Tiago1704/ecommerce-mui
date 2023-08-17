import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const useStyles = makeStyles(() => ({
  registroContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  registroForm: {
    width: '100%',
    maxWidth: '400px',
    padding: 3,
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  pinkText: {
    color: '#ff4081',
  },
}));

interface UserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registro: React.FC<{}> = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<UserDTO>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = React.useState<string>('');

  const auth = getAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        toast.success('Registro exitoso', { draggable: false, hideProgressBar: true, autoClose: 2000 });
        setError('');
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        setError('Error al registrar usuario: ' + error.message + ` Código de error ${errorCode}`);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any, field: keyof UserDTO) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };

  return (
    <Container className={classes.registroContainer} maxWidth="xs">
      <div className={classes.registroForm}>
        <Typography variant="h5" gutterBottom className={classes.pinkText}>
          Registro
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            fullWidth
            type="text"
            margin="normal"
            value={user.name}
            onChange={(e) => handleInputChange(e, 'name')}
            autoComplete="username"
            required
          />

          <TextField
            label="Email"
            fullWidth
            type="email"
            margin="normal"
            value={user.email}
            onChange={(e) => handleInputChange(e, 'email')}
            autoComplete="email"
            required
          />

          <TextField
            label="Contraseña"
            fullWidth
            type="password"
            margin="normal"
            value={user.password}
            onChange={(e) => handleInputChange(e, 'password')}
            autoComplete="new-password"
            required
          />

          <TextField
            label="Confirmar contraseña"
            fullWidth
            type="password"
            margin="normal"
            value={user.confirmPassword}
            onChange={(e) => handleInputChange(e, 'confirmPassword')}
            autoComplete="new-password"
            required
          />

          {error && <p className={classes.pinkText}>{error}</p>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrarse
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Registro;
