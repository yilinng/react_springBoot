import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';
import Notification from '../Notification';
import AddTodoForm from "./AddTodoForm";


interface Props {
  modalOpen: boolean;
  onClose: () => void;
}

const AddTodoModal = ({ modalOpen, onClose }: Props) => {

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new todo</DialogTitle>
      <Divider />
      <DialogContent>
        <Notification/>
        <AddTodoForm onCancel={onClose}/>
      </DialogContent>
    </Dialog>
   ) 

  };

export default AddTodoModal;
