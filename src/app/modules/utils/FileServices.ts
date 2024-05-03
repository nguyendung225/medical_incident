import axios from "axios";
import { toast } from "react-toastify";
const API_PATH = process.env.REACT_APP_API_URL;
export const fileUpload = (files: any, idFile?: any) => {
  let url = `${API_PATH}/file-dinh-kem?id=${idFile}`;
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

export const fileUploadPhanTich = (files: any, idFile?: any) => {
    let url = `${API_PATH}/phan-tich/${idFile}/file-dinh-kem`;
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
  let url = `${API_PATH}/file-dinh-kem/${fileName}`;
  return axios({
    url: url,
    method: "GET",
    responseType: "blob",
  });
};

export const downLoadFileById = (fileId: string) => {
  let url = `${API_PATH}/file-dinh-kem/${fileId}`;
  return axios({
    url: url,
    method: "GET",
    responseType: "blob",
  });
};

export const handleDownLoadFile = async (fileId: string, fileName: string) => {
  try {
      const res = await downLoadFileById(fileId);
      const url = window.URL.createObjectURL(new Blob([res?.data], {
          type: res.headers['content-type']
      }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}`);
      document.body.appendChild(link);
      link.click();
  } catch (error) {
      toast.error("Lỗi hệ thống vui lòng thử lại");
  }
};

