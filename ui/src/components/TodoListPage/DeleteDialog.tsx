import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button
} from '@mui/material';

import { Todo } from "../../types"

interface Props {
  value: Todo;
  open: boolean;
  onClose: (value?: Todo) => void;
}


export default function DeleteDialog({value, open, onClose}: Props) {
 
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value)
  };

  return (
      <div>
        <Dialog
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
          maxWidth="xs"
          open={open}
        >
        <DialogTitle>Alert: Delete Action</DialogTitle>
        <DialogContent dividers>
          Do you want to delete { value.title}?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
