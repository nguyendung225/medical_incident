import { Formik } from "formik";
import moment from "moment";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SINGIN_OPTION, STATUS_BIEN_BAN } from "../../bien-ban-xac-minh/const/constants";
import FileUploadDialog from "../../component/FileUpload/FileUploadDialog";
import LabelRequired from "../../component/LabelRequired";
import TextField from "../../component/TextField";
import Autocomplete from "../../component/input-field/Autocomplete";
import { heightSelectMutil } from "../../component/input-field/StyleComponent";
import { RESPONSE_STATUS_CODE } from "../../utils/Constant";
import { fileUpload } from "../../utils/FileServices";
import { getListDeleteItem } from "../../utils/FunctionUtils";
import { integerValidation } from "../../utils/ValidationSchema";
import { IBienBanHop } from "../model/BienBanHopModel";
import { addBienBan, getListSuCoChuaHop, updateBienBan } from "../services/BienBanHopServices";
import FileInfo from "../../component/FileUpload/FileInfo";
import { deleteFileBienBanHop } from "../../bien-ban-xac-minh/services/BienBanXacMinhServices";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { localStorageItem } from "../../utils/LocalStorage";

type Props = {
    handleClose: () => void;
    updatePageData: (objectSearch: any) => void;
    thongTinBienBan: IBienBanHop;
};

