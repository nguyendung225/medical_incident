import { AddressData } from "../models/ProfileModels";

export const convertDataUI = (data: any) => {
  let employeeProfiles: any = {
    ...data,
    quocTich: data?.quocTichText
      ? {
          id: data?.quocTichId,
          name: data?.quocTichText
        }
      : null,
    danToc: data?.danTocText
      ? {
          id: data?.danTocId,
          code: data?.scategoryCode || null,
          value: data?.danTocText
        }
      : null,
    hkQuocGia: data?.hkQuocGiaText
      ? {
          id: data?.hkQuocGiaId,
          name: data?.hkQuocGiaText
        }
      : null,
    hkTinh: data?.hkTinhText
      ? {
          id: data?.hkTinhId,
          name: data?.hkTinhText
        }
      : null,
    hkHuyen: data?.hkHuyenText
      ? {
          id: data?.hkHuyenId,
          name: data?.hkHuyenText
        }
      : null,
    hkXa: data?.hkXaText
      ? {
          id: data?.hkXaId,
          name: data?.hkXaText
        }
      : null,
    hnQuocGia: data?.hnQuocGiaText
      ? {
          id: data?.hnQuocGiaId,
          name: data?.hnQuocGiaText
        }
      : null,
    hnTinh: data?.hnTinhText
      ? {
          id: data?.hnTinhId,
          name: data?.hnTinhText
        }
      : null,
    hnHuyen: data?.hnHuyenText
      ? {
          id: data?.hnHuyenId,
          name: data?.hnHuyenText
        }
      : null,
    hnXa: data?.hnXaText
      ? {
          id: data?.hnXaId,
          name: data?.hnXaText
        }
      : null,
    ttTinh: data?.ttTinhText
      ? {
          id: data?.ttTinhId,
          name: data?.ttTinhText
        }
      : null,
    ttHuyen: data?.ttHuyenText
      ? {
          id: data?.ttHuyenId,
          name: data?.ttHuyenText
        }
      : null,
    ttXa: data?.ttXaText
      ? {
          id: data?.ttXaId,
          name: data?.ttXaText
        }
      : null,
    noiSinhTinh: data?.noiSinhTinhText
      ? {
          id: data?.noiSinhTinhId,
          name: data?.noiSinhTinhText
        }
      : null,
    noiSinhHuyen: data?.noiSinhHuyenText
      ? {
          id: data?.noiSinhHuyenId,
          name: data?.noiSinhHuyenText
        }
      : null,
    noiSinhXa: data?.noiSinhXaText
      ? {
          id: data?.noiSinhXaId,
          name: data?.noiSinhXaText
        }
      : null,
    queQuanTinh: data?.queQuanTinhText
      ? {
          id: data?.queQuanTinhId,
          name: data?.queQuanTinhText
        }
      : null,
    queQuanHuyen: data?.queQuanHuyenText
      ? {
          id: data?.queQuanHuyenId,
          name: data?.queQuanHuyenText
        }
      : null,
    queQuanXa: data?.queQuanXaText
      ? {
          id: data?.queQuanXaId,
          name: data?.queQuanXaText
        }
      : null,
    donViCongTac: data?.donViCongTacText
      ? {
          id: data?.donViCongTacId,
          name: data?.donViCongTacText
        }
      : null,
    phongBan: data?.phongBanText
      ? {
          id: data?.phongBanId,
          name: data?.phongBanText
        }
      : null,
    viTriCongViec: data?.viTriCongViecText
      ? {
          id: data?.viTriCongViecId,
          value: data?.viTriCongViecText
        }
      : null,
    nganHang: data?.nganHangText
      ? {
          id: data?.nganHangId,
          value: data?.nganHangText
        }
      : null,
    chucVuDoan: data?.chucVuDoanText
      ? {
          id: data?.chucVuDoanId,
          value: data?.chucVuDoanText
        }
      : null,
    chucVuDang: data?.chucVuDangText
      ? {
          id: data?.chucVuDangId,
          value: data?.chucVuDangText
        }
      : null,
    tonGiao: data?.tonGiaoText
      ? {
          id: data?.tonGiaoId,
          value: data?.tonGiaoText
        }
      : null,

    bac: data?.bacLuong
      ? {
          id: data?.bacId,
          bacLuong: data?.bacLuong
        }
      : null,
    cap: data?.capText
      ? {
          id: data?.capId,
          value: data?.capText
        }
      : null,
    chucVu: data?.chucVuText
      ? {
          id: data?.chucVuId,
          value: data?.chucVuText
        }
      : null,
    noiDkKcb: data?.noiDkKcbText
      ? {
          id: data?.noiDkKcbId,
          name: data?.noiDkKcbText
        }
      : null,
    tinhCapBhxh: data?.tinhCapBhxhText
      ? {
          id: data?.tinhCapBhxhId,
          name: data?.tinhCapBhxhText
        }
      : null,
    hangThuongBenhBinh: data?.hangThuongBenhBinhText
      ? {
          id: data?.hangThuongBenhBinhId,
          value: data?.hangThuongBenhBinhText
        }
      : null,
    binhChung: data?.binhChungText
      ? {
          id: data?.binhChungId,
          value: data?.binhChungText
        }
      : null,
    capBacQuanSu: data?.capBacQuanSuText
      ? {
          id: data?.capBacQuanSuId,
          value: data?.capBacQuanSuText
        }
      : null,
    chucVuQuanSu: data?.chucVuQuanSuText
      ? {
          id: data?.chucVuQuanSuId,
          value: data?.chucVuQuanSuText
        }
      : null,
    nguoiQuanLy: data?.nguoiQuanLyText
      ? {
          id: data?.nguoiQuanLyId,
          name: data?.nguoiQuanLyText
        }
      : null
  };

  return employeeProfiles;
};

