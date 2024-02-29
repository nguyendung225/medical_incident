import moment from 'moment';
import { formatDateAdvanceToString } from '../../../utils/FormatUtils';
export const convertDataTiepNhan = (data: any) => {
    let thoiGianTiepNhan = moment(data?.benhNhanCase?.thoiGianTiepNhan, 'DD/MM/YYYY HH:mm:ss').toDate();
    let thoiGianDukien = new Date(thoiGianTiepNhan)
    let phongKham= data?.DSDichVu[0];
    thoiGianDukien.setMinutes(thoiGianDukien.getMinutes() + 20);

    if (data?.DSDichVu?.length > 0) {
        data?.DSDichVu?.forEach((item: any, index: number) => {
            item.index = (index + 1)
            item.isNotLastRecord = (data?.DSDichVu?.length === index + 1)
        });
    }

    let dataTiepNhan = {
        thoiGianTiepNhan: formatDateAdvanceToString(thoiGianTiepNhan),
        hoTen: data?.hoTen,
        mpi: data?.mpi,
        gioiTinh: data?.gender?.name,
        namSinh: data?.namSinh,
        diaChi: data?.diaChi,
        tenPhongKham: phongKham?.departmentName,
        soThuTu: 1,
        tenDoiTuong: data?.loaiDoiTuong?.name,
        DSDichVu: data?.DSDichVu,
        thoiGianDukien: formatDateAdvanceToString(thoiGianDukien?.toString())
    }

    return dataTiepNhan
}