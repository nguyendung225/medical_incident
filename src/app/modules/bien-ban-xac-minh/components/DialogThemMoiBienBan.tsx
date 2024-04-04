import { Formik } from "formik";
import { Button, Col, Modal, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import LabelRequired from "../../component/LabelRequired";
import TextField from "../../component/TextField";
import Autocomplete from "../../component/input-field/Autocomplete";
import { RESPONSE_STATUS_CODE } from "../../utils/Constant";
import { SINGIN_OPTION, STATUS_BIEN_BAN, initNguoiThamDu } from "../const/constants";
import { IBienBanXacMinh } from "../models/BienBanXacMinhModel";
import { addBienBan, getListSuCoChuaXacMinh, updateBienBan } from "../services/BienBanXacMinhServices";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { localStorageItem } from "../../utils/LocalStorage";
import moment from "moment";

type Props = {
    handleClose: () => void;
    updatePageData: (objectSearch: any) => void;
    thongTinBienBan: IBienBanXacMinh
};

const DialogThemMoiBienBan = ({ handleClose, updatePageData, thongTinBienBan }: Props) => {

    const validationSchema = Yup.object().shape({
        suCoId: Yup.string().required("Bắt buộc chọn"),
        tenNguoiChuTri: Yup.string().required("Bắt buộc nhập"),
        maChucVuNguoiChuTri: Yup.string().required("Bắt buộc chọn"),
        donViNguoiChuTri: Yup.string().required("Bắt buộc chọn"),
        tenThanhVienDoan: Yup.string().required("Bắt buộc nhập"),
        maChucVuThanhVienDoan: Yup.string().required("Bắt buộc chọn"),
        donViThanhVienDoan: Yup.string().required("Bắt buộc chọn"),
        tenNguoiChungKien: Yup.string().required("Bắt buộc nhập"),
        maChucVuNguoiChungKien: Yup.string().required("Bắt buộc chọn"),
        donViNguoiChungKien: Yup.string().required("Bắt buộc chọn"),
        isNguoiChuTriKy: Yup.number().required("Bắt buộc chọn").nullable(),
        isThanhVienDoanKy: Yup.number().required("Bắt buộc chọn").nullable(),
        isNguoiLapKy: Yup.number().required("Bắt buộc chọn").nullable(),
        isNguoiChungKienKy: Yup.number().required("Bắt buộc chọn").nullable(),
        isNguoiThamDuKy: Yup.number().required("Bắt buộc chọn").nullable(),
        hoiXacMinh: Yup.string().required("Bắt buộc nhập"),
        ngayXacMinh: Yup.date().required("Bắt buộc nhập").max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại'),
        ngayKetThuc: Yup.date().required("Bắt buộc nhập").max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại'),
        noiXacMinh: Yup.string().required("Bắt buộc nhập"),
        soTrang: Yup.string().required("Bắt buộc nhập").nullable().test('is-integer', 'Vui lòng nhập một số nguyên', (value) => /^\d+$/.test(value || "")
        ),
        soBan: Yup.string().required("Bắt buộc nhập").nullable().test('is-integer', 'Vui lòng nhập một số nguyên', (value) => /^\d+$/.test(value || "")
        ),
        hoiKetThuc: Yup.string().when(['ngayXacMinh', 'ngayKetThuc'], {
            is: (ngayXacMinh: any, ngayKetThuc: any) => {
                return moment(ngayXacMinh).isSame(ngayKetThuc, 'day');
            },
            then: Yup.string().required('Giờ kết thúc là bắt buộc').test({
                name: 'compareGioBatDauGioKetThuc',
                message: 'Giờ kết thúc phải lớn hơn giờ xác minh nếu diễn ra cùng ngày',
                test: function (hoiKetThuc) {
                    const { hoiXacMinh } = this.parent;
                    const gioBatDauObj = moment(hoiXacMinh, 'HH:mm');
                    const hoiKetThucObj = moment(hoiKetThuc, 'HH:mm');
                    return hoiKetThucObj.isAfter(gioBatDauObj);
                },
            }),
            otherwise: Yup.string().required('Giờ kết thúc là bắt buộc'),
        }),
        nguoiThamDus: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required('Vui lòng nhập tên'),
              maChucVu: Yup.string().required('Vui lòng nhập mã chức vụ'),
              donViId: Yup.string().required('Vui lòng nhập ID đơn vị'),
            })
          ),
    
    });

    const formatDataBienBan = (data: IBienBanXacMinh) => {
        const formatData = { ...data }
        formatData.ngayGioXacMinh = `${data.ngayXacMinh}T${data.hoiXacMinh}`
        formatData.ngayGioKetThuc = `${formatData.ngayKetThuc}T${formatData.hoiKetThuc}`
        formatData.isNguoiChuTriKy = Boolean(data.isNguoiChuTriKy)
        formatData.isNguoiChungKienKy = Boolean(data.isNguoiChungKienKy)
        formatData.isNguoiLapKy = Boolean(data.isNguoiLapKy)
        formatData.isNguoiThamDuKy = Boolean(data.isNguoiThamDuKy)
        formatData.isThanhVienDoanKy = Boolean(data.isThanhVienDoanKy)
        return formatData
    }

    const handleSubmit = async (values: IBienBanXacMinh) => {
        try {
            const { data: { code, message } } = thongTinBienBan?.id
                ? await updateBienBan(formatDataBienBan(values), thongTinBienBan.id)
                : await addBienBan(formatDataBienBan(values));
            if (code === RESPONSE_STATUS_CODE.CREATED || code === RESPONSE_STATUS_CODE.SUCCESS) {
                updatePageData({});
                handleClose();
                toast.success(message)
            }

        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    }

    return (
        <Modal show={true} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    {thongTinBienBan?.id ? "Cập nhật" : "Thêm mới"} biên bản xác minh sự cố y khoa
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
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    setValues,
                }) => {

                    const handleChangeSelect = (name: string, value: any) => {
                        setFieldValue(name, value?.code);
                    };

                    const handleChangeSelectId = (name: string, value: any) => {
                        setFieldValue(name, value?.id);
                    };

                    const handleDeleteNguoiThamGia = (index: number) => {
                        values.nguoiThamDus.splice(index, 1)
                        setFieldValue("nguoiThamDus", values.nguoiThamDus)
                    }
                    
                    (thongTinBienBan?.id && !values?.tenSuCo) && setFieldValue("tenSuCo", values?.suCoResp?.name || "Không xác định");
                    (!values?.suCoId && values.suCoResp?.id) && setFieldValue("suCoId", values.suCoResp.id);
                    
                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="pt-0">
                                <div className="form-container">
                                    <Row>
                                        <div className="group-row">
                                            <Row>
                                                <Col xs={3}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            label="Mã sự cố"
                                                            className="spaces min-w-80 fw-500"
                                                        />
                                                        <Autocomplete
                                                            isDisabled={!!thongTinBienBan?.id}
                                                            onChange={(
                                                                selectedOption
                                                            ) =>
                                                                setValues({ ...values, suCoId: selectedOption?.id, tenSuCo: selectedOption?.name })
                                                            }
                                                            getOptionLabel={(option) => option.code}
                                                            className="spaces h-25 width-100"
                                                            name="suCoId"
                                                            value={values?.suCoResp?.code ? {
                                                                code: values.suCoResp.code,
                                                                name: values.suCoResp.name,

                                                            } : null}
                                                            errors={errors?.suCoId}
                                                            touched={
                                                                touched?.suCoId
                                                            }
                                                            searchObject={{}}
                                                            searchFunction={getListSuCoChuaXacMinh}
                                                            options={[]}

                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            label="Tên sự cố y khoa"
                                                            className="spaces min-w-100 fw-500"
                                                        />
                                                        <TextField
                                                            disabled
                                                            value={values.suCoId ? values.tenSuCo : ""}
                                                            type="text"
                                                            name="tenSuCo"
                                                            className="spaces width-100"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={3}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            label="Hồi"
                                                            isRequired
                                                            className="spaces min-w-80 fw-500"
                                                        />
                                                        <TextField
                                                            className="spaces width-100"
                                                            name="hoiXacMinh"
                                                            type="time"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Ngày xác minh"
                                                            className="spaces min-w-100 fw-500"
                                                        />
                                                        <TextField
                                                            name="ngayXacMinh"
                                                            type="date"
                                                            className="spaces width-100"

                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={3}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            label="Tại"
                                                            isRequired
                                                            className="spaces min-w-30 fw-500"
                                                        />
                                                        <TextField
                                                            name="noiXacMinh"
                                                            className="spaces width-100"
                                                            type="text"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="spaces fw-700 mb-6">
                                                Chúng tôi gồm :
                                            </div>
                                        </Col>
                                        <div className="group-row">
                                            <Row>
                                                <Col xs={12}>
                                                    <div className="text-primary mb-2">
                                                        Chủ trì xác minh sự cố y
                                                        khoa
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Ông bà"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <TextField
                                                            className="spaces width-100"
                                                            name="tenNguoiChuTri"
                                                            type="text"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Chức vụ"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <Autocomplete
                                                            onChange={(
                                                                selectedOption
                                                            ) =>
                                                            handleChangeSelectId(
                                                                    "maChucVuNguoiChuTri",
                                                                    selectedOption
                                                                )
                                                            }
                                                            value={values.maChucVuNguoiChuTri}
                                                            className="spaces h-25 width-100"
                                                            name="maChucVuNguoiChuTri"
                                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_VU)}
                                                            errors={errors?.maChucVuNguoiChuTri}
                                                            touched={
                                                                touched?.maChucVuNguoiChuTri
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            label="Đơn vị"
                                                            isRequired
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <Autocomplete
                                                            onChange={(
                                                                selectedOption
                                                            ) =>
                                                                handleChangeSelectId(
                                                                    "donViNguoiChuTri",
                                                                    selectedOption
                                                                )
                                                            }
                                                            value={values.donViNguoiChuTri}
                                                            className="spaces h-25 width-100"
                                                            name="donViNguoiChuTri"
                                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                                            getOptionValue={option=>option.code}
                                                            errors={errors?.donViNguoiChuTri}
                                                            touched={
                                                                touched?.donViNguoiChuTri
                                                            }

                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className="text-primary mb-2">
                                                        Thành viên đoàn xác minh sự
                                                        cố y khoa
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Ông bà"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <TextField
                                                            className="spaces width-100"
                                                            name="tenThanhVienDoan"
                                                            type="text"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Chức vụ"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <Autocomplete
                                                            onChange={(
                                                                selectedOption
                                                            ) =>
                                                            handleChangeSelectId(
                                                                    "maChucVuThanhVienDoan",
                                                                    selectedOption
                                                                )
                                                            }
                                                            value={values.maChucVuThanhVienDoan}
                                                            className="spaces h-25 width-100"
                                                            name="maChucVuThanhVienDoan"
                                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_VU)}
                                                            errors={errors?.maChucVuThanhVienDoan}
                                                            touched={
                                                                touched?.maChucVuThanhVienDoan
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Đơn vị"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <Autocomplete
                                                            onChange={(
                                                                selectedOption
                                                            ) =>
                                                                handleChangeSelectId(
                                                                    "donViThanhVienDoan",
                                                                    selectedOption
                                                                )
                                                            }
                                                            value={values.donViThanhVienDoan}
                                                            className="spaces h-25 width-100"
                                                            name="donViThanhVienDoan"
                                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                                            errors={errors?.donViThanhVienDoan}
                                                            touched={
                                                                touched?.donViThanhVienDoan
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className="text-primary mb-2">
                                                        Người chứng kiến
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Ông bà"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <TextField
                                                            className="spaces width-100"
                                                            name="tenNguoiChungKien"
                                                            type="text"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Chức vụ"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <Autocomplete
                                                            onChange={(
                                                                selectedOption
                                                            ) =>
                                                                handleChangeSelectId(
                                                                    "maChucVuNguoiChungKien",
                                                                    selectedOption
                                                                )
                                                            }
                                                            value={values.maChucVuNguoiChungKien}
                                                            className="spaces h-25 width-100"
                                                            name="maChucVuNguoiChungKien"
                                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_VU)}
                                                            errors={errors?.maChucVuNguoiChungKien}
                                                            touched={
                                                                touched?.maChucVuNguoiChungKien
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div className="d-flex">
                                                        <LabelRequired
                                                            isRequired
                                                            label="Đơn vị"
                                                            className="spaces min-w-60 fw-500"
                                                        />
                                                        <Autocomplete
                                                            onChange={(
                                                                selectedOption
                                                            ) =>
                                                                handleChangeSelectId(
                                                                    "donViNguoiChungKien",
                                                                    selectedOption
                                                                )
                                                            }
                                                            value={values.donViNguoiChungKien}
                                                            className="spaces h-25 width-100"
                                                            name="donViNguoiChungKien"
                                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                                            errors={errors?.donViNguoiChungKien}
                                                            touched={
                                                                touched?.donViNguoiChungKien
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="spaces fw-700 mb-6">
                                                Với sự tham gia của :
                                            </div>
                                        </Col>
                                        <div className="group-row">
                                            {values?.nguoiThamDus?.map((item, index) => {
                                                item.bienBanXacMinhId = thongTinBienBan.id
                                                return (
                                                    (
                                                        <Row className="spaces mb-10 flex-fill">
                                                            <Col xs={4}>
                                                                <div className="d-flex">
                                                                    <LabelRequired
                                                                        label="Ông bà"
                                                                        className="spaces min-w-60 fw-500"
                                                                    />
                                                                    <TextField
                                                                        className="spaces width-100"
                                                                        name={`nguoiThamDus[${index}].name`}
                                                                        type="text"
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className="d-flex">
                                                                    <LabelRequired
                                                                        label="Chức vụ"
                                                                        className="spaces min-w-60 fw-500"
                                                                    />
                                                                    <Autocomplete
                                                                        onChange={(
                                                                            selectedOption
                                                                        ) =>
                                                                            handleChangeSelectId(
                                                                                `nguoiThamDus[${index}].maChucVu`,
                                                                                selectedOption
                                                                            )
                                                                        }
                                                                        value={values.nguoiThamDus[index].maChucVu}
                                                                        className="spaces h-25 width-100"
                                                                        name={`nguoiThamDus[${index}].maChucVu`}
                                                                        options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_VU)}
                                                                        errors={(errors?.nguoiThamDus?.[index] as any)?.maChucVu}
                                                                        touched={(touched?.nguoiThamDus?.[index] as any)?.maChucVu}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className="d-flex align-items-center">
                                                                    <LabelRequired
                                                                        label="Đơn vị"
                                                                        className="spaces min-w-60 fw-500"
                                                                    />
                                                                    <Autocomplete
                                                                        onChange={(
                                                                            selectedOption
                                                                        ) =>
                                                                            handleChangeSelectId(
                                                                                `nguoiThamDus[${index}].donViId`,
                                                                                selectedOption
                                                                            )
                                                                        }
                                                                        value={values.nguoiThamDus[index].donViId}
                                                                        className="spaces h-25 width-100"
                                                                        name={`nguoiThamDus[${index}].donViId`}
                                                                        options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                                                        errors={(errors?.nguoiThamDus?.[index] as any)?.donViId}
                                                                        touched={(touched?.nguoiThamDus?.[index] as any)?.donViId}
                                                                    />
                                                                    <OverlayTrigger overlay={<Tooltip className="tooltip">Xóa</Tooltip>}>
                                                                        <i
                                                                            onClick={() => {
                                                                                handleDeleteNguoiThamGia(index)
                                                                            }}
                                                                            className="bi bi-trash3-fill text-danger spaces ml-6 cursor-pointer"
                                                                        ></i>
                                                                    </OverlayTrigger>
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    )
                                                )
                                            })}
                                        </div>
                                        <Col xs={12}>
                                            <div className="text-primary spaces mt-2 pl-78 cursor-pointer max-content-width" onClick={() => setFieldValue("nguoiThamDus", [...values.nguoiThamDus, initNguoiThamDu])}>
                                                Thêm thành viên
                                                <i className="bi bi-plus"></i>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="spaces fw-700 mb-6">
                                                Tiến hành xác minh về việc :
                                            </div>
                                            <div className="spaces pl-80">
                                                <TextField
                                                    className="spaces min-w-242"
                                                    name="veViec"
                                                    as="textarea"
                                                    rows={3}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="spaces fw-700 mb-6">
                                                Kết quả xác minh :
                                            </div>
                                            <div className="spaces pl-75">
                                                <TextField
                                                    className="spaces min-w-242"
                                                    name="ketQua"
                                                    as="textarea"
                                                    rows={3}
                                                    handleChange={handleChange}
                                                />
                                            </div>
                                        </Col>
                                
                                        <Col xs={12}>
                                            <div className="text-primary spaces my-4">
                                                Ý kiến những người tham gia xác
                                                minh
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                        <div className="spaces pl-75">
                                            <TextField
                                                className="spaces width-100 my-8"
                                                name="yKien"
                                                type="text"
                                                as="textarea"
                                                rows={2}
                                                
                                            />
                                         </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="text-primary mb-2 mt-1">
                                                Biên bản kết thúc
                                            </div>
                                        </Col>
                                        <Col xs={3}>
                                            <div className="d-flex spaces">
                                                <LabelRequired
                                                    isRequired
                                                    label="Hồi"
                                                    className="spaces min-w-75 fw-500"
                                                />
                                                <TextField
                                                    className="spaces"
                                                    name="hoiKetThuc"
                                                    type="time"
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={3}>
                                            <div className="d-flex spaces">
                                                <LabelRequired
                                                    isRequired
                                                    label="Ngày kết thúc"
                                                    className="spaces min-w-100 fw-500"
                                                />
                                                <TextField
                                                    className="spaces"
                                                    name="ngayKetThuc"
                                                    type="date"
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={3}>
                                            <div className="d-flex spaces">
                                                <LabelRequired
                                                    label="Biên bản gồm"
                                                    className="spaces min-w-100 fw-500"
                                                />
                                                <TextField
                                                    className="spaces width-100"
                                                    name="soTrang"
                                                    type="text"
                                                    placeHolder="Số trang"
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={3}>
                                            <div className="d-flex spaces">
                                                <LabelRequired
                                                    label="Lập thành"
                                                    className="spaces min-w-100 fw-500"
                                                />
                                                <TextField
                                                    className="spaces width-100"
                                                    name="soBan"
                                                    type="text"
                                                    placeHolder="Số bản"
                                                />
                                            </div>
                                        </Col> 
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="spaces fw-700 mb-6">
                                                Kí biên bản xác minh:
                                            </div>
                                        </Col>
                                        <Row>
                                            <Col xs={4}>
                                                <div className="d-flex">
                                                    <LabelRequired
                                                        isRequired
                                                        label="Thành viên đoàn"
                                                        className="spaces min-w-125 fw-500"
                                                    />
                                                    <Autocomplete
                                                        onChange={(
                                                            selectedOption
                                                        ) =>
                                                            handleChangeSelect(
                                                                "isThanhVienDoanKy",
                                                                selectedOption
                                                            )
                                                        }
                                                        className="spaces h-25 width-100"
                                                        name="isThanhVienDoanKy"
                                                        options={SINGIN_OPTION}
                                                        value={values.isThanhVienDoanKy}
                                                        errors={errors?.isThanhVienDoanKy}
                                                        touched={
                                                            touched?.isThanhVienDoanKy
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <div className="d-flex">
                                                    <LabelRequired
                                                        isRequired
                                                        label="Người tham dự"
                                                        className="spaces min-w-125 fw-500"
                                                    />
                                                    <Autocomplete
                                                        onChange={(
                                                            selectedOption
                                                        ) =>
                                                            handleChangeSelect(
                                                                "isNguoiThamDuKy",
                                                                selectedOption
                                                            )
                                                        }
                                                        className="spaces h-25 width-100"
                                                        name="isNguoiThamDuKy"
                                                        options={SINGIN_OPTION}
                                                        value={values.isNguoiThamDuKy}
                                                        errors={errors?.isNguoiThamDuKy}
                                                        touched={
                                                            touched?.isNguoiThamDuKy
                                                        }


                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="spaces py-10">
                                            <Col xs={4}>
                                                <div className="d-flex">
                                                    <LabelRequired
                                                        isRequired
                                                        label="Người chứng kiến"
                                                        className="spaces min-w-125 fw-500"
                                                    />
                                                    <Autocomplete
                                                        menuPlacement="top"
                                                        onChange={(
                                                            selectedOption
                                                        ) =>
                                                            handleChangeSelect(
                                                                "isNguoiChungKienKy",
                                                                selectedOption
                                                            )
                                                        }
                                                        className="spaces h-25 width-100"
                                                        name="isNguoiChungKienKy"
                                                        options={SINGIN_OPTION}
                                                        value={values.isNguoiChungKienKy}
                                                        errors={errors?.isNguoiChungKienKy}
                                                        touched={
                                                            touched?.isNguoiChungKienKy
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <div className="d-flex">
                                                    <LabelRequired
                                                        isRequired
                                                        label="Người lập biên bản"
                                                        className="spaces min-w-125 fw-500"
                                                    />
                                                    <Autocomplete
                                                        menuPlacement="top"
                                                        onChange={(
                                                            selectedOption
                                                        ) =>
                                                            handleChangeSelect(
                                                                "isNguoiLapKy",
                                                                selectedOption
                                                            )
                                                        }
                                                        className="spaces h-25 width-100"
                                                        name="isNguoiLapKy"
                                                        options={SINGIN_OPTION}
                                                        value={values.isNguoiLapKy}
                                                        errors={errors?.isNguoiLapKy}
                                                        touched={
                                                            touched?.isNguoiLapKy
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                                <div className="d-flex">
                                                    <LabelRequired
                                                        isRequired
                                                        label="Chủ trì đoàn"
                                                        className="spaces min-w-125 fw-500"
                                                    />
                                                    <Autocomplete
                                                        menuPlacement="top"
                                                        onChange={(
                                                            selectedOption
                                                        ) =>
                                                            handleChangeSelect(
                                                                "isNguoiChuTriKy",
                                                                selectedOption
                                                            )
                                                        }
                                                        className="spaces h-25 width-100"
                                                        name="isNguoiChuTriKy"
                                                        options={SINGIN_OPTION}
                                                        value={values.isNguoiChuTriKy}
                                                        errors={errors?.isNguoiChuTriKy}
                                                        touched={
                                                            touched?.isNguoiChuTriKy
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Row>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center">
                                <Button
                                    className="button-primary"
                                    onClick={() => {
                                        setFieldValue("trangThai", STATUS_BIEN_BAN.LUU_NHAP)
                                    }}
                                    type="submit"
                                >
                                    Lưu nháp
                                </Button>
                                <Button
                                    className="button-primary"
                                    type="submit"
                                    onClick={() => {
                                        setFieldValue("trangThai", STATUS_BIEN_BAN.DA_XAC_MINH)
                                    }}
                                >
                                    Nộp
                                </Button>
                                <Button
                                    className="button-primary"
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

export default DialogThemMoiBienBan;
