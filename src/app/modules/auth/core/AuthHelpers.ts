import { localStorageItem } from './../../utils/LocalStorage';
import { AuthModel, ResponseModel } from './_models'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { KEY_LOCALSTORAGE, RESPONSE_STATUS_CODE } from './_consts';

function isTokenExpired() {
  const token = localStorageItem.get(KEY_LOCALSTORAGE.AUTH);
  const expirationTime = localStorageItem.get(KEY_LOCALSTORAGE.TOKEN_EXPIRATION);

  if (token && expirationTime) {
    const expirationTimestamp = parseInt(expirationTime);
    const currentTime = Date.now();

    if (expirationTimestamp < currentTime) {
      return false; 
    } else {
      return true; 
    }
  } else {
    return false; 
  }
}

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = isTokenExpired() ? localStorageItem.get(KEY_LOCALSTORAGE.AUTH) : null
  
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = lsValue as unknown as AuthModel
    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    let expiration = new Date().getTime() + auth.expires_in * 1000;
    localStorageItem.set(KEY_LOCALSTORAGE.AUTH, auth)
    localStorageItem.set(KEY_LOCALSTORAGE.TOKEN_EXPIRATION, expiration)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorageItem.remove(KEY_LOCALSTORAGE.AUTH)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const handleRequest = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
  const { headers = {} } = requestConfig

  const auth = getAuth()
  if (auth && auth.access_token) {
    headers.Authorization = `Bearer ${auth.access_token}`
  }

  return requestConfig
}

const handleResponse = (responseConfig: AxiosResponse<ResponseModel>) => {
  const { data } = responseConfig

  switch (data.code) {
    case RESPONSE_STATUS_CODE.SUCCESS:
      break
    case RESPONSE_STATUS_CODE.CREATED:
    case RESPONSE_STATUS_CODE.NO_CONTENT:
      toast.success(data.message)
      break
    default:
      break
  }

  return responseConfig
}

const handleError = (error: AxiosError<ResponseModel>): Promise<AxiosError<ResponseModel>> => {
  const { isAxiosError, response } = error

  if (isAxiosError) {
    switch (response?.data.code) {
      case RESPONSE_STATUS_CODE.UNAUTHORIZED:
        break
      case RESPONSE_STATUS_CODE.BAD_REQUEST:
      case RESPONSE_STATUS_CODE.FORBIDDEN:
      case RESPONSE_STATUS_CODE.NOT_FOUND:
      case RESPONSE_STATUS_CODE.METHOD_NOT_ALLOWED:
      case RESPONSE_STATUS_CODE.CONFLICT:
      case RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR:
      case RESPONSE_STATUS_CODE.BAD_GATEWAY:
        // toast.error(response.data.message)
        break
      default:
        break
    }
  }

  return Promise.reject(error)
}

export function setupAxios(axios: any) {
  axios.defaults.timeout = 15000
  axios.defaults.headers.common = {
    Accept: 'application/json',
  }
  axios.interceptors.request.use(handleRequest, handleError)
  axios.interceptors.response.use(handleResponse, handleError)
}

export { getAuth, setAuth, removeAuth }