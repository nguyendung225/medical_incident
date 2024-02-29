import axios from "axios";
import { IAllowance } from "../../contract/services/models/IAllowance";
import { paramsConfig } from "../../utils/ParamsUtils";
import {
  CertificateInfo,
  DegreeInfo,
  IBank,
  IEthnicLanguageInfo,
  IForeignLanguageLevelInfo,
  INationalDefenseInfo,
  IQualificationInfo,
  IRelativesInfoDto,
  ISpecializeTrainingInfo,
  IStateManagementInfo,
  ITQualificationInfo,
  PhongBanInfo,
  PoliticalTheoryInfo,
  TaiLieuDinhKemInfo,
  TrainingProcessInfo,
  VaccineInfo
} from "../models/DialogModels";
import {
  IConcurrentlyOutputDto,
  IDeduct,
  IGiayToDinhKemInfo,
  IWorkExperienceOutput,
  LichSuLuongInfoOutPut,
} from "../models/ProfileModels";

const API_PATH = process.env.REACT_APP_API_URL;
const API_BANG_CAP = API_PATH + "/bang-cap";
const API_PHONG_BAN = API_PATH + "/c-department";

export const addBangCap = (obj: DegreeInfo) => {
  return axios.post(API_BANG_CAP, obj);
};
export const getAllBangCapById = (id: string) => {
  return axios.get(`${API_BANG_CAP}/get-by-employee/${id}`);
};
export const deleteBangCap = (ids: string) => {
  return axios.delete(`${API_BANG_CAP}/ids?ids=${ids.toString()}`);
};
export const updateBangCap = (id: string, obj: DegreeInfo) => {
  return axios.put(`${API_BANG_CAP}/${id}`, obj);
};
///////= Chung chi =////////
const API_CHUNG_CHI = API_PATH + "/chung-chi";
export const addChungChi = (obj: CertificateInfo) => {
  return axios.post(API_CHUNG_CHI, obj);
};
export const getAllChungChiById = (employeeId: string) => {
  return axios.get(`${API_CHUNG_CHI}/employee/${employeeId}?type=5`);
};
export const deleteChungChi = (ids: string) => {
  return axios.delete(`${API_CHUNG_CHI}/ids?ids=${ids.toString()}`);
};
export const updateChungChi = (id: string, obj: CertificateInfo) => {
  return axios.put(`${API_CHUNG_CHI}/${id}`, obj);
};
///////= Quan he =////////
const API_QUAN_HE = API_PATH + '/quan-he-gia-dinh';
export const addQuanHeGiaDinh = (obj: IRelativesInfoDto) => {
  return axios.post(API_QUAN_HE, obj);
};
export const getAllQuanHeGiaDinhById = (id: string) => {
  return axios.get(`${API_QUAN_HE}/get-by-employee/${id}`);
};
export const deleteQuanHeGiaDinh = (id: string[]) => {
  return axios.delete(`${API_QUAN_HE}/ids?ids=${id}`);
};
export const updateQuanHeGiaDinh = (id: string, obj: IRelativesInfoDto) => {
  return axios.put(`${API_QUAN_HE}/${id}`, obj);
};

