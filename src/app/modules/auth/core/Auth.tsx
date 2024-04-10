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
import { sendTokenRequest } from './_requests'
import { WithChildren } from '../../../../_metronic/helpers'
import { AUTHORIZE_REQUEST, KEY_LOCALSTORAGE } from './_consts'
import { localStorageItem } from '../../utils/LocalStorage'
import jwt_decode from "jwt-decode";
import { headerConstant } from '../../../../_metronic/layout/components/header/header-menus/constant'

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
    saveAuth(undefined)
    setCurrentUser(undefined)
    authHelper.logoutAuth()
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const setAuthoritiesToLocalStorage = (tokenDecode: any) => {
  const permissionObj: { [key: string]: boolean; } = {};
  for (const permission of tokenDecode?.authorities || tokenDecode?.scope) {
    permissionObj[permission] = true;
  }
  localStorage.setItem(headerConstant.AUTHORITIES, JSON.stringify(permissionObj));
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, saveAuth } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const code = new URL(window.location.href).searchParams.get("code")

  useEffect(() => {
    const requestUser = async (id_token: string) => {
      try {
        if (!didRequest.current) {
          const tokenDecode = jwt_decode(id_token)
          if (tokenDecode) {
            localStorageItem.set(KEY_LOCALSTORAGE.ACCESS_TOKEN_DECODE, tokenDecode)
            authHelper.setSubMenu()
            setAuthoritiesToLocalStorage(tokenDecode);
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
          .catch(() => {
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
