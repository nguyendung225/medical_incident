//@ts-nocheck
import "../../../../../app/modules/styles/index.scss"
import { MenuItem } from './MenuItem';
import { MenuInnerWithSub } from './MenuInnerWithSub';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../../app/modules/appContext/AppContext';
import { MenuTab } from './MenuTab';
import { localStorageItem } from '../../../../../app/modules/utils/LocalStorage';
import { useLocation } from "react-router-dom";
import { checkIsActive } from "../../../../helpers";
export function MenuInner() {
  const { DSMenu, setEventKey } = useContext(AppContext);
  const [childrenTo, setChildrenTo] = useState<string | undefined>();
  const [isParentActive, setIsParentActive] = useState<boolean>(false);
  const { pathname } = useLocation();

  const handleChange = (id: string | undefined, key: string | undefined, childrenTo: string | undefined) => {
    let data = localStorageItem.get(key) ? localStorageItem.get(key) : [];
    if (!data.includes(id)) {
      data.push(id);
      data.sort((a: string, b: string) => a > b ? 1 : -1);
      localStorageItem.set(key, data)
    }
    setChildrenTo(childrenTo);
    setEventKey(id)
  }

  useEffect(() => {
    if (childrenTo) {
      if (checkIsActive(pathname, childrenTo)) {
        setIsParentActive(true);
      } else {
        setIsParentActive(false);
      }
    }
  }, [pathname, childrenTo])

  const containerRef = useRef(null);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const handleMouseDown = (e:any) => {
    setDragStart(e.clientX);
    setScrollStart(containerRef?.current.scrollLeft);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e:any) => {
    const dragDelta = e.clientX - dragStart;
    containerRef.current.scrollLeft = scrollStart - dragDelta;
  };
  const scrollToLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const scrollToRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

    return (
        <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
                <MenuInnerWithSub
                    title=''
                    to='/dashboard'
                    icon='./media/icons/menu.svg'
                    menuPlacement='bottom-start'
                    menuTrigger='click'
                    freeSize
                >
                </MenuInnerWithSub>
                <i className="bi bi-chevron-bar-left fs-2 cursor-pointer" onClick={scrollToLeft}></i>
                <div className='header-menu-container' ref={containerRef}
                    onMouseDown={handleMouseDown}>
                    <MenuItem
                        to='/phan-he-su-co-y-khoa'
                        title={"Sự cố y khoa"}
                    />
                </div>
            </div>
            <i className="bi bi-chevron-bar-right fs-2 cursor-pointer" onClick={scrollToRight}></i>
        </div>
    );
}