///////= Tiem chung =////////
const API_TIEM_CHUNG = API_PATH + "/tiem-chung";
export const addTiemChung = (obj: VaccineInfo) => {
  return axios.post(API_TIEM_CHUNG, obj);
};
export const getAllTiemChungById = (id: string) => {
  return axios.get(`${API_TIEM_CHUNG}/get-by-employee/${id}`);
};
export const deleteTiemChung = (ids: string) => {
  return axios.delete(`${API_TIEM_CHUNG}/ids?ids=${ids}`);
};
export const updateTiemChung = (id: string, obj: VaccineInfo) => {
  return axios.put(`${API_TIEM_CHUNG}/${id}`, obj);
};
///////= Kinh nghiem =////////
const API_KINH_NGHIEM = API_PATH + '/kinh-nghiem';
export const addKinhNghiem = (obj: IWorkExperienceOutput) => {
  return axios.post(API_KINH_NGHIEM, obj);
};
export const getKinhNghiemById = (id: string) => {
  return axios.get(`${API_KINH_NGHIEM}/${id}`);
};
export const getAllKinhNghiemById = (id: string) => {
  return axios.get(`${API_KINH_NGHIEM}/get-by-employee/${id}`);
};
export const deleteKinhNghiem = (id: string[]) => {
  return axios.delete(`${API_KINH_NGHIEM}/ids?ids=${id}`);
};
export const updateKinhNghiem = (id: string, obj: IWorkExperienceOutput) => {
  return axios.put(`${API_KINH_NGHIEM}/${id}`, obj);
};
///////= Kiem nghiem =////////
const API_KIEM_NHIEM = API_PATH + '/kiem-nhiem';
export const addKiemNhiem = (obj: IConcurrentlyOutputDto) => {
  return axios.post(API_KIEM_NHIEM, obj);
};
export const getAllKiemNhiemById = (id: string) => {
  return axios.get(`${API_KIEM_NHIEM}/get-by-employee/${id}`);
};
export const deleteKiemNhiem = (id: string[]) => {
  return axios.delete(`${API_KIEM_NHIEM}/ids?ids=${id}`);
};
export const updateKiemNhiem = (id: string, obj: IConcurrentlyOutputDto) => {
  return axios.put(`${API_KIEM_NHIEM}/${id}`, obj);
};
///////= lich su luomh =////////
const API_LICH_SU_LUONG = API_PATH + '/lich-su-luong';
export const addLichSuLuong = (obj: LichSuLuongInfoOutPut) => {
  return axios.post(API_LICH_SU_LUONG, obj);
};
export const getAllLichSuLuongById = (id: string) => {
  return axios.get(`${API_LICH_SU_LUONG}/get-by-employee/${id}`);
};
export const deleteLichSuLuong = (id: string) => {
  return axios.delete(`${API_LICH_SU_LUONG}/ids?ids=${id}`);
};
export const updateLichSuLuong = (id: string, obj: LichSuLuongInfoOutPut) => {
  return axios.put(`${API_LICH_SU_LUONG}/${id}`, obj);
};

export const getNgayHuongLuongDenNgay = (params: any) => {
  let configs = {
    params: {
      employeeId: params?.employeeId,
      ngayHuongLuongTuNgay: params?.ngayHuongLuongTuNgay
    }
  }
  return axios.get(`${API_LICH_SU_LUONG}/ngay-huong-luong-den-ngay`, configs);
};
///////=Qua trinh cong tac =////////
const API_CONG_TAC= API_PATH + '/qua-trinh-cong-tac';
export const addQuaTrinhCongTac = (obj: any) => {
  return axios.post(API_CONG_TAC, obj);
};
export const getAllQuaTrinhCongTacById = (id: string) => {
  return axios.get(`${API_CONG_TAC}/page?employeeId=${id}`);
};
export const deleteQuaTrinhCongTac = (id: string[]) => {
  return axios.delete(`${API_CONG_TAC}/ids?ids=${id}`);
};
export const updateQuaTrinhCongTac = (id: string, obj: any) => {
  return axios.put(`${API_CONG_TAC}/${id}`, obj);
};
///////=Giay To Dinh Kem =////////
const API_GIAY_TO = API_PATH + '/loai-giay-to';
export const addGiayToDinhKem = (obj: IGiayToDinhKemInfo) => {
  return axios.post(API_GIAY_TO, obj);
};
export const getAllGiayToDinhKemById = (id: string) => {
  return axios.get(`${API_GIAY_TO}/get-by-employee/${id}`);
};
export const deleteGiayToDinhKem = (id: string[]) => {
  return axios.delete(`${API_GIAY_TO}/ids?ids=${id}`);
};
export const updateGiayToDinhKem = (id: string, obj: IGiayToDinhKemInfo) => {
  return axios.put(`${API_GIAY_TO}/${id}`, obj);
};
///////=Tai Lieu Dinh Kem =////////
const API_TAI_LIEU = API_PATH + '/attachment';
export const addTaiLieuDinhKem = (obj: TaiLieuDinhKemInfo) => {
  return axios.post(API_TAI_LIEU, obj);
};
export const getAllTaiLieuDinhKemById = (id: string) => {
  return axios.get(`${API_TAI_LIEU}/get-by-employee/${id}`);
};
export const deleteTaiLieuDinhKem = (id: string[]) => {
  return axios.delete(`${API_TAI_LIEU}/ids?ids=${id}`);
};
export const updateTaiLieuDinhKem = (id: string, obj: TaiLieuDinhKemInfo) => {
  return axios.put(`${API_TAI_LIEU}/${id}`, obj);
};
export const simpleCategoryAttributeValue = (type: number, id: string) => {
  let url = API_PATH + `/c-simple-category-attribute-value/page?pageSize=1000&pageIndex=1&type=${type}&mappingId=${id}`;
  return axios.get(url);
};
//phu cap
export const getAllowancesByEmployee = (id: string) => {
  let url = `${API_PATH}/phu-cap/get-by-employee/${id}`;
  return axios.get(url);
};
export const addPhuCap = (allowance: IAllowance) => {
  let url = `${API_PATH}/phu-cap`;
  return axios.post(url, allowance);
};

