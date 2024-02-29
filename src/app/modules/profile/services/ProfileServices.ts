import axios, { AxiosResponse } from "axios";
import { APIResponse } from "../../models/models";
import { paramsConfig } from "../../utils/ParamsUtils";
import { EmployeeProfile, ProjectType, SearchObject } from "../models/ProfileModels";

const API_PATH = process.env.REACT_APP_API_URL;
const API_EMPLOYEE_PROFILE = API_PATH + "/employee";

export const addEmployeeProfile = (obj: EmployeeProfile) => {
  return axios.post(API_EMPLOYEE_PROFILE, obj);
};
export const getEmployeeProfileById = (id: string) => {
  return axios.get(`${API_EMPLOYEE_PROFILE}/${id}`);
};
export const getAllEmployeeProfileById = (id: string) => {
  return axios.get(`${API_EMPLOYEE_PROFILE}/get-by-employee/${id}`);
};
export const deleteEmployeeProfile = (id: string) => {
  return axios.delete(`${API_EMPLOYEE_PROFILE}/${id}`);
};
export const updateEmployeeProfile = (id: string, obj: EmployeeProfile) => {
  return axios.put(`${API_EMPLOYEE_PROFILE}/${id}`, obj);
};

export const addPoliticInfo = (idEmployee: string, obj: EmployeeProfile) => {
  let url = API_EMPLOYEE_PROFILE + `/thong-tin-chinh-tri/${idEmployee}`;
  return axios.put(url, obj);
};

export const addNewPoliticInfo = (data: any) => {
  let url = API_PATH + `/thong-tin-chinh-tri`;
  return axios.post(url, data);
};

export const updatePoliticInfo = (id: any, data: any) => {
  let url = API_PATH + `/thong-tin-chinh-tri/${id}`;
  return axios.put(url, data);
};

export const getPoliticInfo = (idEmployee: string) => {
  let url = API_PATH + `/thong-tin-chinh-tri/get-by-employee/${idEmployee}`;
  return axios.get(url);
};

export const addMedicalInfo = (idEmployee: string, obj: EmployeeProfile) => {
  let url = API_EMPLOYEE_PROFILE + `/thong-tin-y-te/${idEmployee}`;
  return axios.put(url, obj);
};

export const addMilitaryInfo = (idEmployee: string, obj: EmployeeProfile) => {
  let url = API_EMPLOYEE_PROFILE + `/thong-tin-quan-su/${idEmployee}`;
  return axios.put(url, obj);
};

export const searchByPage = (searchObject: SearchObject) => {
  let url = API_PATH + "/employee/page";
  return axios.get(url, paramsConfig(searchObject));
};

export const getAllEmployee = () => {
  let url = API_PATH + "/employee/page?pageIndex=1&pageSize=1000";
  return axios.get(url);
};

//new
export const searchAllEmployee = (searchObject: any = {}) => {
  let url = API_PATH + "/employee/page";
  return axios.get(url, paramsConfig(searchObject));
};

export const deleteProfile = (listID: string[]): Promise<AxiosResponse<any, any>> => {
  let url = API_PATH + `/employee/list-employee-id/?id=${listID}`;
  return axios.delete(url);
};

export const getById = (id: string | undefined) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const addProject = (data: ProjectType) => {
  return axios.post(API_PATH + "", data);
};

export const editProject = (id: string | undefined, data: ProjectType) => {
  let url = API_PATH + "/" + id;
  return axios.put(url, data);
};

export const deleteProject = (id: string | undefined) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const getAllEthnics = () => {
  let url = API_PATH + "/c-ethnics";
  return axios.get(url);
};

export const getAllReligion = () => {
  let url = API_PATH + "/c-simple-category-attribute-value";
  return axios.get(url);
};

export const getAllDonVi = (searchObject: any) => {
  let url = API_PATH + "/c-don-vi/page";
  return axios.get(url, paramsConfig(searchObject));
};

