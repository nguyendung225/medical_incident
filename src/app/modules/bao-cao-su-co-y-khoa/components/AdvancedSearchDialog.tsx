import { Button, Col, Modal, Row } from "react-bootstrap";
import TextValidator from "../../component/input-field/TextValidator";
import Autocomplete from "../../component/input-field/Autocomplete";
import LabelRequired from "../../component/LabelRequired";
import { SearchObject } from "../models/BaoCaoSCYKModels";

type TProps = {
    handleClose: () => void,
    handleSearch: () => void,
    searchObj: SearchObject,
    handleChangeSearchObj: (searchObj: SearchObject) => void,
}

const TRANG_THAI_OPTIONS = [
    { name: "Tất cả", code: "0" },
    { name: "Mới tạo", code: "1" },
    { name: "Chờ tiếp nhận", code: "2" },
    { name: "Đã tiếp nhận", code: "3" },
    { name: "Đã xác minh", code: "4" },
    { name: "Đã phân tích", code: "5" },
    { name: "Tạo biên bản", code: "6" },
    { name: "Đã báo cáo", code: "7" },
]

const HINH_THUC_OPTIONS = [
    { name: "Tất cả", code: "0" },
    { name: "Tự nguyện", code: "1" },
    { name: "Bắt buộc", code: "2" },
]

const PHAN_LOAI_OPTIONS = [
    { name: "Tất cả", code: "0" },
    { name: "Nặng", code: "1" },
    { name: "Trung bình", code: "2" },
    { name: "Nhẹ", code: "3" },
]

const KHOA_PHONG_DIEU_TRI_OPTIONS = [
    { name: "Tất cả", code: null },
]

const AdvancedSearchDialog = ({ 
    handleClose, 
    handleSearch, 
    searchObj,
    handleChangeSearchObj
}: TProps) => {
    const handleSumbit = () => {
        handleClose();
        handleSearch();
    }

    const handleChange = (e: any) => {
        handleChangeSearchObj({
            ...searchObj,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeSelect = (name: string, value: any) => {
        handleChangeSearchObj({
            ...searchObj,
            [name]: value
        })
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
            <Modal.Body className="spaces p-10">
                <Row>
                    <Col xs={6} sm={6} md={12} lg={12}>
                        <div className="d-flex align-items-center">
                            <TextValidator
                                className="d-flex"
                                classLable="spaces min-w-120"
                                lable={"Thời gian báo cáo"}
                                name="ngayBaoCaoStart"
                                type="date"
                                value={searchObj?.ngayBaoCaoStart}
                                onChange={handleChange}
                            />
                            <span className="spaces mx-5">-</span>
                            <TextValidator
                                className="d-flex spaces gap-10"
                                name="ngayBaoCaoEnd"
                                type="date"
                                value={searchObj?.ngayBaoCaoEnd}
                                onChange={handleChange}
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
                                options={TRANG_THAI_OPTIONS}
                                value={searchObj?.trangThaiXuLy}
                                onChange={(value) => {
                                    handleChangeSelect("trangThaiXuLy", value)
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
                                value={searchObj?.hinhThuc}
                                onChange={(value) => {
                                    handleChangeSelect("hinhThuc", value)
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
                                value={searchObj?.phanLoai}
                                onChange={(value) => {
                                    handleChangeSelect("phanLoai", value)
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
                                options={KHOA_PHONG_DIEU_TRI_OPTIONS}
                                value={searchObj?.khoaPhongDieuTri}
                                onChange={(value) => {
                                    handleChangeSelect("khoaPhongDieuTri", value)
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center spaces py-10">
                <Button className="button-primary" onClick={handleSumbit}>
                    Tìm kiếm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AdvancedSearchDialog