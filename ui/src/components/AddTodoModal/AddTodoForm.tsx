import { useState, SyntheticEvent, useContext } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  TextField,
  Grid,
  Button,
  FormControl,
  Stack,
  TextareaAutosize as BaseTextareaAutosize 
} from '@mui/material';
import { styled } from '@mui/system';
import todoService from '../../services/todo'
import axios from 'axios';
import NotificationContext from "../../context/NotificationContext"
import { InitStateType, NotificationContextType } from "../../types";


interface Props {
  onCancel: () => void;
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const AddTodoForm = ({ onCancel }: Props) => {
  const queryClient = useQueryClient()
  const { addSuccessAction, errorAction, initialMegAction } = useContext(NotificationContext) as NotificationContextType
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const newMutation = useMutation({
    mutationFn: todoService.create,
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      console.log(newTodo);
      const res: InitStateType = {
        message: `Title ${newTodo.title} is add successed.`,
        errorMessage: null   
      }

      addSuccessAction(res)

      setTimeout(() => {
        const res: InitStateType = {
          message: null,
          errorMessage: null
        }

        initialMegAction(res)
        onCancel()
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



  const addTodo = (event: SyntheticEvent) => {
    event.preventDefault();

    if (title.length && content.length) {
      newMutation.mutate({title, content})
      setTitle('')
      setContent('')
    } else {
      const res: InitStateType = {
        message: null,
        errorMessage: "title or content cannot empty.."
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

  return (
    <div>
      <form onSubmit={addTodo}>
        <Stack>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <TextField
              label="title"
              fullWidth 
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </FormControl>
        
          <FormControl sx={{ m: 1 }} variant="outlined">
           
            <Textarea 
              maxRows={4}
              aria-label="maximum height"
              placeholder="content..."
              value={content}
              onChange={({ target }) => setContent(target.value)}
              
            />
          </FormControl>
        </Stack>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
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
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddTodoForm;