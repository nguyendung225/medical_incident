/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { TSubMenu } from "../../../../../app/pages/Homepage/listMenu";
import { headerConstant } from "../../header/header-menus/constant";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();
  const listMenuSelect = localStorage.getItem(headerConstant?.LIST_SUB_MENU);

  const [listMenuItem, setListMenuItem] = useState<TSubMenu[]>([]);
  useEffect(() => {
    if(!listMenuSelect) return;
    setListMenuItem(JSON.parse(listMenuSelect));
  },[listMenuSelect])

  return (
    <>
      {
        listMenuItem?.map((menuItem: TSubMenu, index: number) => (
          <SidebarMenuItem
            key={index}
            to={menuItem.to}
            title={intl.formatMessage({ id: menuItem?.title })}
            hasBullet={menuItem.hasBullet}
            icon={menuItem.icon}
          />
        ))
      }
    </>
  );
};

export { SidebarMenuMain };

