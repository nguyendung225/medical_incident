import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/oauth/check_token`
export const LOGIN_URL = `${API_URL}/oauth/token`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, new URLSearchParams({
    username: email, //gave the values directly for testing
    password: password,
    client_id: 'core_client',
    grant_type: 'password',
    client_secret: 'secret'
  }))
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  const checkTokenRequest = axios.create();
  return checkTokenRequest.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {}, { params: { token: token }  ,headers: {
    Authorization: 'Basic Y29yZV9jbGllbnQ6c2VjcmV0' 
  }})
}

export const sendTokenRequest = async (code: string) => {
  const body = [];
  body.push(`code=${code}`);
  body.push(`grant_type=${process.env.REACT_APP_SSO_GRANT_TYPE}`);
  body.push(`redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URI}`);

  const { data: auth } = await axios.post<AuthModel>(`${process.env.REACT_APP_SSO_TOKEN_ENDPOINT}`, body.join("&"), getTokenRequestHeaders())
  return auth;
};

const getTokenRequestHeaders = () => {
  let client_id = `${process.env.REACT_APP_SSO_CLIENT_ID}`;
  let secret = `${process.env.REACT_APP_SSO_CLIENT_SECRET}`;
  let base64Token = 'Basic ' + btoa(client_id + ':' + secret);
  return {
    headers: {
      "Authorization": base64Token,
      "Accept": "application/json",
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_SSO_CLIENT_URL}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
};