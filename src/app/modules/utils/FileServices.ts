import axios from "axios";
const API_PATH = process.env.REACT_APP_API_URL;
export const fileUpload = (files: any, idFile?: any) => {
  let url = `${API_PATH}/api/v1/file-dinh-kem?id=${idFile}`;
  let formData = new FormData();
  files.forEach((file: File, index: number) => {
    if (file instanceof File) {
      formData.append(`files`, files[index]);
    }
  });
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(url, formData, config);
};
export const imageUpload = (file: any) => {
  let url = `${API_PATH}/file/upload-image`;
  let formData = new FormData();
  formData.append("uploadImage", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(url, formData, config);
};
export const downLoadFile = (fileName: string) => {
  let url = `${API_PATH}/api/v1/file-dinh-kem/${fileName}`;
  return axios({
    url: url,
    method: "GET",
    responseType: "blob",
  });
};

export const downLoadFileById = (fileId: string) => {
  let url = `${API_PATH}/api/v1/file-dinh-kem/${fileId}`;
  return axios({
    url: url,
    method: "GET",
    responseType: "blob",
  });
};

