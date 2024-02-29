import { useNavigate } from 'react-router-dom'
import { HeaderUserMenu, ThemeModeSwitcher } from '../../../_metronic/partials'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import clsx from 'clsx'
import { Languages } from '../../../_metronic/partials/layout/header-menus/Languages'
import './homepage.scss'

const userAvatarClass = 'symbol-35px symbol-md-40px'
export function HomePage() {
  const itemClass = 'ms-1 ms-lg-3'
  const navigate = useNavigate()
  const handleButtonClick= (to: string) => {
    navigate(to)
  };

  return (
    <div className='main'>
      <div className='header d-flex justify-content-xl-between'>
        <img src='media/logos/logo_OCT.png'></img>
        <div className='app-navbar flex-shrink-0'>
          <div className='toggle-language'>
            <Languages />
          </div>
          <div className={clsx('app-navbar-item', itemClass)}>
            <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
          </div>

          <div className={clsx('app-navbar-item', itemClass)}>
            <div
              className={clsx('cursor-pointer symbol', userAvatarClass)}
              data-kt-menu-trigger="{default: 'click'}"
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
            >
              <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='' />
            </div>
            <HeaderUserMenu />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='button-group'>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/phan-he-tiep-nhan")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Tiếp nhận</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/ds-tiep-don")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Ngoại trú</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/phan-he-noi-tru/tiep-don")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Nội trú</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Cấp cứu</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/test")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Xét nghiệm</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/cdha-tdcn")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>CĐHA và TDCN</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/phau-thuat-thu-thuat")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Phẫu thuật thủ thuật</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/fee-and-insurance")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Viện phí và Bảo hiểm</span>
          </div>
          {/* <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Quản lý nhân sự</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Quản lý tài sản</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Dược</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Yêu cầu bảo hiểm</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Kế toán - Tài chính</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>EMR</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Báo cáo thống kê</span>
          </div>
          <div className='item-button'>
            <button
              className='btn btn-light-primary fw-bolder btn-homepage'
              onClick={() => handleButtonClick("/dashboard")}>
              <img src='media/images/button.png'></img>
            </button>
            <span className='title-button'>Quản trị hệ thống</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}