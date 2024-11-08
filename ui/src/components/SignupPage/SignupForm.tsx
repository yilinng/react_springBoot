import { useState, SyntheticEvent, useContext } from "react";
import { useMutation } from '@tanstack/react-query'
import {
  TextField,
  Grid,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material';
import axios from 'axios';
import { NotificationContextType, InitStateType } from "../../types";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import NotificationContext from "../../context/NotificationContext";
import customerService from "../../services/customer"
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
 
  const { addSuccessAction, errorAction, initialMegAction } = useContext(NotificationContext) as NotificationContextType
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

    
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signupMution = useMutation({
    mutationFn: customerService.signupAction,
    onSuccess: (newUser) => {
     // queryClient.invalidateQueries({ queryKey: ['todos'] })
      console.log(newUser);
      const res: InitStateType = {
        message: `User ${newUser.message} is add successed., navigate to login page.!!`,
        errorMessage: null
      }
      addSuccessAction(res)
      navigate("/login")

      setTimeout(() => {
        const res: InitStateType = {
          message: null,
          errorMessage: null
        }

        initialMegAction(res)
      }, 5000)
    },
    onError: (error) => {
      //https://dev.to/mdmostafizurrahaman/handle-axios-error-in-typescript-4mf9
      console.log(error)
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        // Do something with this error...
        const res: InitStateType = {
          message: null,
          errorMessage: error.response?.data
        }
        errorAction(res)
        setTimeout(() => {
          const res: InitStateType = {
            message: null,
            errorMessage: null
          }
          initialMegAction(res)
        }, 5000)
      } else {
        console.error(error);
      }
    }
  })



  const signup = (event: SyntheticEvent) => {
    event.preventDefault();
    if (name.length && username.length && email.length && password.length) {
      signupMution.mutate({ name, username, email, password })
      onReset()
    } else {
      const res: InitStateType = {
        message: null,
        errorMessage: "name or username or email or password cannot empty.."
      }
      errorAction(res)
      setTimeout(() => {
        const res: InitStateType = {
          message: null,
          errorMessage: null
        }
        initialMegAction(res)
      }, 5000)
    }
  };

  const onReset = () => {
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={signup}>
      <Stack>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <TextField
            label="name"
            fullWidth 
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1 }} variant="outlined">
          <TextField
            label="username"
            fullWidth 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1 }} variant="outlined">
          <TextField
            label="email"
            fullWidth 
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
  

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onReset}
            >
              Reset
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Signup
            </Button>
          </Grid>
          </Grid>
        </Stack>
      </form>
    </div>
  );
};

export default SignupForm;