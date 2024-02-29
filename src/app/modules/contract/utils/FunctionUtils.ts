import { OptionReactSelect } from "../../models/models";
import { CODE_HDLD } from "../../profile/const/DialogConstant";

export const convertDataUI = (data: any) => {
  let contract: any = {
    ...data,
    donViKyHopDong: data?.donViKyHopDongId
      ? {
        id: data?.donViKyHopDongId,
        name: data?.donViKyHopDongText
      }
      : null,
    viTriCongViec: data?.viTriCongViecText
      ? {
        id: data?.viTriCongViecId,
        value: data?.viTriCongViecText
      }
      : null,
    nguoiDaiDienCtyKy: data?.nguoiDaiDienCtyKyId
      ? {
        id: data?.nguoiDaiDienCtyKyId,
        name: data?.nguoiDaiDienCtyKyText
      }
      : null,
    nguoiDaiDienCtyChucDanh: data?.nguoiDaiDienCtyChucDanhId
      ? {
        id: data?.nguoiDaiDienCtyChucDanhId,
        value: data?.nguoiDaiDienCtyChucDanhText
      }
      : null,
    phongBan: data?.phongBanText
      ? {
        id: data?.phongBanId,
        name: data?.phongBanText
      }
      : null,
    chucDanh: data?.chucDanhText
      ? {
        id: data?.chucDanhId,
        value: data?.chucDanhText
      }
      : null,
    chucVu: data?.chucVuText
      ? {
        id: data?.chucVuId,
        value: data?.chucVuText
      }
      : null,
    bacLuongOption: data?.bacLuong
      ? {
        bacLuong: data?.bacLuong,
        heSoLuong: data?.heSoLuong
      }
      : null,
  };

  return contract;
};

export const convertDataDto = (data: any) => {
  const employeeProfiles: any = {};

  return employeeProfiles;
};

export const filterObject = (obj: any) => {
  const result: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null || value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

export const convertDataContactDto = (data: any) => {
  const dataContract: any = {
    ...data,
    employeeCode: data?.employee?.maNhanVien || "",
    donViKyHopDongId: data?.donViKyHopDong?.id || "",
    donViKyHopDongText: data?.donViKyHopDong?.name || "",
    chucVuId: data?.chucVu?.id || "",
    chucVuText: data?.chucVu?.value || "",
    phongBanId: data?.phongBan?.id || "",
    phongBanText: data?.phongBan?.value || data?.phongBan?.name,
    chucDanhId: data?.chucDanh?.id || "",
    chucDanhText: data?.chucDanh?.value || data?.chucDanh?.name,
    bacLuong: data?.bacLuongOption?.bacLuong,
    ...(data?.nguoiDaiDienCtyKy?.id && { nguoiDaiDienCtyKyId: data.nguoiDaiDienCtyKy.id, nguoiDaiDienCtyKyText: data?.nguoiDaiDienCtyKy?.name }),
    ...(data?.nguoiDaiDienCtyChucDanh?.id && { nguoiDaiDienCtyChucDanhId: data.nguoiDaiDienCtyChucDanh.id, nguoiDaiDienCtyChucDanhText: data?.nguoiDaiDienCtyChucDanh?.value }),
    ...(data?.viTriCongViec?.id && { viTriCongViecId: data.viTriCongViec.id, viTriCongViecText: data?.viTriCongViec?.value })
  };

  const {
    donViKyHopDong,
    viTriCongViec,
    nguoiDaiDienCtyKy,
    nguoiDaiDienCtyChucDanh,
    ...infoFilter
  } = dataContract;
  return infoFilter;
};

export const switchContractStatus = (loaiCanBo: OptionReactSelect | undefined | null, formik: any, values = {}) => {
  const { HOP_DONG_LD, HOP_DONG_UNDEFINED } = CODE_HDLD;
  if (loaiCanBo?.code === HOP_DONG_UNDEFINED || loaiCanBo?.code === HOP_DONG_LD) {
    formik?.setValues({
      ...formik?.values,
      ...values,
      vienChuc: false,
      hopDongLaoDong: true
    });
  } else {
    formik?.setValues({
      ...formik?.values,
      ...values,
      vienChuc: true,
      hopDongLaoDong: false
    });
  }
};