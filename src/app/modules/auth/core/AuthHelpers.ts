import { AuthModel, ResponseModel } from './_models'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { KEY_LOCALSTORAGE, RESPONSE_STATUS_CODE } from './_consts';
import { headerConstant } from '../../../../_metronic/layout/components/header/header-menus/constant';
import { checkMenuByPermissions } from '../../utils/FunctionUtils';
import { localStorageItem } from '../../utils/LocalStorage';

const AUTH_LOCAL_STORAGE_KEY = KEY_LOCALSTORAGE.AUTH_LOCAL_STORAGE_KEY

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth && (auth.expires_date_out < (new Date()).getTime())) return undefined;

    return auth;
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }
  try {
    const newDate = new Date();
    auth.expires_date_out = newDate.setSeconds(newDate.getSeconds() + auth.expires_in);
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}
const setSubMenu = (to: string = '/ds-bao-cao-scyk') => {
  const checkedMenu = checkMenuByPermissions();

  if (to) {
    const selectedMenu = checkedMenu.find((menu) => menu.to === to);
    selectedMenu && localStorage.setItem(headerConstant.LIST_SUB_MENU, JSON.stringify(selectedMenu?.subMenu));
    return;
  }

  //sau phân quyền
  // if (localStorageItem.get(headerConstant.AUTHORITIES)) {
  // const pathname = new URL(window.location.href).pathname;
  // const selectSubMenu = checkedMenu?.filter(menu => menu?.to === (pathname ? pathname : headerConstant.DEFAULT_MODULE)) || [];
  // localStorage.setItem(headerConstant.LIST_SUB_MENU, JSON.stringify(selectSubMenu?.length > 0 ? selectSubMenu[0].subMenu : []));
  // }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    localStorage.removeItem(headerConstant.LIST_MENU)
    localStorage.removeItem(headerConstant.LIST_SUB_MENU)
    localStorage.removeItem(headerConstant.AUTHORITIES)
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
    //   toast.success(data.message)
      break
    default:
      break
  }

  return responseConfig
}

const logoutAuth = () => {
  localStorageItem.remove(KEY_LOCALSTORAGE.AUTH)
  localStorageItem.remove(KEY_LOCALSTORAGE.ACCESS_TOKEN_DECODE)
  localStorageItem.remove(KEY_LOCALSTORAGE.TOKEN_EXPIRATION)
  localStorageItem.remove(KEY_LOCALSTORAGE.DEPARTMENT)
  localStorageItem.remove(KEY_LOCALSTORAGE.ROOM)
  window.location.href = `${process.env.REACT_APP_SSO_LOGOUT_URL}?redirect_uri=${process.env.REACT_APP_SSO_AUTHORIZE_ENDPOINT}%3Fresponse_type%3D${process.env.REACT_APP_SSO_RESPONSE_TYPE}%26scope%3D${process.env.REACT_APP_SSO_SCOPE}%26client_id=${process.env.REACT_APP_SSO_CLIENT_ID}%26redirect_uri%3D${process.env.REACT_APP_SSO_REDIRECT_URI}`;
}

const handleError = (error: AxiosError<ResponseModel>): Promise<AxiosError<ResponseModel>> => {
  const { isAxiosError, response } = error
  if (isAxiosError) {
    switch (response?.status) {
      case RESPONSE_STATUS_CODE.UNAUTHORIZED:
        logoutAuth()
        break
      case RESPONSE_STATUS_CODE.BAD_REQUEST:
      case RESPONSE_STATUS_CODE.FORBIDDEN:
      case RESPONSE_STATUS_CODE.NOT_FOUND:
      case RESPONSE_STATUS_CODE.METHOD_NOT_ALLOWED:
      case RESPONSE_STATUS_CODE.CONFLICT:
      case RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR:
      case RESPONSE_STATUS_CODE.BAD_GATEWAY:
        response?.data?.data?.forEach((error: any) => {
          toast.error(error?.message)
        })
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

export { getAuth, setAuth, removeAuth, setSubMenu, logoutAuth, AUTH_LOCAL_STORAGE_KEY }