import { useState, SyntheticEvent, useContext } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import { NotificationContextType, InitStateType } from '../../types'
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

import { VisibilityOff, Visibility } from "@mui/icons-material";
import NotificationContext from "../../context/NotificationContext";
import customerService from '../../services/customer'
import todoService from '../../services/todo'
import axios from 'axios';


const LoginForm = () => {

  const queryClient = useQueryClient()
  const { loginSuccessAction, errorAction, initialMegAction, addSuccessAction } = useContext(NotificationContext) as NotificationContextType

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getUserMution = useMutation({
    mutationFn: customerService.getUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      console.log(newUser);
      const res: InitStateType = {
        message: `GetUser: ${newUser.username}` ,
        errorMessage: null
      }
    
      addSuccessAction(res)

      setTimeout(() => {
        const res: InitStateType = {
          message: null,
          errorMessage: null,      
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
          errorMessage: error.response?.data,
        }
        errorAction(res)
        setTimeout(() => {
          const res: InitStateType = {
            message: null,
            errorMessage: null,
          }
          initialMegAction(res)
        }, 5000)
      } else {
        console.error(error);
      }
    }
  })

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const loginMutation = useMutation({
    mutationFn: customerService.loginAction,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      console.log(newUser);
      const res: InitStateType = {
        message: `Login: ${newUser.message}` ,
        errorMessage: null,
        user: newUser.accessToken
      }
      if (newUser.accessToken) {
        loginSuccessAction(res)
        window.localStorage.setItem('loggedappUser', newUser.accessToken) 
        customerService.setToken(newUser.accessToken)
        todoService.setToken(newUser.accessToken)
        getUserMution.mutate()
       
        navigate('/')
        
      }

      setTimeout(() => {
        const res: InitStateType = {
          message: null,
          errorMessage: null,      
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
          errorMessage: error.response?.data,
        }
        errorAction(res)
        setTimeout(() => {
          const res: InitStateType = {
            message: null,
            errorMessage: null,
          }
          initialMegAction(res)
        }, 5000)
      } else {
        console.error(error);
      }
    }
  })



  const login = (event: SyntheticEvent) => {
    event.preventDefault();
    if (usernameOrEmail.length && password.length) {
      
      loginMutation.mutate({usernameOrEmail, password})
      onReset()
    } else {
      const res: InitStateType = {
        message: null,
        errorMessage: "userNameOrEmail or password cannot empty.."
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
      
    /*
    try {
      const user = await customerService.loginAction({ usernameOrEmail, password });

      window.localStorage.setItem(
        'loggedappUser', JSON.stringify(user)
      ) 

      setUsernameOrEmail('')
      setPassword('')
    } catch (execption) {
      
    }
    */
   
  };

  const onReset = () => {
    setUsernameOrEmail('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={login}>
        <Stack>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <TextField
            label="usernameOrEmail"
            fullWidth 
            value={usernameOrEmail}
            onChange={({ target }) => setUsernameOrEmail(target.value)}
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
              login
            </Button>
          </Grid>
          </Grid>
          </Stack>
      </form>
      </div>
     
  );
};

export default LoginForm;