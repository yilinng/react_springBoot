import { Divider } from '@mui/material';
import SignupForm from "./SignupForm";
import Notification from '../Notification';

const SignupPage = () => {
  return (
    <div className='signup'>
    <h2>Signup</h2>
    <Divider />
      <Notification/>
      <SignupForm />
  </div>
  )
};

export default SignupPage;
