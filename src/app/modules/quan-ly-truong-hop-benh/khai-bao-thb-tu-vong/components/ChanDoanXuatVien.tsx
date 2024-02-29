import { Col, Row } from "react-bootstrap"
import Autocomplete from "../../../component/input-field/Autocomplete"
import { CHAN_DOAN_SXHD_OPTIONS, NOI_TU_VONG_OPTIONS, PHAN_DO_NANG_SXHD_OPTIONS, RADIO_OPTIONS } from "../../constants/QuanLyTruongHopBenhConstants"
import { useFormikContext } from "formik";
import TextValidator from "../../../component/input-field/TextValidator";

const ChanDoanXuatVien = () => {
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

    const handleChange = (e: any) => {
        setFieldValue(e.target.name, e.target.value);
    }

    const handleChangeSelect = (name: string, value: any) => {
        setFieldValue(name, value);
    }

    return (
        <div className="tab-content-container">
            <div className="tab-main-content">6. Chẩn đoán xuất viện</div>
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
                                    lable={"Phân độ nặng SXHD"}
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
                                <TextValidator
                                    className="flex-row"
                                    lable={"Biến chứng kèm theo"}
                                    type="text"
                                    name="bienChungKemTheo"
                                    value={values?.bienChungKemTheo}
                                    onChange={handleChange}
                                    errors={errors?.bienChungKemTheo}
                                    touched={touched?.bienChungKemTheo}
                                />
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={2}>
                                <TextValidator
                                    className="flex-row"
                                    lable={"Bệnh khác kèm theo"}
                                    type="text"
                                    name="benhKhacKemTheo"
                                    value={values?.benhKhacKemTheo}
                                    onChange={handleChange}
                                    errors={errors?.benhKhacKemTheo}
                                    touched={touched?.benhKhacKemTheo}
                                />
                            </Col>
                        </>
                    )}
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
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày tử vong"}
                            type="date"
                            name="ngayTuVong"
                            value={values?.ngayTuVong}
                            onChange={handleChange}
                            errors={errors?.ngayTuVong}
                            touched={touched?.ngayTuVong}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Nơi tử vong"}
                            options={NOI_TU_VONG_OPTIONS}
                            isRequired
                            name="noiTuVong"
                            value={values?.noiTuVong}
                            onChange={(value) => handleChangeSelect("noiTuVong", value)}
                            errors={errors?.noiTuVong}
                            touched={touched?.noiTuVong}
                        />
                    </Col>
                    {values?.noiTuVong?.code === "5" && (
                        <>
                            <Col xs={6} sm={6} md={6} lg={2}>
                                <TextValidator
                                    className="flex-row"
                                    lable={"Nơi Khác"}
                                    type="text"
                                    name="noiTuVongKhac"
                                    value={values?.noiTuVongKhac}
                                    onChange={handleChange}
                                    errors={errors?.noiTuVongKhac}
                                    touched={touched?.noiTuVongKhac}
                                />
                            </Col>
                        </>
                    )}
                     <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Tỉnh/ Thành phố"}
                            isRequired
                            options={[]}
                            value={values?.province || null}
                            name="tinhTuVong"
                            touched={touched?.province}
                            errors={errors?.province}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Quận/ Huyện"}
                            options={[]}
                            isRequired
                            value={values?.district || null}
                            name="huyenTuVong"
                            errors={errors?.district}
                            touched={touched?.district}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={2}>
                        <Autocomplete
                            lable={"Xã/ Phường"}
                            options={[]}
                            isRequired
                            value={values?.subDistrict || null}
                            name="xaPhuongTuVong"
                            errors={errors?.subDistrict}
                            touched={touched?.subDistrict}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ChanDoanXuatVien