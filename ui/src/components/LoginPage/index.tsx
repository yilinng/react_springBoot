import LoginForm from './LoginForm'
import Notification from '../Notification';

export default function LoginPage() {
  return (
    <div className='login'>
      <h2>Login</h2>
      <Notification/>
      <LoginForm/>
    </div>
  )
}