export const updatePhuCap = (id: string, allowance: IAllowance) => {
  let url = `${API_PATH}/phu-cap/${id}`;
  return axios.put(url, allowance);
};

export const deletePhuCap = (ids: string[]) => {
  let url = `${API_PATH}/phu-cap/allowanceIds?ids=${ids.toString()}`;
  return axios.delete(url);
};
//khau tru
export const getDeductByEmployee = (id: string) => {
  let url = `${API_PATH}/khau-tru/get-by-employee/${id}`;
  return axios.get(url);
};
export const addKhauTru = (allowance: IDeduct) => {
  let url = `${API_PATH}/khau-tru`;
  return axios.post(url, allowance);
};

export const updateKhauTru = (id: string, allowance: IDeduct) => {
  let url = `${API_PATH}/khau-tru/${id}`;
  return axios.put(url, allowance);
};

export const deleteKhauTru = (ids: string[] | string) => {
  let url = `${API_PATH}/khau-tru/ids?ids=${ids.toString()}`;
  return axios.delete(url);
};
///////= Ly luan chinh tri =////////
const API_LY_LUAN_CHINH_TRI = API_PATH + "/ly-luan-chinh-tri";
export const addPoliticalTheory = (obj: PoliticalTheoryInfo) => {
  return axios.post(API_LY_LUAN_CHINH_TRI, obj);
};
export const getPoliticalTheoryById = (id: string) => {
  return axios.get(`${API_LY_LUAN_CHINH_TRI}/${id}`);
};
export const getAllPoliticalTheoryByEmployeeId = (id: string) => {
  return axios.get(`${API_LY_LUAN_CHINH_TRI}/employee/${id}`);
};
export const deletePoliticalTheory = (id: string) => {
  return axios.delete(`${API_LY_LUAN_CHINH_TRI}/${id}`);
};
export const deleteMultiplePoliticalTheory = (ids: string) => {
  return axios.delete(`${API_LY_LUAN_CHINH_TRI}/ids?ids=${ids}`);
};
export const deletePoliticalTheoryByEmployeeId = (id: string) => {
  return axios.delete(`${API_LY_LUAN_CHINH_TRI}/employee/${id}`);
};
export const updatePoliticalTheory = (id: string, obj: PoliticalTheoryInfo) => {
  return axios.put(`${API_LY_LUAN_CHINH_TRI}/${id}`, obj);
};
///////= Qua trinh boi duong =////////
const API_QUA_TRINH_BOI_DUONG = API_PATH + "/qua-trinh-boi-duong";
export const addTrainingProcess = (obj: TrainingProcessInfo) => {
  return axios.post(API_QUA_TRINH_BOI_DUONG, obj);
};
export const getTrainingProcessById = (id: string) => {
  return axios.get(`${API_QUA_TRINH_BOI_DUONG}/${id}`);
};
export const getAllTrainingProcessByEmployeeId = (id: string) => {
  return axios.get(`${API_QUA_TRINH_BOI_DUONG}/employee/${id}`);
};
export const deleteTrainingProcess = (id: string) => {
  return axios.delete(`${API_QUA_TRINH_BOI_DUONG}/${id}`);
};
export const updateTrainingProcess = (id: string, obj: TrainingProcessInfo) => {
  return axios.put(`${API_QUA_TRINH_BOI_DUONG}/${id}`,obj);
};

