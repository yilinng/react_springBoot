import { useEffect, useContext, useState } from "react";

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, amber, lightGreen } from '@mui/material/colors';

import { Todo, NotificationContextType,InitStateType } from "./types";

import todoService from "./services/todo";
import customerService from "./services/customer"
import axios from 'axios';
import TodoListPage from "./components/TodoListPage";
import TodoPage from "./components/TodoPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import NotificationContext from "./context/NotificationContext";
import EditTodoPage from "./components/EditTodoPage";

//https://mui.com/material-ui/customization/palette/#using-in-components
const theme = createTheme({
  palette: {
   // primary: lime,
    secondary: {
      main: cyan[500],
      light: cyan[300],
      contrastText: cyan[50],
    },
    info: {
      main: amber[500],
      light: amber[300],
      contrastText: amber[50],
    },
    success: {
      main: lightGreen[500],
      light: lightGreen[300],
      contrastText: lightGreen[50],
    }
  },
});

const App = () => {
  const queryClient = useQueryClient()
  const { notification, setUserAction, errorAction, logoutSuccessAction, initialMegAction, addSuccessAction } = useContext(NotificationContext) as NotificationContextType

  const [userTodos, setUserTodos] = useState<Todo[]>([]);

  const todos_result = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAll,
    refetchOnWindowFocus: false
  })

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
      setUserTodos(newUser.todos)
      
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

  /*
 useEffect(() => {
    const fetchTodoList = async () => {
      const todos = await todoService.getAll();
      console.log('todos', todos)
      setTodos(todos);
    };
    void fetchTodoList();
  }, []);
 
   */ 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
     // const user = JSON.parse(loggedUserJSON)
      console.log('user', loggedUserJSON)
      //setUser(user)
      const res: InitStateType = {
        user: loggedUserJSON
      }
      setUserAction(res)
      todoService.setToken(loggedUserJSON)
      customerService.setToken(loggedUserJSON)

      getUserMution.mutate()
      
    }
  }, [])

  useEffect(() => {
    console.log(notification)
  }, [notification])

  useEffect(() => {
    if (notification.user && todos_result.data) {     
      console.log(todos_result)   
      getUserMution.mutate()
    }
    
  },[notification.user, todos_result.data])
   

  if (todos_result.isLoading) {
    return<div>loading todo data...</div>
  }

  const todos = todos_result.data as Todo[]

  /*
  if (user_result.isLoading) {
   console.log(user_result)
  }

  const usersTodos = user_result.data?.todos as Todo[]

  console.log(usersTodos)
  /*
  const handleLogin = (obj: Login) => {
    console.log('obj', obj)
    customerService.loginAction(obj).then(user => {
      window.localStorage.setItem(
        'loggedappUser', JSON.stringify(user)
      )
      setUser(user.usernameOrEmail);
     
    
    }).catch((error) => {
      console.log(error);
      setError(error.message);
    })
  
   
  }

  const handleSignup = (obj: Signup) => {
    
    customerService.signupAction(obj).then(user => {
      window.localStorage.setItem(
        'loggedappUser', JSON.stringify(user)
      )
      setUser(user.email);
    }).catch((error) => {
      console.log(error);
      setError(error);
    })

  }
  */
  const handleLogout = () => {
    console.log('logout');
    window.localStorage.clear()
    const res: InitStateType = {
      message: null,
      errorMessage: null,
      user: null
    }
    logoutSuccessAction(res)
    setUserTodos([])
  }


  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Todo
          </Typography>
          <ThemeProvider theme={theme}>
            <Stack  direction="row"
              spacing={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            {notification.user === null ? <>
            <Button component={Link} to="/login" variant="contained" color="secondary">
              Login
            </Button>
            <Button component={Link} to="/signup" variant="contained" color="success">
              signup
            </Button>
            </> : 
            <Button variant="contained" color="info" onClick={handleLogout}>
              logout
            </Button>
              }
              </Stack>
          </ThemeProvider>
        
          <Divider hidden />
          <Routes>
            <Route path="/todos/:id" element={<TodoPage todos={todos} />} />
            <Route path="/todos/:id/edit" element={<EditTodoPage todos={todos} />}  />
            <Route path="/" element={<TodoListPage todos={todos} notification={notification} userTodos={userTodos} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