export const convertDataFamilyUI = (data: any) => {
  let dataFamil: any = {
    ...data,
    ethnics: data?.ethnicsId
      ? {
          id: data?.ethnicsId,
          value: data?.ethnicsText
        }
      : null,
    nationality: data?.nationalityId
      ? {
          id: data?.nationalityId,
          name: data?.nationalityText
        }
      : null,
    quanHeNV: data?.quanHeNVId
      ? {
          id: data?.quanHeNVId,
          value: data?.quanHeNVText
        }
      : null
  };

  return dataFamil;
};

export const convertDataDto = (data: any) => {
  const employeeProfiles: any = {};

  return employeeProfiles;
};

export const filterObject = (obj: any) => {
  const result: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== "") {
      result[key] = value;
    }
  }
  return result;
};

export const convertDataInfoDto = (data: any) => {
  const employeeProfiles: any = {
    ...data,
    hkXaId: data?.hkXa?.id || "",
    hkHuyenId: data?.hkHuyen?.id || "",
    hkTinhId: data?.hkTinh?.id || "",
    hkQuocGiaId: data?.hkQuocGia?.id || "",
    hkXaText: data?.hkXa?.name || "",
    hkHuyenText: data?.hkHuyen?.name || "",
    hkTinhText: data?.hkTinh?.name || "",
    hkQuocGiaText: data?.hkQuocGia?.name || "",
    ttXaText: data?.ttXa?.name || "",
    ttHuyenText: data?.ttHuyen?.name || "",
    ttTinhText: data?.ttTinh?.name || "",
    ttXaId: data?.ttXa?.id || "",
    ttHuyenId: data?.ttHuyen?.id || "",
    ttTinhId: data?.ttTinh?.id || "",
    queQuanXaText: data?.queQuanXa?.name || "",
    queQuanHuyenText: data?.queQuanHuyen?.name || "",
    queQuanTinhText: data?.queQuanTinh?.name || "",
    queQuanXaId: data?.queQuanXa?.id || "",
    queQuanHuyenId: data?.queQuanHuyen?.id || "",
    queQuanTinhId: data?.queQuanTinh?.id || "",
    noiSinhXaText: data?.noiSinhXa?.name || "",
    noiSinhHuyenText: data?.noiSinhHuyen?.name || "",
    noiSinhTinhText: data?.noiSinhTinh?.name || "",
    noiSinhXaId: data?.noiSinhXa?.id || "",
    noiSinhHuyenId: data?.noiSinhHuyen?.id || "",
    noiSinhTinhId: data?.noiSinhTinh?.id || "",
    hnXaId: data?.hnXa?.id || "",
    hnHuyenId: data?.hnHuyen?.id || "",
    hnTinhId: data?.hnTinh?.id || "",
    hnQuocGiaId: data?.hnQuocGia?.id || "",
    hnXaText: data?.hnXa?.name || "",
    hnHuyenText: data?.hnHuyen?.name || "",
    hnTinhText: data?.hnTinh?.name || "",
    hnQuocGiaText: data?.hnQuocGia?.name || "",
    quocTichId: data?.quocTich?.id || "",
    quocTichText: data?.quocTich?.name || "",
    donViCongTacId: data?.donViCongTac?.id || "",
    donViCongTacText: data?.donViCongTac?.name || "",
    phongBanId: data?.phongBan?.id || "",
    phongBanText: data?.phongBan?.name || "",
    nganHangId: data?.nganHang?.id || "",
    nganHangText: data?.nganHang?.value || "",
    viTriCongViecText: data?.viTriCongViec?.value || "",
    viTriCongViecId: data?.viTriCongViec?.id || "",
    chucVuDoanId: data?.chucVuDoan?.id || "",
    chucVuDoanText: data?.chucVuDoan?.value || "",
    chucVuDangId: data?.chucVuDang?.id || "",
    chucVuDangText: data?.chucVuDang?.value || "",
    tonGiaoId: data?.tonGiao?.id || "",
    tonGiaoText: data?.tonGiao?.value || "",
    danTocId: data?.danToc?.id || "",
    danTocText: data?.danToc?.value || "",
    bacId: data?.bac?.id || "",
    bacLuong: data?.bac?.bacLuong || "",
    nguoiQuanLyId: data?.nguoiQuanLy?.id || "",
    nguoiQuanLyText: data?.nguoiQuanLy?.name || "",
    tinhCapBhxhId: data?.tinhCapBhxh?.id || "",
    tinhCapBhxhText: data?.tinhCapBhxh?.name || "",
    noiDkKcbId: data?.noiDkKcb?.id || "",
    noiDkKcbText: data?.noiDkKcb?.name || "",
    chucVuId: data?.chucVu?.id || "",
    chucVuText: data?.chucVu?.value || "",
    capId: data?.cap?.id || "",
    capText: data?.cap?.value || "",
    binhChungId: data?.binhChung?.id || "",
    binhChungText: data?.binhChung?.value || "",
    capBacQuanSuId: data?.capBacQuanSu?.id || "",
    capBacQuanSuText: data?.capBacQuanSu?.value || "",
    chucVuQuanSuId: data?.chucVuQuanSu?.id || "",
    chucVuQuanSuText: data?.chucVuQuanSu?.value || "",
    hangThuongBenhBinhId: data?.hangThuongBenhBinh?.id || "",
    hangThuongBenhBinhText: data?.hangThuongBenhBinh?.value || ""
  };
  const {
    hkXa,
    hkHuyen,
    hkTinh,
    hkQuocGia,
    hnXa,
    hnHuyen,
    hnTinh,
    hnQuocGia,
    quocTich,
    danToc,
    ttXa,
    ttHuyen,
    ttTinh,
    ttQuocGia,
    tonGiao,
    chucVuDang,
    chucVuDoan,
    viTriCongViec,
    nganHang,
    phongBan,
    donViCongTac,
    cap,
    bac,
    chucVu,
    nguoiQuanLy,
    noiDkKcb,
    tinhCapBhxh,
    hangThuongBenhBinh,
    binhChung,
    capBacQuanSu,
    chucVuQuanSu,
    ...infoFilter
  } = employeeProfiles;
  return filterObject(infoFilter);
};