//Phòng ban
export const getPhongBanById = (id: string) => {
  return axios.get(`${API_PHONG_BAN}/${id}`);
};

export const updatePhongBan = (objData: PhongBanInfo) => {
  return axios.put(`${API_PHONG_BAN}/${objData?.id}`, objData);
};

export const createPhongBan = (objData: PhongBanInfo) => {
  return axios.post(API_PHONG_BAN, objData);
};

export const deletePhongBan = (ids: string[]) => {
  return axios.delete(API_PHONG_BAN, paramsConfig({ ids: ids.toString() }));
};

export const searchPhongBan = (searchObj: any) => {
  return axios.post(`${API_PHONG_BAN}/page`, searchObj);
};
export const searchPhongBanNhanVien = (searchObj: any) => {
  return axios.get(`${API_PHONG_BAN}/count-employees-department`, searchObj);
};

export const searchPhongBan_DonVi = (searchObj: any) => {
  return axios.get(`${API_PHONG_BAN}/get-by-unit`, paramsConfig(searchObj));
};

export const getBacLuongByChucDanh = (id:string) => {
  const url = API_PATH + "/chuc-danh-bac-luong/get-by-chuc-danh?chucDanh=" + id;
  return axios.get(url);
}

export const updateBank = (data: IBank, employeeId: string) => {
  const url = API_PATH + `/employee/thong-tin-ngan-hang/${employeeId}`;
  return axios.put(url, data);
}

export const getEmployeeIdByUserId = (id: any) => {
  let url = `${API_PATH}/employee/get-by-user-id/${id}`;
  return axios.get(url);
};
// API trinh do chuyen mon(Tu trung cap tro len)
export const getQualificationByEmployee = (employeeId: string) => {
  let url = `${API_PATH}/bang-cap/employee/${employeeId}`;
  return axios.get(url);
};

export const addQualification = (data: IQualificationInfo) => {
  let url = `${API_PATH}/bang-cap`;
  return axios.post(url, data);
};

export const updateQualification = (id: string, data: IQualificationInfo) => {
  let url = `${API_PATH}/bang-cap/${id}`;
  return axios.put(url, data);
};

export const deleteMultipleQualification = (ids: string) => {
  let url = `${API_PATH}/bang-cap/ids?ids=${ids}`;
  return axios.delete(url);
};
// API trinh do quan ly nha nuoc
export const getStateManagementByEmployee = (employeeId: string) => {
  let url = `${API_PATH}/chung-chi/employee/${employeeId}?type=4`;
  return axios.get(url);
};

export const addStateManagement = (data: IStateManagementInfo) => {
  let url = `${API_PATH}/chung-chi`;
  return axios.post(url, data);
};

export const updateStateManagement = (id: string, data: IStateManagementInfo) => {
  let url = `${API_PATH}/chung-chi/${id}`;
  return axios.put(url, data);
};

export const deleteMultipleStateManagement = (ids: string) => {
  let url = `${API_PATH}/chung-chi/ids?ids=${ids}`;
  return axios.delete(url);
};
// API trinh do tin hoc
export const getITQualificationByEmployee = (employeeId: string) => {
  let url = `${API_PATH}/chung-chi/employee/${employeeId}?type=3`;
  return axios.get(url);
};

