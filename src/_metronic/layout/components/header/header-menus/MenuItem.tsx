import {FC, useContext} from 'react'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {checkIsActive, KTSVG} from '../../../../helpers'
import { menu } from '../../../../../app/modules/appContext/AppContextModel'
import { localStorageItem } from '../../../../../app/modules/utils/LocalStorage'
import { AppContext } from '../../../../../app/modules/appContext/AppContext'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
  menu?: menu
}

const MenuItem: FC<Props> = ({to, title, icon, fontIcon, hasArrow = false, hasBullet = false, menu}) => {
  const {pathname} = useLocation();
  const { setEventKey } = useContext(AppContext);

  const handleClickMenuItem = (id: string | undefined, key: string | undefined) => {
    let data = localStorageItem.get(key) ? localStorageItem.get(key) : [];
    if (!data.includes(id)) {
      data.push(id);
      data.sort((a: string, b: string) => a > b ? 1 : -1);
      localStorageItem.set(key, data)
    }
    setEventKey(id)
  }

  return (
    <div className='menu-item me-lg-1' onClick={() => handleClickMenuItem(menu?.id, menu?.key)}>
      <Link
        onDragStart={(e) => { e.preventDefault() }}
        className={clsx('menu-link py-4', {
          'active menu-here': checkIsActive(pathname, to),
        })}
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}

        {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title text-white'>{title}</span>

        {hasArrow && <span className='menu-arrow text-white'></span>}
      </Link>
    </div>
  )
}

export {MenuItem}