export const convertDataFamilyDto = (data: any) => {
  let dataFamil: any = {
    ...data,
    ethnicsId: data?.ethnics?.id || "",
    ethnicsText: data?.ethnics?.value || "",
    nationalityText: data?.nationality?.name || "",
    nationalityId: data?.nationality?.id || "",
    quanHeNVId : data?.quanHeNV?.id || "",
    quanHeNVText : data?.quanHeNV?.value || ""
  };

  const { ethnics, nationality, ...infoFilter } = dataFamil;
  return filterObject(infoFilter);
};

export const convertDataWorkingProcessUI = (data: any) => {
  let dataWorkingProcess: any = {
    ...data,
    viTriCongViec: data?.viTriCongViecId
      ? {
          id: data?.viTriCongViecId,
          name: data?.viTriCongViecText
        }
      : null,
    phongBan: data?.phongBanId
      ? {
          id: data?.phongBanId,
          name: data?.phongBanText
        }
      : null,
    chucDanh: data?.chucDanhId
      ? {
          id: data?.chucDanhId,
          value: data?.chucDanhText
        }
      : null,
    bac: data?.bacId
      ? {
          id: data?.bacId,
          value: data?.bacText
        }
      : null,
    cap: data?.capId
      ? {
          id: data?.capId,
          value: data?.capText
        }
      : null,
    donViCongTac: data?.donViCongTacId
      ? {
          id: data?.donViCongTacId,
          name: data?.donViCongTacText
        }
      : null,
    loaiThuTuc: data?.loaiThuTucId
      ? {
        id: data?.loaiThuTucId,
        value: data?.loaiThuTucText
      }
      : null
  };

  return dataWorkingProcess;
};

