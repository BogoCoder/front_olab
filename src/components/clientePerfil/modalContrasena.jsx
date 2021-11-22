import React, {useState} from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordStrengthBar from 'react-password-strength-bar';


export default function ModalContrasena() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const initialState = {
    password1: '',
    password2: '',
    showPassword: false,
    boolpass : false,
  };

  const [values, setValues] = useState({
    password1: '',
    password2: '',
    showPassword: false,
    boolpass : false,
  });

  const handleClose = () => {
    setOpen(false);
    setValues({ ...initialState });
  };

  const handleCancel = () => {
    setOpen(false);
    setValues({ ...initialState });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para cambiar tu contraseña por favor ingresa tu nueva contraseña a continuación.
          </DialogContentText>
        <FormControl fullWidth sx={{ m: 1}} variant="standard">
          <InputLabel htmlFor="password1">Nueva contraseña</InputLabel>
          <Input
            id="password1"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password1}
            onChange={handleChange('password1')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <PasswordStrengthBar
          password={values.password1}
          onChangeScore={(score, feedback) => score > 1? values.boolpass = true : values.boolpass = false}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1}} variant="standard">
          <InputLabel htmlFor="password2">Confirmación de nueva contraseña</InputLabel>
          <Input
            id="password2"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password2}
            onChange={handleChange('password2')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCancel}>Cancelar</Button>
          <Button
          variant="contained"
          onClick={()=>((values.password1 === values.password2) && values.boolpass ? handleClose() : alert('error con la contraseña'))}>
          Editar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

