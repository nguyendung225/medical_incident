import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { HeaderUserMenu } from '../../../partials'
import {useLayout} from '../../core'
import NotificationsBox from '../../../partials/layout/header-menus/NotificationsBox'
import { KEY_LOCALSTORAGE } from '../../../../app/modules/auth/core/_consts'
import { hasAuthority } from '../../../../app/modules/utils/FunctionUtils'
import { PERMISSIONS, PERMISSION_ABILITY } from '../../../../app/Constant'
import { useEffect, useState } from 'react'

const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  const {config} = useLayout();
  const accessTokenDecode = localStorage.getItem(KEY_LOCALSTORAGE?.ACCESS_TOKEN_DECODE);
  const [accessTokenInfo, setAccessTokenInfo] = useState<any>();

  useEffect(() => {
    if (!accessTokenDecode) return;
    setAccessTokenInfo(JSON.parse(accessTokenDecode));
  },[accessTokenDecode, accessTokenInfo])

  return (
    <div className='app-navbar flex-shrink-0'>
      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div> */}

      <div className={clsx('app-navbar-item')}>
        {/* <div className="notification cursor-pointer p-4">
          <KTSVG path={'/media/icons/notification.svg'} className={`svg-icon-2`} />
        </div> */}
        {hasAuthority(PERMISSIONS.TIEP_NHAN, PERMISSION_ABILITY.VIEW) && (
          <div className="notification cursor-pointer p-4 mx-3">
            <NotificationsBox />
          </div>
        )}
        <div
          className={clsx('cursor-pointer')}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='' width={24} height={24} className='avatar rounded-circle'/>
        </div>
        <div className='header-user-info color-white'>
          <div className="name">{accessTokenInfo?.sub}</div>
        </div>
        <HeaderUserMenu />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export {Navbar}
