/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage, useAuth } from '../modules/auth'
import { App } from '../App'
import ThemMoiScykPage from '../modules/bao-cao-su-co-y-khoa/components/ThemMoiScykPage'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {
  // const { currentUser } = useAuth()
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route
          path="/bao-cao-su-co-y-khoa"
          element={<ThemMoiScykPage />}
        />
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='/*' element={<PrivateRoutes />} />
          <Route index element={<Navigate to='/ds-bao-cao-scyk' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
