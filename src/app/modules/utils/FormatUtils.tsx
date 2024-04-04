import moment from "moment";
import { GENDER, MEDICAL_INCIDENT_REPORT_STATUS, NUMBER_EXCEPT_THIS_SYMBOLS } from "./Constant";
import { Col, Form, FormCheck, Row } from 'react-bootstrap';
import CustomTextarea from '../component/custom-textarea/CustomTextarea';

export const convertNumberPrice = (value: any) => {
    let number = Number(value ? value : 0)
    let plainNumber = number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&.");
    return plainNumber.substr(0, plainNumber.length - 2);
}

export const checkObject = (value: any) => {
    if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
    ) {
        return true;
    }
    return false;
}

export const formatDateToString = (date: string | Date | undefined) => {
    let newDate = date ? new Date(date) : null;
    return newDate ? moment(newDate).format("DD/MM/YYYY") : "";
}

export const formatDateAdvanceToString = (date: string | Date | undefined) => {
    return date ? moment(date).format("DD/MM/YYYY HH:mm:ss") : "";
}

export const formatDateDTO = (date: string) => {
    return date ? moment(date).format("YYYY-MM-DDTHH:mm:ss") : "";
}

export const formatDate = (value: string | undefined) => {
    if (value) {
        return value.split('-').reverse().join('/').toString();
    } else {
        return value;
    }
}

export const handleAgeCalculate = (DOB: string) => {
    const ageInMilliseconds = +(new Date()) - +(new Date(DOB));
    const ageDate = new Date(ageInMilliseconds);

    if (ageDate.getUTCFullYear() - 1970 < 1) {
        if (ageDate.getUTCMonth() < 1) {
            const days = ageDate.getUTCDate() - 1;
            return `${days} ngày`;
        } else {
            return `${ageDate.getUTCMonth()} tháng`;
        }
    } else {
        return `${Math.abs(ageDate.getUTCFullYear() - 1970).toString()} tuổi`;
    }
};

export const generateRandomId = (length: number = 10): string => {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    let randomId: string = '';

    for (let i: number = 0; i < length; i++) {
        const randomIndex: number = Math.floor(Math.random() * charactersLength);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
};

export const removeDiacritics = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export const handleSum = (array: any, name: string) => {
    return array?.length > 0 ? array.reduce((accumulator: number, dichVu: any) => accumulator + Number(dichVu?.[name]), 0) : 0;
}

export const numberExceptThisSymbols = (event: any) => {
    return NUMBER_EXCEPT_THIS_SYMBOLS.includes(event?.key) && event.preventDefault()
}


export const covertSinhHieu = (data: any) => {
    let sinhHieu: any = {}
    if (data?.length > 0) {
        data.map((item: any) => {
            sinhHieu[item?.code] = item
        })
    }
    return sinhHieu;
}

export const newDate = (birthYear: number, birthMonth = 0, birthDay = 1, birthHour = 0, birthMinute = 0, birthSecond = 0) => {
    birthDay = birthDay <= 0 ? 1 : birthDay;
    return birthYear ? (new Date(birthYear, birthMonth - 1, birthDay, birthHour, birthMinute, birthSecond)).toString() : "";
}

export const validateNgay = (ngay: number, thang: number, nam: number) => {
    if (ngay < 1 || ngay > 31) {
        return false;
    }

    if (thang === 4 || thang === 6 || thang === 9 || thang === 11) {
        return ngay <= 30;
    }

    if (thang === 2) {
        if ((nam % 4 === 0 && nam % 100 !== 0) || nam % 400 === 0) {
            return ngay <= 29;
        }
        return ngay <= 28;
    }

    return true;
};

export const renderItemKhamBoPhan = (Data: any) => (
    <Row>
        {Data.map((item: any) => {
            return (
                <Col xs="4" className="d-flex">
                    <Form className="d-flex align-items-center">
                        <FormCheck
                            type="checkbox"
                            label={item?.name}
                            className="min-w-125px d-flex align-items-end gap-2"
                            name={item?.code}
                        />
                        <CustomTextarea marginUnderline={8} />
                    </Form>
                </Col>
            );
        })}
    </Row>
);

//--------------------------------------------
export const convertGenderToString = (genderCode: number | string) => {
    switch(genderCode) {
        case GENDER.MALE: return "Nam";
        case GENDER.FEMALE: return "Nữ";
        default: return "Khác";
    }
}

export const renderMedicalIncidentReportStatus = (reportStatus: number) => {
    switch (reportStatus) {
        case MEDICAL_INCIDENT_REPORT_STATUS.DRAFT:
            return (<i className="bi bi-circle-fill spaces fs-10"></i>);
        case MEDICAL_INCIDENT_REPORT_STATUS.CHO_TIEP_NHAN:
            return (<i className="bi bi-circle-fill spaces fs-10 color-steel-blue"></i>);
        case MEDICAL_INCIDENT_REPORT_STATUS.DA_TIEP_NHAN:
            return (<i className="bi bi-circle-fill spaces fs-10 color-green"></i>);
        case MEDICAL_INCIDENT_REPORT_STATUS.DA_XAC_MINH:
            return (<i className="bi bi-circle-fill spaces fs-10 color-dark-orange"></i>);
        case MEDICAL_INCIDENT_REPORT_STATUS.DA_PHAN_TICH:
            return (<i className="bi bi-circle-fill spaces fs-10 color-dark-red"></i>);
        case MEDICAL_INCIDENT_REPORT_STATUS.TAO_BIEN_BAN:
            return (<i className="bi bi-circle-fill spaces fs-10 color-gunmetal"></i>);
        case MEDICAL_INCIDENT_REPORT_STATUS.DA_BAO_CAO:
            return (<i className="bi bi-circle-fill spaces fs-10 color-primary"></i>);
        case MEDICAL_INCIDENT_REPORT_STATUS.DA_KET_LUAN:
            return (<i className="bi bi-circle-fill spaces fs-10 color-purple"></i>);
    }
}

export const convertLabelByCode = (options: any, code: number | string = "") => {
        return options?.find((option: any) => option.code === code || option.id === code)?.name
}

export function seperateTime(stringDate: string) {
    const dateTime = new Date(stringDate);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    return {
        year: year, month: month, day: day, hours: hours, minutes: minutes, seconds: seconds,
        date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };
}

export const convertBooleanToNumber = (value: any) => {
    return value ? 1 : 0
}
