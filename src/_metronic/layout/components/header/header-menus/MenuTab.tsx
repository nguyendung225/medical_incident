import { FC } from 'react'
import clsx from 'clsx'
import { KTSVG } from '../../../../helpers'
import { Link } from 'react-router-dom'

type Props = {
  to?: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
}

const MenuTab: FC<Props> = ({ to, title, icon, fontIcon, hasArrow = false, hasBullet = false }) => {

  return (
    <div className='menu-item me-lg-1'>
      <li className={clsx('menu-link py-3')}
      >
        <Link to={to || '/'} className='d-flex'>
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

        <span className='menu-title'>{title}</span>

        {hasArrow && <span className='menu-arrow'></span>}
        </Link>
      </li>
    </div>
  )
}

export { MenuTab }
