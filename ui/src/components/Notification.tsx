import {useContext} from 'react'
import { Alert } from '@mui/material';
import NotificationContext  from "../context/NotificationContext"
import {NotificationContextType} from "../types"

export default function Notification() {
  
  const { notification } = useContext(NotificationContext) as NotificationContextType
  return (
    <div>
       {notification.errorMessage && <Alert severity="error">{notification.errorMessage}</Alert>}
       {notification.message && <Alert severity="success">{notification.message}</Alert>}
    </div>
  )
}
