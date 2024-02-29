import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, UserModel, UserModelLogin } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken, sendTokenRequest } from './_requests'
import { WithChildren } from '../../../../_metronic/helpers'
import jwt_decode, { JwtPayload }  from "jwt-decode";
import { localStorageItem } from '../../utils/LocalStorage'
import { AUTHORIZE_REQUEST, KEY_LOCALSTORAGE } from './_consts'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | UserModelLogin | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | UserModelLogin | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | UserModelLogin | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    if(auth){
      localStorageItem.remove(KEY_LOCALSTORAGE.AUTH)
      localStorageItem.remove(KEY_LOCALSTORAGE.ACCESS_TOKEN_DECODE)
      localStorageItem.remove(KEY_LOCALSTORAGE.TOKEN_EXPIRATION)
      localStorageItem.remove(KEY_LOCALSTORAGE.DEPARTMENT)
      localStorageItem.remove(KEY_LOCALSTORAGE.ROOM)
      window.location.href = `${process.env.REACT_APP_SSO_LOGOUT_URL}?redirect_uri=${process.env.REACT_APP_SSO_AUTHORIZE_ENDPOINT}%3Fresponse_type%3D${process.env.REACT_APP_SSO_RESPONSE_TYPE}%26scope%3D${process.env.REACT_APP_SSO_SCOPE}%26redirect_uri%3D${process.env.REACT_APP_SSO_REDIRECT_URI_SHELL}%26client_id%3D${process.env.REACT_APP_SSO_CLIENT_ID_SHELL}`;
      
    }else{
      window.location.href = AUTHORIZE_REQUEST
    }
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser, saveAuth } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const code = new URL(window.location.href).searchParams.get("code")

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (id_token: string) => {
      try {
        if (!didRequest.current) {
          const tokenDecode = jwt_decode(id_token)
          if(tokenDecode){
            localStorageItem.set(KEY_LOCALSTORAGE.ACCESS_TOKEN_DECODE,tokenDecode)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
        window.location.href = AUTHORIZE_REQUEST
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (process.env.REACT_APP_SSO_ENABLE) {
      if (code && !auth) {
        sendTokenRequest(code).then((resAuth) => {
          saveAuth(resAuth);
          requestUser(resAuth.id_token);
        })
        .catch(()=>{
          window.location.href = AUTHORIZE_REQUEST
        })
      } else if (!auth) {
        window.location.href = AUTHORIZE_REQUEST
      } else {
        requestUser(auth.access_token);
      }
    } else {
      if (auth && auth.access_token) {
        requestUser(auth.access_token)
      } else {
        window.location.href = AUTHORIZE_REQUEST
      }
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