export const getAlSimpleValue = () => {
  let url = API_PATH + "/c-simple-category-attribute-value";
  return axios.get(url);
};

export const getAllKhauTru = () => {
  let url = API_PATH + "/khauTru/page";
  return axios.get(url);
};

export const getAllPhuCap = () => {
  let url = API_PATH + "/phuCap/page";
  return axios.get(url);
};
const API_HO_SO = API_PATH + "/employee";
export const handleAddEmployee = (object: object) => {
  return axios.post(API_HO_SO, object);
};
export const handleEditEmployee = (id: string, object: object) => {
  return axios.put(`${API_HO_SO}/${id}`, object);
};

export const handleAddBasicInfo = (basicInfo: any): any => {
  let url = API_PATH + "/employee/thong-tin-co-ban";
  return axios.post(url, basicInfo);
};

export const handleAddContactInfo = (
  contactInfo: any,
  id: string
): Promise<AxiosResponse<APIResponse>> => {
  let url = API_PATH + `/employee/thong-tin-lien-he/${id}`;
  return axios.put(url, contactInfo);
};

export const handleAddWorkInfo = (
  workInfo: any,
  id: string
): Promise<AxiosResponse<APIResponse>> => {
  let url = API_PATH + `/employee/thong-tin-cong-viec/${id}`;
  return axios.put(url, workInfo);
};

export const getTrainingInfoByEmployee = (employeeId: string): any => {
  let url = API_PATH + `/trinh-do-dao-tao/get-by-employee/${employeeId}`;
  return axios.get(url);
};

export const getContractByEmployee = (
  employeeId: string
): Promise<AxiosResponse<any>> => {
  let url = `${API_PATH}/hop-dong-lao-dong/employee/${employeeId}`;
  return axios.get(url);
};

export const getThongTinLuongByChucDanh = (
  chucDanhId: string
): Promise<AxiosResponse<any>> => {
  const config = {
    params: {
      chucDanh: chucDanhId
    }
  }
  let url = `${API_PATH}/chuc-danh-bac-luong/get-by-chuc-danh`;
  return axios.get(url);
};

export const getContractsByEmployee = (
  employeeId: string
): Promise<AxiosResponse<any>> => {
  let url = `${API_PATH}/hop-dong-lao-dong/get-by-employee/${employeeId}`;
  return axios.get(url);
};

export const deleteMultipleContract = (
  ids: string
): Promise<AxiosResponse<any>> => {
  let url = `${API_PATH}/hop-dong-lao-dong/laborContractIds?ids=${ids}`;
  return axios.delete(url);
};

export const deleteMultipleAllowance = (
  ids: string
): Promise<AxiosResponse<any>> => {
  let url = `${API_PATH}/hop-dong-lao-dong-phu-cap/allowanceIds=${ids}`;
  return axios.delete(url);
};

export const updateTrainingInfo = (id: string, data: any) => {
  let url = API_PATH + `/trinh-do-dao-tao/${id}`;
  return axios.put(url, data);
};

export const addQuanDoi = (employeeId: string, data: any) => {
  let url = API_PATH + `/employee-quan-doi/${employeeId}`;
  return axios.post(url, data);
};

export const getQuanDoi = (employeeId: string) => {
  let url = API_PATH + `/employee-quan-doi/get-by-employee/${employeeId}`;
  return axios.get(url);
};

export const getNguoiQuanLy = () => {
  let url = API_PATH + `/employee-nguoi-quan-ly/page`;
  return axios.get(url);
}

export const updateThongTinGiaDinhChinhSach = (employeeId: string, data: any) => {
  let url = API_PATH + `/employee/thong-tin-gia-dinh-chinh-sach/${employeeId}`;
  return axios.put(url, data);
}

export const updateDanhHieuPhongTang = (employeeId: string, data: any) => {
  let url = API_PATH + `/employee/danh-hieu-phong-tang/${employeeId}`;
  return axios.put(url, data);
}