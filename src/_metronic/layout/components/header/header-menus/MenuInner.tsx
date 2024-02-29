import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import "../../../../../app/modules/styles/index.scss";
import { TMenu,  } from '../../../../../app/pages/Homepage/listMenu';
import { MenuItem } from './MenuItem';
import { KTSVG } from '../../../../helpers';
import { checkMenuByPermissions } from '../../../../../app/modules/utils/FunctionUtils';
import { useEffect, useState } from 'react';
import { setSubMenu } from '../../../../../app/modules/auth';

export function MenuInner() {
  const intl = useIntl();
  const checkedMenu = checkMenuByPermissions();

  const handleButtonClick = (name: string) => {
    setSubMenu(name)
  };
  
  useEffect(() => {
    const tabList:any = document.querySelector('.header-list-nav');
    const isScroll = tabList.clientWidth < tabList?.scrollWidth;
    const rightArrow = document.querySelector('.header-list-nav-container .arrow-right');
    const leftArrow = document.querySelector('.header-list-nav-container .arrow-left');
    if(isScroll) {
      rightArrow?.classList?.remove("hidden");
      const handleShowIcon = () => {
        if(tabList) {
          if(tabList.scrollLeft >= 20) {
            leftArrow?.classList?.remove("hidden");
          } else {
            leftArrow?.classList?.add("hidden");
          }
  
          const maxScrollValue = tabList.scrollWidth - tabList.clientWidth - 20;        
          if(tabList.scrollLeft >= maxScrollValue) {
            rightArrow?.classList?.add("hidden");
          } else {
            rightArrow?.classList?.remove("hidden");
          }
        }
      }
      rightArrow?.addEventListener('click', () => {
        if(tabList) {
          tabList.scrollLeft += 100;
          handleShowIcon();
        }
      });
      leftArrow?.addEventListener('click', () => {
        if(tabList) {
          tabList.scrollLeft -= 100;
          handleShowIcon();
        }
      });
      tabList?.addEventListener('scroll', handleShowIcon);
    }
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className='header-brand'>
        <div className='header-brand-link w-100 flex flex-middle flex-center' >
          <Link to="/home" className='white spaces fs-16 fw-700'>HỆ THỐNG QUẢN LÝ SỰ CỐ Y KHOA</Link>
        </div>
      </div>
      <div className="header-list-nav-container">
        <KTSVG path='/media/icons/arrow-left.svg' className="text-white arrow-left hidden" svgClassName={`position-absolute`}/>
        <div className="header-list-nav">
          {/* {checkedMenu?.map((item: TMenu, index: number) => {
            return (
              <MenuItem key={index} title={intl.formatMessage({ id: item?.title })} to={item?.to} onClick={() => handleButtonClick(item?.to)} />
            )
          })} */}
        </div>
        <KTSVG path='/media/icons/arrow-left.svg' className="text-white arrow-right hidden" svgClassName={`position-absolute`}/>
      </div>
    </div>
  );
}
