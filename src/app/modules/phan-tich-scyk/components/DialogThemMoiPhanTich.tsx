import { Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { RESPONSE_STATUS_CODE } from "../../utils/Constant";
import TabMenu from "../../component/tabs/TabMenu";
import { useEffect, useState } from "react";
import { IPhanTichScyk } from "../models/PhanTichSCYKModels";
import TabNhanVienChuyenTrach from "./TabNhanVienChuyenTrach";
import TabCapQuanLy from "./TabCapQuanLy";
import { addPhanTich, deleteFilePhanTich, updatePhanTich } from "../services/PhanTichSCYKServices";
import moment from "moment";
import { STATUS_PHAN_TICH, TAB_PHAN_TICH_SCYK_DIALOG } from "../constants/constants";
import { fileUpload } from "../../utils/FileServices";
import { getListDeleteItem } from "../../utils/FunctionUtils";
import { tab } from "../../models/tabModels";

type Props = {
    handleClose: () => void;
    updatePageData: (objectSearch: any) => void;
    thongTinPhanTich: IPhanTichScyk
};

const DialogThemMoiPhanTich = ({ handleClose, updatePageData, thongTinPhanTich }: Props) => {
    const [tabList, setTabList] = useState<tab[]>([]);
    const [activeTab, setActiveTab] = useState<string>("0");
    const [validationSchema, setValidationSchema] = useState<any>(Yup.object().shape({}));

    const validationTabNhanVienChuyenTrach = Yup.object().shape({
        suCoId: Yup.string().required("Bắt buộc chọn"),
        moTa: Yup.string().required("Bắt buộc nhập"),
        fileDinhKems: Yup.array().when("toKhaiLietKe", {
            is: (toKhaiLietKe: boolean) => toKhaiLietKe,
            then: Yup.array().min(1, "Bắt buộc chọn"),
        }),
        dieuTriYLenh: Yup.string().required("Bắt buộc nhập"),
        hanhDongXuLy: Yup.string().required("Bắt buộc nhập"),
        deXuatKhuyenCaoPhongNgua: Yup.string().required("Bắt buộc nhập"),
    });

    const validationTabCapQuanLy = Yup.object().shape({
        moTaKetQuaPhatHien: Yup.string().required("Bắt buộc nhập"),
        tenNguoiPhanTich: Yup.string().required("Bắt buộc nhập"),
        chucDanhNguoiPhanTich: Yup.string().required("Bắt buộc nhập"),
        gioNgayPhanTich: Yup.date().required("Bắt buộc chọn"),
    });

    const formatDataPhanTich = (values: IPhanTichScyk) => {
        return {
            ...values,
            thucHienQuyTrinhChuyenMon: values?.thucHienQuyTrinhChuyenMon.toString() || null,
            nhiemKhuanBenhVien: values?.nhiemKhuanBenhVien.toString() || null,
            thuocVaDichTruyen: values?.thuocVaDichTruyen.toString() || null,
            mauVaCacChePhamMau: values?.mauVaCacChePhamMau.toString() || null,
            thietBiYTe: values?.thietBiYTe.toString() || null,
            hanhVi: values?.hanhVi.toString() || null,
            haTangCoSo: values?.haTangCoSo.toString() || null,
            hoSoTaiLieuThuTuc: values?.hoSoTaiLieuThuTuc.toString() || null,
            moiTruongLamViec: values?.moiTruongLamViec.toString() || null,
            nguoiBenh: values?.nguoiBenh.toString() || null,
            nhanVien: values?.nhanVien.toString() || null,
            nhomNguyenNhanKhac: values?.nhomNguyenNhanKhac.toString() || null,
            nhomSuCoKhac: values?.nhomSuCoKhac.toString() || null,
            taiNanDoiVoiNguoiBenh: values?.taiNanDoiVoiNguoiBenh.toString() || null,
            toChucDichVu: values?.toChucDichVu.toString() || null,
            tonHaiToChuc: values?.tonHaiToChuc.toString() || null,
            yeuToBenNgoai: values?.yeuToBenNgoai.toString() || null,
            quanLyNguonLucToChuc: values?.quanLyNguonLucToChuc.toString() || null,
            gioPhanTich: moment(values?.gioNgayPhanTich).format("HH:mm:ss"),
            ngayPhanTich: moment(values?.gioNgayPhanTich).format("YYYY-MM-DD"),
        };
    }

    useEffect(() => {
        setTabList([
            {
                eventKey: "0",
                title: "Dành cho nhân viên chuyên trách",
                component: <TabNhanVienChuyenTrach thongTinPhanTich={thongTinPhanTich} />,
            },
            {
                eventKey: "1",
                title: "Dành cho cấp quản lý",
                component: <TabCapQuanLy />
            },
        ])
    }, [thongTinPhanTich])

    useEffect(() => {
        switch (activeTab) {
            case TAB_PHAN_TICH_SCYK_DIALOG.TAB_NHAN_VIEN_CHUYEN_TRACH:
                setValidationSchema(validationTabNhanVienChuyenTrach);
                break;
            case TAB_PHAN_TICH_SCYK_DIALOG.TAB_CAP_QUAN_LY:
                setValidationSchema(validationTabCapQuanLy);
                break;
            default:
                break;
        }
    }, [activeTab])

    const handleSubmit = async (values: IPhanTichScyk) => {
        switch (activeTab) {
            case TAB_PHAN_TICH_SCYK_DIALOG.TAB_NHAN_VIEN_CHUYEN_TRACH:
                setActiveTab(TAB_PHAN_TICH_SCYK_DIALOG.TAB_CAP_QUAN_LY);
                break;
            case TAB_PHAN_TICH_SCYK_DIALOG.TAB_CAP_QUAN_LY:
                try {
                    const { data: { code, message } } = thongTinPhanTich?.id
                        ? await updatePhanTich(formatDataPhanTich(values), thongTinPhanTich.id)
                        : await addPhanTich(formatDataPhanTich(values));
                    if (code === RESPONSE_STATUS_CODE.CREATED || code === RESPONSE_STATUS_CODE.SUCCESS) {
                        values.fileDinhKems.some((item: any) => item instanceof File) && await fileUpload(values.fileDinhKems, thongTinPhanTich?.id)
                        const listIdDelete = getListDeleteItem(thongTinPhanTich?.fileDinhKems, values.fileDinhKems)
                        listIdDelete.length > 0 && await deleteFilePhanTich(thongTinPhanTich?.id, listIdDelete)
                        updatePageData({});
                        handleClose();
                        toast.success(message)
                    }
                } catch (error) {
                    toast.error("Lỗi hệ thống, vui lòng thử lại!");
                }
                break;
            default:
                break;
        }
    }

    return (
        <Modal show={true} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    {thongTinPhanTich?.id ? "Cập nhật" : "Thêm mới"} biên bản phân tích sự cố y khoa
                </Modal.Title>
            </Modal.Header>
            <Formik
                validationSchema={validationSchema}
                initialValues={thongTinPhanTich}
                onSubmit={handleSubmit}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                    validateForm,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="pt-0">
                                <TabMenu danhsachTabs={tabList} className="flex justify-content-center" defaultActiveKey={activeTab} setCurrentTab={(key) => { setActiveTab(key) }} />
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center">
                                {
                                    activeTab === TAB_PHAN_TICH_SCYK_DIALOG.TAB_NHAN_VIEN_CHUYEN_TRACH ? (
                                        <Button
                                            className="button-primary"
                                            type="submit"
                                        >
                                            Tiếp theo
                                        </Button>
                                    ) :
                                        <>
                                            <Button
                                                className="button-primary"
                                                type="submit"
                                                onClick={() =>
                                                    setFieldValue(
                                                        "trangThaiXuLy",
                                                        STATUS_PHAN_TICH.LUU_NHAP
                                                    )
                                                }
                                            >
                                                Lưu nháp
                                            </Button>
                                            <Button
                                                className="button-primary"
                                                type="submit"
                                                onClick={() =>
                                                {
                                                    setFieldValue(
                                                        "trangThaiXuLy",
                                                        STATUS_PHAN_TICH.DA_XAC_MINH
                                                    )
                                                }}
                                            >
                                                Lưu
                                            </Button>
                                        </>
                                }


                                <Button
                                    className="button-gray"
                                    onClick={handleClose}
                                >
                                    Hủy
                                </Button>
                            </Modal.Footer>
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default DialogThemMoiPhanTich;
