import clsx from 'clsx'
import { KTSVG } from '../../../helpers'
import { HeaderUserMenu } from '../../../partials'
import { useLayout } from '../../core'

const Navbar = () => {
  const { config } = useLayout()

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', 'mx-1 ms-lg-3')}>
        <div className="notification cursor-pointer p-4 mx-3">
          <button type="button" className="btn p-0 position-relative">
            <KTSVG path={'./media/icons/notification.svg'} className={`flex mx-0 p-1`} />
            <span className="badge-pill-style position-absolute badge rounded-pill bg-danger">
              11
            </span>
          </button>
        </div>
        <div
          className={clsx('cursor-pointer d-flex align-items-center', 'symbol-35px symbol-md-40px')}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <div className='spaces px-8 h-20'>
            <i className="bi bi-person-circle fs-1"></i>
          </div>
        </div>
        <div className='cursor-pointer'>
          <p className='m-0 text-white fw-bold'>Nguyễn Văn A</p>
          <div className='flex flex-middle'>
            {/* <p className='m-0 text-white fw-bold'>{room?.name ? room?.name : "Khoa Chẩn đoán hình ảnh"}</p> */}
          </div>
        </div>
        <HeaderUserMenu />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className="svg-icon-1" />
          </div>
        </div>
      )}
    </div>
  )
}

export { Navbar }
