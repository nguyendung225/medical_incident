import axios from "axios";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
const API_PATH = process.env.REACT_APP_API_URL;
export const importExcel = (data: any) => {
    return axios({
        method: "get",
        url: API_PATH,
        data: data,
        responseType: "blob",
    });
};

export const fileUpload = (file: any) => {
    const authLocal = localStorageItem.get(KEY_LOCALSTORAGE.AUTH_LOCAL_STORAGE_KEY);
    const url = API_PATH+"/thu-dung/import";
    let formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        Authorization: "Bearer" + authLocal?.access_token,
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  export const sendReport = (data: any) => {
    const authLocal = localStorageItem.get(KEY_LOCALSTORAGE.AUTH_LOCAL_STORAGE_KEY);
    const url = API_PATH+"/thu-dung";
    const config = {
      headers: {
        Authorization: "Bearer" + authLocal?.access_token,
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, data, config);
  };
