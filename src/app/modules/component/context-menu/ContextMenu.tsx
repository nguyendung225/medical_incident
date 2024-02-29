import React, { useCallback, useEffect, useRef, useState } from "react";

export interface IContextMenu {
    title?: string;
    icon?: JSX.Element;
    code?: string;
    name?: string;
    children?: IContextMenu[];
}

interface ContextMenuProps {
    target?: { x: number; y: number };
    className?: string;
    data?: IContextMenu[];
    handleClickOptionContextMenu?: (value: any) => void;
    handleCloseMenu?: any
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    target,
    className = "",
    data = [],
    handleCloseMenu,
    handleClickOptionContextMenu = () => { },
}) => {
    const menuRefInner = useRef<any>(null);
    const [targetMenu, setTargetMenu] = useState<any>(target);
    const closeMenu = useCallback((event: MouseEvent) => {
        if (targetMenu && !menuRefInner.current?.contains(event.target as Node)) {
            handleCloseMenu?.()
        }
    }, [handleCloseMenu, targetMenu]);


    useEffect(() => {
        document.addEventListener("click", closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, [closeMenu]);
    const [targetMouse, settargetMouse] = useState<any>(null)

    const renderMenu = (data: any, targetMenu: any) => {
        let leftValue = 0
        if (targetMenu?.x + menuRefInner?.current?.clientWidth * 2 > window.innerWidth) {
            leftValue = targetMouse?.left - menuRefInner?.current?.clientWidth - 2;
        } else {
            leftValue = targetMouse?.left + menuRefInner?.current?.clientWidth + 2;
        }
        return (<ul ref={menuRefInner} className='m-0 p-0 drop-list-container spaces W-200'>
            {data?.map((pItem: any) => {
                let hasChildren = pItem?.children?.length > 0;


                return (
                    pItem?.title
                        ? <div className="bg-secondary ps-3 fw-bold fs-5 py-1">{pItem?.title}</div>
                        : <li onClick={() => handleClickOptionContextMenu?.(pItem)} onMouseEnter={(e: any) => {
                            if (hasChildren) settargetMouse(e.target?.getBoundingClientRect())
                        }} className={`position-relative p-1 drop-list-item d-flex justify-content-between align-items-center border-bottom`}>
                            <span className="fs-4 min-w-15px text-center">{pItem?.icon}</span>
                            <div className="d-flex justify-content-between align-items-center w-100 ps-2">
                                <span>{pItem?.name}</span> <span>{hasChildren && <i className="fa-solid fa-caret-right"></i>}</span>
                            </div>

                            {hasChildren &&
                                <div className="position-fixed show-children spaces w-200" style={{ left: `${leftValue}px`, bottom: `${window.innerHeight - targetMouse?.bottom}px` }}>
                                    {targetMenu && renderMenu(pItem?.children, targetMenu)}
                                </div>}
                        </li>
                )
            })}
        </ul>)
    }

    useEffect(() => {
        if (target) {
            const menuWidth = menuRefInner.current?.clientWidth
            const menuHeight = menuRefInner.current?.clientHeight
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            let newTarget = { ...target };

            if (target.x + menuWidth > screenWidth) {
                newTarget = { ...newTarget, x: screenWidth - menuWidth - 50 };
            }

            if (target.y + menuHeight > screenHeight) {
                newTarget = { ...newTarget, y: screenHeight - menuHeight - 50 };
            }

            setTargetMenu(newTarget);
        }
    }, [target]);

    return (
        <div
            style={{ top: targetMenu?.y ?? 0, left: targetMenu?.x + 20 ?? 0 }}
            className={`context-menu position-fixed ${className} z-index-1060`}
        >
            <div className="border">
                {targetMenu && renderMenu(data, targetMenu)}
            </div>
        </div>
    );
};

export default ContextMenu;
