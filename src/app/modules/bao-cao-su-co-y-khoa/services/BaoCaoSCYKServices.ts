import axios from "axios";
import { IKetLuanSCYK, ITiepNhan, MedicalIncidentInfo, SearchObject } from "../models/BaoCaoSCYKModels";
import { IUploadImage } from "../../component/upload-image/UploadImagePopup";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
  const config = { params: searchObject };
  return config;
};

export const searchByPage = (searchObject: SearchObject) => {
  const url = API_PATH + "/api/v1/su-co/page";
  return axios.get(url, paramsConfig(searchObject));
};

export const addSCYK = (data: MedicalIncidentInfo) => {
    const url = API_PATH + "/api/v1/su-co";
    return axios.post(url, data);
};

export const getSCYKById = (id: string) => {
    const url = API_PATH + `/api/v1/su-co/${id}`;
    return axios.get(url);
};

export const getScykInfoDetailById = (id: string) => {
    const url = API_PATH + `/api/v1/su-co/all-data/${id}`;
    return axios.get(url);
};

export const deleteSCYKById = (id: string) => {
    const url = API_PATH + `/api/v1/su-co/${id}`;
    return axios.delete(url);
};

export const updateSCYK = (data: MedicalIncidentInfo, id: string) => {
    const url = API_PATH + `/api/v1/su-co/${id}`;
    return axios.put(url, data);
};

export const exportWordFile = (id: string) => {
    const url = API_PATH + `/api/v1/su-co/export-word/${id}`;
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}

export const exportPdfFile = (id: string) => {
    const url = API_PATH + `/api/v1/su-co/export-pdf/${id}`;
    return axios.get(url);
}

export const tiepNhanSCYK = (data: ITiepNhan) => {
    const url = API_PATH + "/api/v1/tiep-nhan-su-co";
    return axios.post(url, data);
};

export const ketLuanSCYK = (data: IKetLuanSCYK) => {
    const url = API_PATH + "/api/v1/ket-luan";
    return axios.post(url, data);
};

export const getDSChucVu = () => {
    const url = API_PATH + `/api/v1/storage/chuc-vu`;
    return axios.get(url);
}

export const getDSChucDanh = () => {
    const url = API_PATH + `/api/v1/storage/chuc-danh`;
    return axios.get(url);
}

export const getDSBenhNhan = () => {
    const url = API_PATH + `/api/v1/storage/benh-nhan`;
    return axios.get(url);
}

export const getDSPhongBan = () => {
    const url = API_PATH + `/api/v1/storage/phong-ban`;
    return axios.get(url);
}
export const getDSTiepNhan = (searchObject: SearchObject) => {
    const url = API_PATH + "/api/v1/tiep-nhan-su-co/page";
    return axios.get(url, paramsConfig(searchObject));
};

export const getUpdateHistoryList = (suCoid: string) => {
    const url = API_PATH + `/api/v1/lich-su/${suCoid}`;
    return axios.get(url);
}

export const upLoadImageListSCYK = (imageList: IUploadImage[], suCoId: string) => {
    const url = `${API_PATH}/api/v1/su-co/file-dinh-kem/${suCoId}`;
    let formData = new FormData();
    imageList.forEach((imageFile: IUploadImage) => {
        if (imageFile.files[0] instanceof File) {
            formData.append("files", imageFile.files[0]);
        }
    });
    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    };
    return axios.post(url, formData, config);
};

export const updateImageListSCYK = (imageIds: string[], suCoId: string) => {
    const url = `${API_PATH}/api/v1/su-co/file-dinh-kem/${suCoId}`;
    
    return axios.delete(url, {
        data: imageIds
    });
}

export const addScykByQrCode = (scykData: any) => {
    const url = `${API_PATH}/api/v1/storage/tao-su-co`;
    let formData = new FormData();
    Object.keys(scykData).forEach((key: any) => {
        if(key !== "files") {
            formData.append(key, scykData[key] ? scykData[key] : "");
        } else {
            scykData[key].forEach((imageFile: IUploadImage) => {
                if (imageFile.files[0] instanceof File) {
                    formData.append("files", imageFile.files[0]);
                }
            });
        }
    });
    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    };
    return axios.post(url, formData, config);
}