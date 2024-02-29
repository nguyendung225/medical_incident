import { useEffect, useRef, useState } from 'react'
import './Menu.scss'

export interface IItemMenu {
    code: string;
    name: string;
}

type Props = {
    menuLabel: any;
    listMenuItem: any;
    handleSelectOption: (option: IItemMenu) => void;
    className?: string;
}

export default function CustomMenu({ menuLabel, listMenuItem, handleSelectOption, className }: Props) {
    const [openMenu, setOpenMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const closeMenu = (event: MouseEvent) => {
        if (openMenu && !menuRef.current?.contains(event.target as Node) && !containerRef.current?.contains(event.target as Node)) {
            setOpenMenu(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [openMenu])

    return (
        <>
            <div ref={containerRef} className={`custom-menu-container spaces W-50 ${className}`}>
                <div onClick={() => setOpenMenu((prev) => !prev)}>
                    {menuLabel}
                </div>
                {openMenu &&
                    <div ref={menuRef} className='menu-popup'>
                        {listMenuItem?.map((menu: any) => (
                            <>
                                <div className='fw-bold bg-secondary ps-1 fs-5'>{menu?.groupName}</div>
                                {menu?.listItem?.map(((item: any) => <div
                                    className="menu-item ps-3 py-1 pe-2"
                                    onClick={() => { handleSelectOption(item); setOpenMenu(!openMenu) }}
                                >
                                    {item?.name}
                                </div>
                                ))}
                            </>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}