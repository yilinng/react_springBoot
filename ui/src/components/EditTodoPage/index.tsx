import Notification from '../Notification';
import { Divider } from '@mui/material';
import EditTodoForm from './EditTodoForm';
import { Todo } from '../../types'

interface Props {
  todos: Todo[];
}

export default function EditTodoPage({todos }: Props) {
  return (
    <div className='editTodo'>
       <h2>Edit Todo</h2>
    <Divider />
      <Notification/>
      <EditTodoForm todos={todos} />
    </div>
  )
}
