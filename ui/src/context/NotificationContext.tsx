import { createContext, useReducer } from 'react'
import { InitStateType, ActionEntry, NotificationContextType } from '../types'

//https://blog.logrocket.com/how-to-use-react-context-typescript/
//https://stackoverflow.com/questions/65889422/context-provider-in-typescript
const initState: InitStateType = {
  message: null,
  errorMessage: null,
  user: null,
}

const notificationReducer = (state: InitStateType, action: ActionEntry): InitStateType => {
  switch (action.type) {
    case "ADD_SUCCESS":
      return { ...state, message: action.payload }
    case "INITIAL_MEG":
      return { ...state, message: null, errorMessage: null }
    case "ERROR":
      return { ...state, errorMessage: action.payload }
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload }
    case "LOGOUT_SUCCESS":
      return { ...state, user: null }
    case "SET_USER":
      return { ...state, user: action.payload }
    default:
      return state
  }
}

const NotificationContext = createContext<NotificationContextType | null>(null)


export const NotificationContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initState)

  const addSuccessAction = (notification: InitStateType): void => notificationDispatch({
    type: "ADD_SUCCESS", payload: notification.message
  })

  const initialMegAction = (notification: InitStateType): void => notificationDispatch({
    type: "INITIAL_MEG", payload: notification.message
  })

  const errorAction = (notification: InitStateType): void => notificationDispatch({
    type: "ERROR", payload: notification.errorMessage
  })

  const loginSuccessAction = (notification: InitStateType): void => notificationDispatch({
    type: "LOGIN_SUCCESS", payload: notification.user
  })

  const logoutSuccessAction = (notification: InitStateType): void => notificationDispatch({
    type: "LOGOUT_SUCCESS", payload: notification.user
  })

  const setUserAction = (notification: InitStateType): void => notificationDispatch({
    type: "SET_USER", payload: notification.user
  })


  return (
    <NotificationContext.Provider value={{ notification, addSuccessAction, initialMegAction, errorAction, loginSuccessAction, logoutSuccessAction, setUserAction  }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