export const addITQualification = (data: ITQualificationInfo) => {
  let url = `${API_PATH}/chung-chi`;
  return axios.post(url, data);
};

export const updateITQualification = (id: string, data: ITQualificationInfo) => {
  let url = `${API_PATH}/chung-chi/${id}`;
  return axios.put(url, data);
};

export const deleteMultipleITQualification = (ids: string) => {
  let url = `${API_PATH}/chung-chi/ids?ids=${ids}`;
  return axios.delete(url);
};
// API trinh do ngoai ngu
export const getForeignLanguageLevelByEmployee = (employeeId: string) => {
  let url = `${API_PATH}/chung-chi/employee/${employeeId}?type=2`;
  return axios.get(url);
};

export const addForeignLanguageLevel = (data: IForeignLanguageLevelInfo) => {
  let url = `${API_PATH}/chung-chi`;
  return axios.post(url, data);
};

export const updateForeignLanguageLevel = (id: string, data: IForeignLanguageLevelInfo) => {
  let url = `${API_PATH}/chung-chi/${id}`;
  return axios.put(url, data);
};

export const deleteMultipleForeignLanguage = (ids: string) => {
  let url = `${API_PATH}/chung-chi/ids?ids=${ids}`;
  return axios.delete(url);
};
// API boi duong quoc phong an ninh
export const getNationalDefenseByEmployee = (employeeId: string) => {
  let url = `${API_PATH}/qua-trinh-boi-duong/employee/${employeeId}?type=6`;
  return axios.get(url);
};

export const addNationalDefense = (data: INationalDefenseInfo) => {
  let url = `${API_PATH}/qua-trinh-boi-duong`;
  return axios.post(url, data);
};

export const updateNationalDefense = (id: string, data: INationalDefenseInfo) => {
  let url = `${API_PATH}/qua-trinh-boi-duong/${id}`;
  return axios.put(url, data);
};

export const deleteMultipleNationalDefense = (ids: string) => {
  let url = `${API_PATH}/qua-trinh-boi-duong/ids?ids=${ids}`;
  return axios.delete(url);
};
// API boi duong chuc danh nghe nghiep, nghiep vu chuyen nganh
export const getSpecializeTrainingByEmployee = (employeeId: string) => {
  let url = `${API_PATH}/qua-trinh-boi-duong/employee/${employeeId}?type=1`;
  return axios.get(url);
};

export const addSpecializeTraining = (data: ISpecializeTrainingInfo) => {
  let url = `${API_PATH}/qua-trinh-boi-duong`;
  return axios.post(url, data);
};

export const updateSpecializeTraining = (id: string, data: ISpecializeTrainingInfo) => {
  let url = `${API_PATH}/qua-trinh-boi-duong/${id}`;
  return axios.put(url, data);
};

export const deleteMultipleSpecializeTraining = (ids: string) => {
  let url = `${API_PATH}/qua-trinh-boi-duong/ids?ids=${ids}`;
  return axios.delete(url);
};
// API tieng dan toc
export const getEthnicLanguageByEmployee = (employeeId: string) => {
  let url = `${API_PATH}/tieng-dan-toc/employee/${employeeId}`;
  return axios.get(url);
};

export const addEthnicLanguage = (data: IEthnicLanguageInfo) => {
  let url = `${API_PATH}/tieng-dan-toc`;
  return axios.post(url, data);
};

export const updateEthnicLanguage = (id: string, data: IEthnicLanguageInfo) => {
  let url = `${API_PATH}/tieng-dan-toc/${id}`;
  return axios.put(url, data);
};

export const deleteMultipleEthnicLanguage = (ids: string) => {
  let url = `${API_PATH}/tieng-dan-toc/ids?ids=${ids}`;
  return axios.delete(url);
};