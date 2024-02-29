import { Col, Row } from "react-bootstrap";
import TextValidator from "../../../component/input-field/TextValidator";
import { KET_QUA_XN_PHAN_LAP_OPTIONS, KET_QUA_XN_OPTIONS, RADIO_OPTIONS, CHAN_DOAN_SXHD_OPTIONS, PHAN_DO_NANG_SXHD_OPTIONS, KET_QUA_CHAN_DOAN_OPTIONS, KET_QUA_LAY_HUYET_THANH_OPTIONS } from "../../constants/QuanLyTruongHopBenhConstants";
import { useFormikContext } from "formik";
import Autocomplete from "../../../component/input-field/Autocomplete";

type TProps = {
    isDoiTuongTuVong?: boolean;
    mainContentList: string[];
}

const XetNghiemVaCDCuoiCung = ({ isDoiTuongTuVong = false, mainContentList }: TProps) => {
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

    const handleChange = (e: any) => {
        setFieldValue(e.target.name, e.target.value);
    }

    const handleChangeSelect = (name: string, value: any) => {
        setFieldValue(name, value);
    }

    return (
        <div className="tab-content-container">
            <div className="tab-main-content">{mainContentList[0]}</div>
            <div className="tab-sub-content">Huyết học</div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Hematocri"}
                            name="Hematocri"
                            type="text"
                            value={values?.hematocri}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Tiểu cầu"}
                            name="TieuCau"
                            type="text"
                            value={values?.tieuCau}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Hồng cầu"}
                            name="hongCau"
                            type="text"
                            value={values?.hongCau}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Bạch cầu"}
                            name="bachCau"
                            type="text"
                            value={values?.bachCau}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <p className="tab-sub-content">NS1</p>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <p className="tab-sub-content">PCR</p>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <p className="tab-sub-content">Phân lập vi rút Dengue</p>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <p className="tab-sub-content">Huyết thanh học</p>
                    </Col>
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày lấy mẫu"}
                            isRequired
                            name="ngayLayMauNS1"
                            type="date"
                            value={values?.ngayLayMauNS1}
                            onChange={handleChange}
                            errors={errors?.ngayLayMauNS1}
                            touched={touched?.ngayLayMauNS1}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày lấy mẫu"}
                            isRequired
                            name="ngayLayMauPCR"
                            type="date"
                            value={values?.ngayLayMauPCR}
                            onChange={handleChange}
                            errors={errors?.ngayLayMauPCR}
                            touched={touched?.ngayLayMauPCR}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày lấy mẫu"}
                            isRequired
                            name="ngayLayMauPhanLap"
                            type="date"
                            value={values?.ngayLayMauPhanLap}
                            onChange={handleChange}
                            errors={errors?.ngayLayMauPhanLap}
                            touched={touched?.ngayLayMauPhanLap}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày lấy huyết thanh 1"}
                            isRequired
                            name="ngayLayHuyetThanh1"
                            type="date"
                            value={values?.ngayLayHuyetThanh1}
                            onChange={handleChange}
                            errors={errors?.ngayLayHuyetThanh1}
                            touched={touched?.ngayLayHuyetThanh1}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày lấy huyết thanh 2"}
                            isRequired
                            name="ngayLayHuyetThanh2"
                            type="date"
                            value={values?.ngayLayHuyetThanh2}
                            onChange={handleChange}
                            errors={errors?.ngayLayHuyetThanh2}
                            touched={touched?.ngayLayHuyetThanh2}
                        />
                    </Col>
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Kết quả"}
                            options={KET_QUA_XN_OPTIONS}
                            isRequired
                            name="ketQuaLayMauNS1"
                            value={values?.ketQuaLayMauNS1}
                            onChange={(value) => handleChangeSelect("ketQuaLayMauNS1", value)}
                            errors={errors?.ketQuaLayMauNS1}
                            touched={touched?.ketQuaLayMauNS1}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Kết quả"}
                            options={KET_QUA_XN_OPTIONS}
                            isRequired
                            name="ketQuaLayMauPCR"
                            value={values?.ketQuaLayMauPCR}
                            onChange={(value) => handleChangeSelect("ketQuaLayMauPCR", value)}
                            errors={errors?.ketQuaLayMauPCR}
                            touched={touched?.ketQuaLayMauPCR}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Kết quả"}
                            options={KET_QUA_XN_PHAN_LAP_OPTIONS}
                            isRequired
                            name="ketQuaLayMauPhanLap"
                            value={values?.ketQuaLayMauPhanLap}
                            onChange={(value) => handleChangeSelect("ketQuaLayMauPhanLap", value)}
                            errors={errors?.ketQuaLayMauPhanLap}
                            touched={touched?.ketQuaLayMauPhanLap}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Kết quả"}
                            options={KET_QUA_LAY_HUYET_THANH_OPTIONS}
                            isRequired
                            name="ketQuaHuyetThanh1"
                            value={values?.ketQuaHuyetThanh1}
                            onChange={(value) => handleChangeSelect("ketQuaHuyetThanh1", value)}
                            errors={errors?.ketQuaHuyetThanh1}
                            touched={touched?.ketQuaHuyetThanh1}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Kết quả"}
                            options={KET_QUA_LAY_HUYET_THANH_OPTIONS}
                            isRequired
                            name="ketQuaHuyetThanh2"
                            value={values?.ketQuaHuyetThanh2}
                            onChange={(value) => handleChangeSelect("ketQuaHuyetThanh2", value)}
                            errors={errors?.ketQuaHuyetThanh2}
                            touched={touched?.ketQuaHuyetThanh2}
                        />
                    </Col>
                </Row>
            </div>
            {!isDoiTuongTuVong && (
                <>
                    <div className="tab-main-content">8. Chẩn đoán cuối cùng</div>
                    <div className="block-content">
                        <Row>
                            <Col xs={6} sm={6} md={6} lg={2}>
                                <Autocomplete
                                    lable={"Chẩn đoán SXHD"}
                                    options={CHAN_DOAN_SXHD_OPTIONS}
                                    isRequired
                                    name="chanDoanSXHD"
                                    value={values?.chanDoanSXHD}
                                    onChange={(value) => handleChangeSelect("chanDoanSXHD", value)}
                                    errors={errors?.chanDoanSXHD}
                                    touched={touched?.chanDoanSXHD}
                                />
                            </Col>
                            {values?.chanDoanSXHD?.code === "1" && (
                                <>
                                    <Col xs={6} sm={6} md={6} lg={2}>
                                        <Autocomplete
                                            lable={"Phân độ nặng của SXHD"}
                                            options={PHAN_DO_NANG_SXHD_OPTIONS}
                                            isRequired
                                            name="phanDoNangCuaSXHD"
                                            value={values?.phanDoNangCuaSXHD}
                                            onChange={(value) => handleChangeSelect("phanDoNangCuaSXHD", value)}
                                            errors={errors?.phanDoNangCuaSXHD}
                                            touched={touched?.phanDoNangCuaSXHD}
                                        />
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={2}>
                                        <Autocomplete
                                            lable={"Điều trị"}
                                            options={RADIO_OPTIONS}
                                            isRequired
                                            name="dieuTri"
                                            value={values?.dieuTri}
                                            onChange={(value) => handleChangeSelect("dieuTri", value)}
                                            errors={errors?.dieuTri}
                                            touched={touched?.dieuTri}
                                        />
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={2}>
                                        <Autocomplete
                                            lable={"Kết quả"}
                                            options={KET_QUA_CHAN_DOAN_OPTIONS}
                                            isRequired
                                            name="ketQuaCuoiCung"
                                            value={values?.ketQuaCuoiCung}
                                            onChange={(value) => handleChangeSelect("ketQuaCuoiCung", value)}
                                            errors={errors?.ketQuaCuoiCung}
                                            touched={touched?.ketQuaCuoiCung}
                                        />
                                    </Col>
                                </>
                            )}
                            <Col xs={6} sm={6} md={6} lg={2}>
                                <TextValidator
                                    className="flex-row"
                                    lable={"Ngày điều tra kết quả"}
                                    isRequired
                                    type="date"
                                    name="ngayDieuTraKetQua"
                                    value={values?.ngayDieuTraKetQua}
                                    onChange={handleChange}
                                    errors={errors?.ngayDieuTraKetQua}
                                    touched={touched?.ngayDieuTraKetQua}
                                />
                            </Col>
                        </Row>
                    </div>
                </>
            )}
            {isDoiTuongTuVong && (
                <div className="block-content">
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={4}>
                            <TextValidator
                                className="flex-row"
                                lable={"Kết quả sinh thiết giải phẫu bệnh sau tử vong"}
                                name="ketQuaSinhThiet"
                                type="text"
                                value={values?.ketQuaSinhThiet}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    )
}

export default XetNghiemVaCDCuoiCung