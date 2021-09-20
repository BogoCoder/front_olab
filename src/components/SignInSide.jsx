import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ReactComponent as OLabLogo} from '../assets/olab_logo.svg';

function Copyright(props) {
  return (
    <Grid container direction='column' {...props}>
      <Typography variant="body2" color="black" align="center">
        {'Escuela de Ingeniería, Ciencia y Tecnología'}
      </Typography>
      <Typography variant="body2" color="primary" align="center">
        <Link color="inherit" href="https://www.urosario.edu.co/">
            Universidad del Rosario
          </Link>
      </Typography>
      <Typography variant="body2" color="black" align="center">
        {new Date().getFullYear()}
      </Typography>
    </Grid>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
        <Grid
          item
          direction='column'
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: 'background: rgb(28,110,229)',
            backgroundImage: 'linear-gradient(315deg, rgba(28,110,229,1) 0%, rgba(11,57,125,1) 50%);',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            alignItems: 'center',
            justifyContent:"center",
            display: 'flex',
          }}
        >

        <Typography component="h1" variant="h4" sx={{color: 'white', fontWeight: 600}}>
              Los laboratorios EICT
        </Typography>

        <Typography component="h1" variant="h5" sx={{color: 'white'}}>
              al alcance de tu mano.
        </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <OLabLogo style={{ height: 60, width: 80 }}/>
          </Box>

          <Box
            sx={{
              my: 8,
              mx: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h6">
              Iniciar sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Nombre de usuario"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:'#0B397D'}}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Regístrate aquí"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 6 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}