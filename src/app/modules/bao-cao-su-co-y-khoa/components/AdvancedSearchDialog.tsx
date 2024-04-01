import { Button, Col, Modal, Row } from "react-bootstrap";
import TextValidator from "../../component/input-field/TextValidator";
import Autocomplete from "../../component/input-field/Autocomplete";
import LabelRequired from "../../component/LabelRequired";
import { SearchObject } from "../models/BaoCaoSCYKModels";
import { ISelectOption } from "../../models/models";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { Form, Formik } from "formik";
import { SEARCH_OBJECT_INIT } from "../const/constants";
import * as Yup from "yup";

type TProps = {
    handleClose: () => void,
    handleSearch: () => void,
    searchObj: SearchObject,
    handleChangeSearchObj: (searchObj: SearchObject) => void,
    statusOptions: ISelectOption[],
    timeReportLable: string,
}

const HINH_THUC_OPTIONS = [
    { name: "Tất cả", code: "0" },
    { name: "Tự nguyện", code: "1" },
    { name: "Bắt buộc", code: "2" },
]

const PHAN_LOAI_OPTIONS = [
    { name: "Tất cả", code: "0" },
    { name: "Nặng", code: "1" },
    { name: "Trung bình", code: "3" },
    { name: "Nhẹ", code: "2" },
]

const AdvancedSearchDialog = ({
    handleClose,
    handleSearch,
    searchObj,
    handleChangeSearchObj,
    statusOptions,
    timeReportLable
}: TProps) => {
    const validationSchema = Yup.object().shape({
        tuNgay: Yup.date()
            .max(Yup.ref("denNgay"), "Từ ngày không được lớn hơn đến ngày")
            .max(new Date(), "Từ ngày không được lớn hơn ngày hiện tại"),
        denNgay: Yup.date()
            .min(Yup.ref("tuNgay"), "Đến ngày không được nhỏ hơn từ ngày")
            .max(new Date(), "Đến ngày không được lớn hơn ngày hiện tại"),
    });

    const handleSubmit = () => {
        handleClose();
        handleSearch();
    }

    return (
        <Modal
            show={true}
            centered
            onHide={handleClose}
            size="lg"
            contentClassName="spaces min-w-800 margin-x-auto radius-8"
        >
            <Modal.Header closeButton className="py-5 header-modal">
                <Modal.Title className="title-dialog-color">
                    Tìm kiếm năng cao
                </Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={searchObj}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    setValues
                }) => {

                    const handleChange = (name: string, value: any) => {
                        setFieldValue(name, value);
                        handleChangeSearchObj({
                            ...searchObj,
                            [name]: value
                        })
                    }

                    const handleRemoveSearchParam = () => {
                        setValues(SEARCH_OBJECT_INIT);
                        handleChangeSearchObj(SEARCH_OBJECT_INIT);
                    }

                    return (
                        <Form>
                            <Modal.Body className="spaces p-10">
                                <Row>
                                    <Col xs={6} sm={6} md={12} lg={12}>
                                        <div className="d-flex align-items-center">
                                            <TextValidator
                                                className="d-flex"
                                                classLable="spaces min-w-120"
                                                lable={timeReportLable}
                                                name="tuNgay"
                                                type="date"
                                                value={values?.tuNgay || ""}
                                                onChange={(e: any) => handleChange("tuNgay", e.target.value)}
                                                errors={errors?.tuNgay}
                                                touched={touched?.tuNgay}
                                            />
                                            <span className="spaces mx-5">-</span>
                                            <TextValidator
                                                className="d-flex spaces gap-10"
                                                name="denNgay"
                                                type="date"
                                                value={values?.denNgay || ""}
                                                onChange={(e: any) => handleChange("denNgay", e.target.value)}
                                                errors={errors?.denNgay}
                                                touched={touched?.denNgay}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="spaces my-16">
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <div className="d-flex">
                                            <LabelRequired
                                                label="Trạng thái"
                                                className="spaces min-w-120 fw-500"
                                            />
                                            <Autocomplete
                                                className="spaces h-25 min-w-256"
                                                name="trangThaiXuLy"
                                                options={statusOptions}
                                                value={values?.trangThaiXuLy}
                                                onChange={(value) => {
                                                    handleChange("trangThaiXuLy", value)
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <div className="d-flex">
                                            <LabelRequired
                                                label="Hình thức báo cáo"
                                                className="spaces min-w-120 fw-500"
                                            />
                                            <Autocomplete
                                                className="spaces h-25 min-w-256"
                                                name="hinhThuc"
                                                options={HINH_THUC_OPTIONS}
                                                value={values?.hinhThuc}
                                                onChange={(value) => {
                                                    handleChange("hinhThuc", value)
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <div className="d-flex">
                                            <LabelRequired
                                                label="Phân loại sự cố"
                                                className="spaces min-w-120 fw-500"
                                            />
                                            <Autocomplete
                                                className="spaces h-25 min-w-256"
                                                name="phanLoai"
                                                options={PHAN_LOAI_OPTIONS}
                                                value={values?.phanLoai}
                                                onChange={(value) => {
                                                    handleChange("phanLoai", value)
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <div className="d-flex">
                                            <LabelRequired
                                                label="Khoa / Phòng"
                                                className="spaces min-w-120 fw-500"
                                            />
                                            <Autocomplete
                                                className="spaces h-25 min-w-256"
                                                name="khoaPhongDieuTri"
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                                value={values?.khoaPhongDieuTri}
                                                onChange={(value) => {
                                                    handleChange("khoaPhongDieuTri", value)
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center spaces py-10">
                                <Button className="button-primary" onClick={handleRemoveSearchParam}>
                                    Mặc định
                                </Button>
                                <Button className="button-primary" type="submit">
                                    Tìm kiếm
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default AdvancedSearchDialog