export const convertDataConcurrentlyUI = (data: any) => {
  let dataConcurrently: any = {
    ...data,
    viTriCongViec: data?.viTriCongViecId
      ? {
          id: data?.viTriCongViecId,
          value: data?.viTriCongViecText
        }
      : null,
    donViCongTac: data?.donViCongTacId
      ? {
          id: data?.donViCongTacId,
          name: data?.donViCongTacText
        }
      : null
  };

  return dataConcurrently;
};

export const convertDataContract = (data: any) => {
  return {
    ...data,
    donViKyHopDong: data.donViKyHopDongText
      ? {
          id: data.donViKyHopDongId,
          name: data.donViKyHopDongText
        }
      : null,
    nguoiDaiDienCtyKy: data.nguoiDaiDienCtyKyText
      ? {
          id: data.nguoiDaiDienCtyKyId,
          name: data.nguoiDaiDienCtyKyText
        }
      : null,
    bacLuongOption: {
      bacLuong: data.bacLuong,
      heSoLuong: data.heSoLuong
    },
    phongBan: data.phongBanText
      ? {
          id: data.phongBanId,
          name: data.phongBanText
        }
      : null,
    chucDanh: data.chucDanhText
      ? {
          id: data.chucDanhId,
          value: data.chucDanhText
        }
      : {
          id: data.viTriCongViecId,
          value: data.viTriCongViecText
        },
    chucVu: data.chucVuText
      ? {
          id: data.chucVuId,
          value: data.chucVuText
        }
      : null
  };
};

export const combineAddressDetail = (addressData: AddressData) => {
  const { houseNumber, wards, districts, province, national } = addressData;
  return `${houseNumber ? houseNumber + "," : ""} ${wards ? wards + "," : ""} ${districts ? districts + "," : ""} ${
    province ? province + "," : ""
  } ${national ? national : ""}`.trim().replace(/^,*(.*?),*$/, '$1');
};
