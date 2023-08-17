import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, TextField, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { makeStyles } from '@mui/styles';

interface User {
  email: string;
  password: string;
}

const useStyles = makeStyles(() => ({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'transparent',
    paddingTop: 15
  },
  loginForm: {
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

const Login: React.FC<{}> = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });
  const auth = getAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        toast.success("Inicio correcto", { draggable: false, hideProgressBar: true, autoClose: 2000 });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`${error.message} - ${errorCode}`, { draggable: false, hideProgressBar: true, autoClose: 2000 });
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any, field: keyof User) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };

  return (
    <Container className={classes.loginContainer} maxWidth="xs">
      <div className={classes.loginForm}>
        <Typography variant="h5" gutterBottom className={classes.pinkText}>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            margin="normal"
            value={user.email}
            onChange={(e) => handleInputChange(e, "email")}
            autoComplete='username'
            required
          />

          <TextField
            label="Contraseña"
            fullWidth
            type="password"
            margin="normal"
            value={user.password}
            onChange={(e) => handleInputChange(e, "password")}
            autoComplete='current-password'
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
