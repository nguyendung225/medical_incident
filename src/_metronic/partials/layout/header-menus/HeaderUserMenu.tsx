/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import { useIntl } from 'react-intl';
const HeaderUserMenu: FC = () => {
  const intl = useIntl();
  const {logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      {/* <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.first_name} {currentUser?.first_name}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>
      <div className='separator my-2'></div> */}
      {/* <Languages />
      <div className='menu-item px-5 mb-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5 py-2'>
        {intl.formatMessage({ id: 'USER.ACCOUNT.SETTING' })}
        </Link>
      </div> */}
      <div className='menu-item px-5 mb-1'>
        <a onClick={logout} className='menu-link px-5 py-2'>
        {intl.formatMessage({ id: 'LOGOUT' })}
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
