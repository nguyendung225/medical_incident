/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useAuth } from "../../../../../app/modules/auth";
import { UserModelLogin } from "../../../../../app/modules/auth/core/_models";
const SidebarMenuMain = () => {
  const intl = useIntl();
  const { currentUser } = useAuth();
  return (
    <>
      <SidebarMenuItem
        to="/dasboard"
        title={intl.formatMessage({ id: "GENERAL.OVERVIEW" })}
        hasBullet={false}
        icon="/media/icons/duotune/communication/com005.svg"
      />
      <SidebarMenuItem
        to="/profile"
        title={intl.formatMessage({ id: "GENERAL.PROFILE" })}
        hasBullet={false}
        icon="/media/icons/duotune/communication/com005.svg"
      />

      <SidebarMenuItem
        to="/contract"
        title={intl.formatMessage({ id: "GENERAL.CONTRACT" })}
        hasBullet={false}
        icon="/media/icons/duotune/files/fil012.svg"
      />
    </>
  );
};

export { SidebarMenuMain };
