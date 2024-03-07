import { MODULE, PERMISSIONS, PERMISSION_ABILITY } from "../../Constant"

export type TMenu = {
  title: string,
  to: string,
  name: string,
  permission: string,
  ability: string,
  subMenu: TSubMenu[]
}

export type TSubMenu = {
  title: string,
  to: string,
  hasBullet: boolean,
  icon: string,
  permission: string,
  ability: string,
}

export const allMenu: TMenu[] = [
  {
    title: "Quản lý ca bệnh",
    to: "/ds-bao-cao-scyk",
    name: "ds-bao-cao-scyk",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.HO_SO,
    subMenu: [
      {
        title: "Báo cáo SCYK",
        to: "/ds-bao-cao-scyk",
        hasBullet: false,
        icon: "/media/svg/icons/warning-fill.svg",
        permission: PERMISSIONS.EMPLOYEE,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "Biên bản xác minh",
        to: "/bien-ban-xac-minh",
        hasBullet: false,
        icon: "/media/svg/icons/file-earmark-check-fill.svg",
        permission: PERMISSIONS.EMPLOYEE,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "Phân tích SCYK",
        to: "/phan-tich-scyk",
        hasBullet: false,
        icon: "/media/svg/icons/info-square-fill.svg",
        permission: PERMISSIONS.EMPLOYEE,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "Biên bản họp",
        to: "/bien-ban-hop",
        hasBullet: false,
        icon: "/media/svg/icons/folder-fill.svg",
        permission: PERMISSIONS.EMPLOYEE,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "Báo cáo",
        to: "/bao-cao",
        hasBullet: false,
        icon: "/media/svg/icons/bookmark-fill.svg",
        permission: PERMISSIONS.EMPLOYEE,
        ability: PERMISSION_ABILITY.VIEW,
      },
    ]
  },
]