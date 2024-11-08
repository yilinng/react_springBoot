import axios from "axios";
import { AuthResponse, Customer, Login, Signup } from "../types";
import { apiBaseUrl } from "../constants";

let token: string | null = null

//https://gist.github.com/JaysonChiang/fa704307bacffe0f17d51acf6b1292fc
//https://stackoverflow.com/questions/69766132/type-axiosresponseany-is-missing-the-following-properties-from-type-countri
const setToken = (newToken?: String) => {
  token = `Bearer ${newToken}`
}
const getUser = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const { data } = await axios.get<Customer>(
    `${apiBaseUrl}/auth/user`, 
    config
  );

  return data;
};

const loginAction = async (object: Login) => {
  const { data } = await axios.post<AuthResponse>(
    `${apiBaseUrl}/auth/login`,
    object
  );

  return data;
};

const signupAction = async (object: Signup) => {
  const { data } = await axios.post<AuthResponse>(
    `${apiBaseUrl}/auth/signup`,
    object
  );

  return data;
};


/*
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Diagnosis>(
    `${apiBaseUrl}/diagnoses`,
    object
  );

  return data;
};
*/
export default {
  setToken,
  getUser,
  loginAction,
  signupAction
};

