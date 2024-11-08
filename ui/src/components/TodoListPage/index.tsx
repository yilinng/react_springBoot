import { useState, useContext, useEffect } from "react";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody
} from '@mui/material';
import {Link} from "react-router-dom";
import { Todo, InitStateType, NotificationContextType } from "../../types";
import AddTodoModal from "../AddTodoModal";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from "../../context/NotificationContext";
import todoService from "../../services/todo"
import axios from 'axios';
import DeleteDialog from "./DeleteDialog";

interface Props {
  todos: Todo[];
  notification: InitStateType;
  userTodos?: Todo[];
  //setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const sliceTxt = (txt: string):string => {
  if (txt.length > 30) return txt.slice(0, 30) + "..."
  return txt
}

const TodoListPage = ({ todos, notification, userTodos }: Props) => {
 
  const queryClient = useQueryClient()
  const { addSuccessAction, errorAction, initialMegAction } = useContext(NotificationContext) as NotificationContextType

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [todosId, setTodosId] = useState<string[]>()

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (userTodos && userTodos.length) {
      //console.log(userTodos)
      const arr = userTodos.map(todo => todo.id.toString())
      //console.log(arr)
      setTodosId(arr);
      //usersTodos from is string have to split to array
      /*
      const [_, ...others] = userTodos.split("Todo")
      console.log(others)
      const arr: string[] = []
     
     // console.log(others)
      others.map(todo => {
        if (todo.indexOf('id=') !== -1) {
         arr.push(todo[todo.indexOf('id=') + 3])
        }
      })
  
      setTodosId(arr)
     
      console.log(arr)
      */
    }
  },[userTodos && userTodos.length])



  const deleteMutation = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: (todoRes) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      console.log(todoRes);
      const res: InitStateType = {
        message: `User ${todoRes.message}` ,
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

  const handleClose = (newValue?: Todo) => {
    setOpen(false);
    if (newValue) {
      deleteMutation.mutate(newValue.id)
    }
  };

  const handleDelete = (obj: Todo) => {
    setOpen(true)
    console.log('handleDelete', obj)
  }

  /*
  const submitNewTodo = async (values: TodoFormValues) => {
    
    try {
     // const todo = await todoService.create(values);
     // setTodos(todos.concat(todo));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
    
  };
  */
  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Todo list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>title</TableCell>
            <TableCell>Content</TableCell>
           
            <TableCell>link</TableCell>
            {notification.user && <TableCell>edit</TableCell>}
           
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(todos).map((todo: Todo) => (  
            <TableRow key={todo.id}>
              <TableCell>{sliceTxt(todo.title)}</TableCell>
              <TableCell>{sliceTxt(todo.content)}</TableCell>
              <TableCell>
                <Link to={`/todos/${todo.id}`}>todo details</Link>
              </TableCell>
             
              {notification.user && 
              <TableCell>
                {todosId?.includes(todo.id.toString()) ? <>
                <Button onClick={() => handleDelete(todo)}>delete</Button>
                <Link to={`/todos/${todo.id}/edit`}>todo edit</Link>
                <DeleteDialog onClose={handleClose} open={open} value={todo} />
                </>: <p>You are not authorized to access this ...</p>}             
                </TableCell>
              }
              </TableRow>
              
          ))}
        </TableBody>
      </Table>
      <AddTodoModal
        modalOpen={modalOpen}
        onClose={closeModal}
      />
      {notification.user !== null && 
      <Button variant="contained" onClick={() => openModal()}>
        Add New Todo
        </Button>
      }
    </div>
  );
};

export default TodoListPage;
