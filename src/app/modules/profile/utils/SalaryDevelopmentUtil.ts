import { filterObject } from "./FunctionUtils";

export const convertDataSubmit = (data: any, employeeId: any) => {
  const dataConvert = {
    ...data,
    chucVuId: data?.chucVu?.id || "",
    chucVuText: data?.chucVu?.value || "",
    chucDanhId: data?.chucDanh?.id || "",
    chucDanhText: data?.chucDanh?.value || "",
    phongBanId: data?.phongBan?.id || "",
    phongBanText: data?.phongBan?.name || "",
    bacId: data?.bac?.id || "",
    bacLuong: data?.bac?.bacLuong || "",
    employeeId: employeeId || ""
  };
  return filterObject(dataConvert);
};

export const convertDataUI = (data: any) => {
  const dataConvert = {
    ...data,
    chucVu: data?.chucVuId
      ? {
          id: data?.chucVuId || "",
          value: data?.chucVuText || ""
        }
      : null,
    chucDanh: data?.chucDanhId
      ? {
          id: data?.chucDanhId || "",
          value: data?.chucDanhText || ""
        }
      : null,
    phongBan: data?.phongBanText
      ? {
          id: data?.phongBanId || "",
          name: data?.phongBanText || ""
        }
      : null,
    bac: data?.bacLuong
      ? {
          id: data?.bacId,
          bacLuong: data?.bacLuong
        }
      : null
  };
  return dataConvert;
};