const DialogThemMoiBienBanHop = ({
    handleClose,
    updatePageData,
    thongTinBienBan,
}: Props) => {
    const [openFileDialog, setOpenFileDialog] = useState(false)
    const validationSchema = Yup.object().shape({
        departmentId: Yup.string().required("Bắt buộc chọn").nullable(),
        bienBan: Yup.string().required("Bắt buộc chọn"),
        suCoId: Yup.string().required("Bắt buộc chọn"),
        ketLuan: Yup.string().required("Bắt buộc chọn"),
        gioKetThuc: Yup.string().when(['ngayHop', 'ngayKetThuc'], {
            is: (ngayBatDau: any, ngayKetThuc: any) => {
                return moment(ngayBatDau).isSame(ngayKetThuc, 'day');
            },
            then: Yup.string().required('Giờ kết thúc là bắt buộc').test({
                name: 'compareGioBatDauGioKetThuc',
                message: 'Giờ kết thúc phải lớn hơn giờ bắt đầu nếu diễn ra cùng ngày',
                test: function (gioKetThuc) {
                    const { gioHop } = this.parent;
                    const gioBatDauObj = moment(gioHop, 'HH:mm');
                    const gioKetThucObj = moment(gioKetThuc, 'HH:mm');
                    return gioKetThucObj.isAfter(gioBatDauObj);
                },
            }),
            otherwise: Yup.string().required('Giờ kết thúc là bắt buộc'),
        }),
        gioHop: Yup.string().required("Bắt buộc chọn"),
        diaDiem: Yup.string().required("Bắt buộc chọn"),
        tomTatNoiDung: Yup.string().required("Bắt buộc nhập"),
        noiDung: Yup.string().required("Bắt buộc chọn").nullable(),
        chuTriId: Yup.string().required("Bắt buộc chọn").nullable(),
        thuKyId: Yup.string().required("Bắt buộc chọn").nullable(),
        nguoiTrinhBayId: Yup.string().required("Bắt buộc chọn").nullable(),
        isChuTriKy: Yup.number().required("Bắt buộc chọn").nullable(),
        isThuKyKy: Yup.number().required("Bắt buộc chọn").nullable(),
        ngayKetThuc: Yup.date().required("Bắt buộc nhập").max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại').min(Yup.ref('ngayHop'), 'Ngày kết thúc không được trước ngày họp'),
        ngayHop: Yup.date().required("Bắt buộc nhập").max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại').max(Yup.ref('ngayKetThuc'), 'Ngày họp không được sau ngày kết thúc'),
        soThanhVienCoMat: integerValidation,
        tongSo: integerValidation,
    });

    const formatDataBienBan = (data: IBienBanHop) => {
        const formatData = { ...data };
        formatData.ngayGioHop = `${formatData.ngayHop}T${formatData.gioHop}`
        formatData.ngayGioKetThuc = `${formatData.ngayKetThuc}T${formatData.gioKetThuc}`
        formatData.isChuTriKy = Boolean(data.isChuTriKy)
        formatData.isThuKyKy = Boolean(data.isThuKyKy)
        formatData.noiNhan = (formatData?.noiNhan as any)?.map((item: any) => item?.code).toString()

        return formatData;
    };

    const handleSubmit = async (values: IBienBanHop) => {
        try {
            const { data: { code, message } } = thongTinBienBan?.id
                    ? await updateBienBan(
                        formatDataBienBan(values),
                        thongTinBienBan.id
                    )
                    : await addBienBan(formatDataBienBan(values));
            if (
                code === RESPONSE_STATUS_CODE.CREATED ||
                code === RESPONSE_STATUS_CODE.SUCCESS
            ) {
                values.fileDinhKems.some((item: any) => item instanceof File) && await fileUpload(values.fileDinhKems, thongTinBienBan?.id)
                const listIdDelete = getListDeleteItem(thongTinBienBan?.fileDinhKems, values.fileDinhKems)
                listIdDelete.length > 0 && await deleteFileBienBanHop(listIdDelete)
                updatePageData({});
                handleClose();
                toast.success(message);
            }
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    return (
        <Modal show={true} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    {thongTinBienBan?.id ? "Cập nhật" : "Thêm mới"} biên bản họp
                </Modal.Title>
            </Modal.Header>
            <Formik
                validationSchema={validationSchema}
                initialValues={thongTinBienBan}
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    values,
                    touched,
                    handleSubmit,
                    setFieldValue,
                    setValues,
                }) => {
                    
                    const handleChangeSelect = (name: string, value: any) => {
                        setFieldValue(name, value?.code);
                    };

                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="pt-0">
                                <div className="form-container">
                                    <div className="d-flex spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                isRequired
                                                label="Bộ môn/Khoa/Phòng"
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <Autocomplete
                                                onChange={(selectedOption) =>
                                                    setFieldValue(
                                                        "departmentId",
                                                        selectedOption.id
                                                    )
                                                }
                                                value={
                                                    values.departmentId
                                                }
                                                className="spaces h-25 width-100"
                                                name="departmentId"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                                errors={
                                                    errors?.departmentId
                                                }
                                                touched={
                                                    touched?.departmentId
                                                }
                                            />
                                        </div>

                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                label="Số"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <TextField
                                                disabled
                                                className="spaces width-100"
                                                name="code"
                                                type="text"
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Biên bản"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="bienBan"
                                                type="text"
                                            />
                                        </div>

                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Mã sự cố"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                isDisabled={!!thongTinBienBan?.id}
                                                onChange={(
                                                    selectedOption
                                                ) =>
                                                    setValues({ ...values, suCoId: selectedOption.id })
                                                }
                                                getOptionLabel={(option) => option.code}
                                                className="spaces h-25 width-100"
                                                name="suCoId"
                                                value={values?.suCoResp?.code ? {
                                                    code: values?.suCoResp.code,
                                                    name: values?.suCoResp.name,

                                                } : null}
                                                errors={errors?.suCoId}
                                                touched={
                                                    touched?.suCoId
                                                }
                                                searchObject={{}}
                                                searchFunction={getListSuCoChuaHop}
                                                options={[]}

                                            />
                                        </div>
                                    </div>
                                    <div className="spaces fw-700 mt-4">
                                        1.Thời gian họp
                                    </div>
                                    <div className="d-flex  spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                isRequired
                                                label="Thời gian bắt đầu"
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="gioHop"
                                                type="time"
                                            />
                                        </div>

                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Ngày họp"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="ngayHop"
                                                type="date"
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Địa điểm"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="diaDiem"
                                                type="text"
                                            />
                                        </div>

                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Nội dung"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="noiDung"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="spaces fw-700 mt-4">
                                        2.Thành phần tham dự
                                    </div>
                                    <div className="d-flex spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                isRequired
                                                label="Chủ trì"
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <Autocomplete
                                                onChange={(
                                                    selectedOption
                                                ) =>
                                                    setValues({
                                                        ...values, chuTriId: selectedOption.id,
                                                        chucDanhChuTriId: selectedOption.maChucDanh,
                                                        chucVuChuTriId: selectedOption.maChucVu
                                                    })
                                                }
                                                getOptionLabel={(option) => option.fullName}
                                                className="spaces h-25 width-100"
                                                name="chuTriId"
                                                value={values.chuTriId}
                                                errors={errors?.chuTriId}
                                                touched={
                                                    touched?.chuTriId
                                                }
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_NHAN_VIEN)}

                                            />
                                        </div>

                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                label="Chức danh"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                isDisabled
                                                className="spaces h-25 width-100"
                                                name="chucDanhChuTriId"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_DANH)}
                                                value={values.chucDanhChuTriId}

                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                label="Chức vụ"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                isDisabled
                                                className="spaces h-25 width-100"
                                                name="chucVuChuTriId"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_VU)}
                                                value={values.chucVuChuTriId}

                                            />
                                        </div>
                                        <div className="d-flex spaces width-24" />
                                    </div>
                                    <div className="d-flex spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                label="Thư kí"
                                                isRequired
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <Autocomplete
                                                onChange={(
                                                    selectedOption
                                                ) =>
                                                    setValues({
                                                        ...values, thuKyId: selectedOption.id,
                                                        chucDanhThuKyId: selectedOption.maChucDanh,
                                                        chucVuThuKyId: selectedOption.maChucVu
                                                    })
                                                }
                                                getOptionLabel={(option) => option.fullName}
                                                className="spaces h-25 width-100"
                                                name="thuKyId"
                                                value={values.thuKyId}
                                                errors={errors?.thuKyId}
                                                touched={
                                                    touched?.thuKyId
                                                }
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_NHAN_VIEN)}

                                            />
                                        </div>

                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                label="Chức danh"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                isDisabled
                                                className="spaces h-25 width-100"
                                                name="chucDanhThuKyId"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_DANH)}
                                                value={values.chucDanhThuKyId}

                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                label="Chức vụ"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                isDisabled
                                                className="spaces h-25 width-100"
                                                name="chucVuThuKyId"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_VU)}
                                                value={values.chucVuThuKyId}
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24" />
                                    </div>
                                    <div className="d-flex spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                isRequired
                                                label="Thành viên có mặt"
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="soThanhVienCoMat"
                                                type="text"
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Tổng số"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="tongSo"
                                                type="text"
                                            />
                                        </div>

                                        <div className="d-flex spaces width-24" />
                                        <div className="d-flex spaces width-24" />
                                    </div>
                                    <div className="spaces fw-700 mt-4">
                                        3.Nội dung
                                    </div>
                                    <div className="d-flex spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                isRequired
                                                label="Trình bày báo cáo"
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <Autocomplete
                                                onChange={(
                                                    selectedOption
                                                ) =>
                                                    setValues({
                                                        ...values, nguoiTrinhBayId: selectedOption.id,
                                                        chucDanhNguoiTrinhBayId: selectedOption.maChucDanh,
                                                        chucVuNguoiTrinhBayId: selectedOption.maChucVu
                                                    })
                                                }
                                                getOptionLabel={(option) => option.fullName}
                                                className="spaces h-25 width-100"
                                                name="nguoiTrinhBayId"
                                                value={values.nguoiTrinhBayId}
                                                errors={errors?.nguoiTrinhBayId}
                                                touched={
                                                    touched?.nguoiTrinhBayId
                                                }
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_NHAN_VIEN)}
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                label="Chức danh"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                isDisabled
                                                className="spaces h-25 width-100"
                                                name="chucDanhNguoiTrinhBayId"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_DANH)}
                                                value={values.chucDanhNguoiTrinhBayId}

                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                label="Chức vụ"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                isDisabled
                                                className="spaces h-25 width-100"
                                                name="chucVuNguoiTrinhBayId"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_DANH)}
                                                value={values.chucVuNguoiTrinhBayId}
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24" />
                                    </div>
                                    <div className="d-flex align-items-center spaces width-100 pl-10">
                                        <LabelRequired
                                            isRequired
                                            label="Tóm tắt báo cáo"
                                            className="spaces min-w-130 fw-500"
                                        />
                                        <div className="flex-fill">
                                            <TextField
                                                name="tomTatNoiDung"
                                                as="textarea"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center spaces width-100 pl-10">
                                        <LabelRequired
                                            label="Thảo luận"
                                            className="spaces min-w-130 fw-500"
                                        />
                                        <div className="flex-fill">
                                            <TextField
                                                name="thaoLuan"
                                                as="textarea"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center spaces width-100 pl-10">
                                        <LabelRequired
                                            label="Ý kiến phát biếu"
                                            className="spaces min-w-130 fw-500"
                                        />
                                        <div className="flex-fill">
                                            <TextField
                                                name="yKien"
                                                as="textarea"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center spaces width-100 pl-10">
                                        <LabelRequired
                                            isRequired
                                            label="Kết luận của chủ trì"
                                            className="spaces min-w-130 fw-500"
                                        />
                                        <div className="flex-fill">
                                            <TextField
                                                name="ketLuan"
                                                as="textarea"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center spaces width-100 pl-10">
                                        <LabelRequired
                                            label="Biểu quyết"
                                            className="spaces min-w-130 fw-500"
                                        />
                                        <div className="flex-fill">
                                            <TextField name="bieuQuyet" />
                                        </div>
                                    </div>
                                    <div className="d-flex  spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                isRequired
                                                label="Kết thúc vào"
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="gioKetThuc"
                                                type="time"
                                            />
                                        </div>

                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Ngày"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <TextField
                                                className="spaces width-100"
                                                name="ngayKetThuc"
                                                type="date"
                                            />
                                        </div>
                                        <div className="d-flex spaces width-48">
                                            <LabelRequired
                                                label="Đính kèm"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <FileInfo numberFile={values.fileDinhKems?.length} handleOpenDialogUpload={() => setOpenFileDialog(true)} />
                                        </div>


                                    </div>
                                    <div className="d-flex spaces width-100 pl-10">
                                        <LabelRequired
                                            label="Nơi nhận"
                                            className="spaces min-w-130 fw-500"
                                        />
                                        <Autocomplete
                                            onChange={(selectedOption) =>
                                                setFieldValue("noiNhan", selectedOption)
                                            }
                                            isMulti
                                            styles={heightSelectMutil("auto", "25px")}
                                            value={values.noiNhan}
                                            className="spaces width-100"
                                            name="noiNhan"
                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                            errors={errors?.noiNhan}
                                            getOptionValue={(option) => option?.code}
                                            touched={touched?.noiNhan}
                                        />

                                    </div>
                                    <div className="spaces fw-700 mt-4">
                                        4.Ký biên bản
                                    </div>
                                    <div className="d-flex  spaces gap-10">
                                        <div className="d-flex spaces width-28 pl-10">
                                            <LabelRequired
                                                isRequired
                                                label="Chủ trì"
                                                className="spaces min-w-130 fw-500"
                                            />
                                            <Autocomplete
                                                menuPlacement="top"
                                                onChange={(selectedOption) =>
                                                    handleChangeSelect(
                                                        "isChuTriKy",
                                                        selectedOption
                                                    )
                                                }
                                                value={
                                                    values.isChuTriKy
                                                }
                                                className="spaces h-25 width-100"
                                                name="isChuTriKy"
                                                options={SINGIN_OPTION}
                                                errors={
                                                    errors?.isChuTriKy
                                                }
                                                touched={
                                                    touched?.isChuTriKy
                                                }
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24">
                                            <LabelRequired
                                                isRequired
                                                label="Thư kí"
                                                className="spaces min-w-80 fw-500"
                                            />
                                            <Autocomplete
                                                menuPlacement="top"
                                                onChange={(selectedOption) =>
                                                    handleChangeSelect(
                                                        "isThuKyKy",
                                                        selectedOption
                                                    )
                                                }
                                                value={
                                                    values.isThuKyKy
                                                }
                                                className="spaces h-25 width-100"
                                                name="isThuKyKy"
                                                options={SINGIN_OPTION}
                                                errors={
                                                    errors?.isThuKyKy
                                                }
                                                touched={
                                                    touched?.isThuKyKy
                                                }
                                            />
                                        </div>
                                        <div className="d-flex spaces width-24" />
                                        <div className="d-flex spaces width-24" />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center">
                                <Button
                                    className="button-primary"
                                    onClick={handleClose}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    className="button-primary"
                                    onClick={() => {
                                        setFieldValue(
                                            "trangThaiXuly",
                                            STATUS_BIEN_BAN.LUU_NHAP
                                        );
                                    }}
                                    type="submit"
                                >
                                    Lưu nháp
                                </Button>
                                <Button
                                    className="button-primary"
                                    type="submit"
                                    onClick={() => {
                                        setFieldValue(
                                            "trangThaiXuly",
                                            STATUS_BIEN_BAN.DA_XAC_MINH
                                        );
                                    }}
                                >
                                    Lưu
                                </Button>
                            </Modal.Footer>
                            {
                                openFileDialog && <FileUploadDialog listFile={values.fileDinhKems} setListFile={(value: any) => {
                                    setFieldValue("fileDinhKems", value)
                                }} handleClose={() => setOpenFileDialog(false)} />
                            }
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default DialogThemMoiBienBanHop;
