import { Col, Row } from "react-bootstrap";
import TextValidator from "../../../component/input-field/TextValidator";
import RadioGroup from "../../../component/input-field/RadioGroup";
import { useFormikContext } from "formik";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { NOI_TIEP_XUC_OPTIONS, RADIO_GENDER, RADIO_OPTIONS } from "../../constants/QuanLyTruongHopBenhConstants";
import { useEffect } from "react";
import { handleGetAge } from "../../utils/FunctionUtils";

type TProps = {
    isDoiTuongTuVong?: boolean;
    mainContentList: string[],
}

const ThongTinChungTab = ({ isDoiTuongTuVong, mainContentList }: TProps) => {
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

    const handleChange = (e: any) => {
        setFieldValue(e.target.name, e.target.value);
    }

    const handleChangeSelect = (name: string, value: any) => {
        setFieldValue(name, value);
    }

    useEffect(() => {
        handleGetAge(values?.ngaySinh);
    }, [values?.ngaySinh])

    return (
        <div className="tab-content-container">
            <div className="tab-main-content">{mainContentList[0]}</div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <TextValidator
                            className="flex-row"
                            lable={"Mã số của tỉnh"}
                            name="provinceId"
                            type="text"
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Năm mắc bệnh"}
                            isRequired
                            name="namMacBenh"
                            type="text"
                            value={values?.namMacBenh || ""}
                            onChange={handleChange}
                            errors={errors?.namMacBenh}
                            touched={touched?.namMacBenh}
                        />
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Số bệnh án"}
                            name="soBenhAn"
                            type="string"
                        />
                    </Col>
                </Row>
            </div>
            <div className="tab-main-content">{mainContentList[1]}</div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <TextValidator
                            className="flex-row"
                            lable={"Họ và tên bệnh nhân"}
                            isRequired
                            name="hoTen"
                            type="text"
                            value={values?.hoTen}
                            onChange={handleChange}
                            errors={errors?.hoTen}
                            touched={touched?.hoTen}
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày tháng năm sinh"}
                            isRequired
                            name="ngaySinh"
                            type="date"
                            value={values?.ngaySinh}
                            onChange={handleChange}
                            errors={errors?.ngaySinh}
                            touched={touched?.ngaySinh}
                        />
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={1}>
                        <TextValidator
                            className="flex-row"
                            lable={"Tuổi"}
                            disabled
                            name="tuoi"
                            type="number"
                            value={handleGetAge(values?.ngaySinh)}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <RadioGroup
                            lable={"Giới tính"}
                            name="gioiTinh"
                            value={values?.gioiTinh ?? "1"}
                            isRequired
                            handleChange={handleChange}
                            radioItemList={RADIO_GENDER}
                        />
                    </Col>
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <TextValidator
                            className="flex-row"
                            lable={"Nghề nghiệp"}
                            name="ngheNghiep"
                            type="text"
                            value={values?.ngheNghiep}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <TextValidator
                            className="flex-row"
                            lable={"Nơi làm việc và học tập"}
                            name="noiLamViecVaHocTap"
                            type="text"
                            value={values?.noiLamViecVaHocTap}
                        />
                    </Col>
                    {handleGetAge(values?.ngaySinh) <= 15 && (
                        <Col xs={6} sm={6} md={6} lg={3}>
                            <TextValidator
                                className="flex-row"
                                lable={"Họ tên người thân"}
                                isRequired
                                name="hoTenNguoiThan"
                                type="text"
                                value={values?.hoTenNguoiThan}
                                onChange={handleChange}
                                errors={errors?.hoTenNguoiThan}
                                touched={touched?.hoTenNguoiThan}
                            />
                        </Col>
                    )}
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <Autocomplete
                            className="spaces z-index-8 width-100"
                            lable={"Tỉnh/ Thành phố"}
                            isRequired
                            options={[]}
                            value={values?.province || null}
                            name="province"
                            touched={touched?.province}
                            errors={errors?.province}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <Autocomplete
                            className="spaces z-index-8 width-100"
                            lable={"Quận/ Huyện"}
                            options={[]}
                            isRequired
                            value={values?.district || null}
                            name="district"
                            errors={errors?.district}
                            touched={touched?.district}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <Autocomplete
                            className="spaces z-index-8 width-100"
                            lable={"Xã/ Phường"}
                            options={[]}
                            isRequired
                            value={values?.subDistrict || null}
                            name="subDistrict"
                            errors={errors?.subDistrict}
                            touched={touched?.subDistrict}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <TextValidator
                            className="flex-row"
                            lable={"Địa chỉ nơi ở"}
                            name="diaChiNoiO"
                            type="text"
                            placeholder="Số nhà, phố, thôn"
                        />
                    </Col>
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xxl={6} >
                        <div className="d-flex flex-column justify-content-around h-100">
                            <RadioGroup
                                className="d-flex"
                                classLable="spaces w-310"
                                lable={"Bệnh nhân đã khám, điều trị tại y tế xã / phường: "}
                                name="benhNhanDaKhamTaiXaPhuong"
                                value={values?.benhNhanDaKhamTaiXaPhuong}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex"
                                classLable="spaces w-310"
                                lable={"Bệnh nhân đã khám, điều trị tại bệnh viện: "}
                                name="benhNhanDaKhamTaiBenhVien"
                                value={values?.benhNhanDaKhamTaiBenhVien}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                        </div>
                    </Col>
                    {values?.benhNhanDaKhamTaiBenhVien === "1" && (
                        <>
                            <Col xs={4} sm={4} md={4} lg={3} xxl={2}>
                                <TextValidator
                                    className="flex-row"
                                    lable={"Bệnh viện tuyến"}
                                    isRequired
                                    name="benhVienTuyen"
                                    type="text"
                                    value={values?.benhVienTuyen}
                                    onChange={handleChange}
                                    errors={errors?.benhVienTuyen}
                                    touched={touched?.benhVienTuyen}
                                />
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={3} xxl={2}>
                                <TextValidator
                                    className="flex-row"
                                    lable={"Ngày nhập viện"}
                                    isRequired
                                    name="ngayNhapVien"
                                    type="date"
                                    value={values?.ngayNhapVien}
                                    onChange={handleChange}
                                    errors={errors?.ngayNhapVien}
                                    touched={touched?.ngayNhapVien}
                                />
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={3} xxl={2}>
                                <TextValidator
                                    className="flex-row"
                                    lable={"Tên bệnh viện"}
                                    isRequired
                                    name="tenBenhVien"
                                    type="text"
                                    value={values?.tenBenhVien}
                                    onChange={handleChange}
                                    errors={errors?.tenBenhVien}
                                    touched={touched?.tenBenhVien}
                                />
                            </Col>
                        </>
                    )}
                </Row>
            </div>
            <div className="tab-main-content">{mainContentList[2]}</div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={7} xxl={6}>
                        <div className="d-flex flex-column justify-content-around h-100">
                            <RadioGroup
                                className="d-flex"
                                classLable="spaces w-310"
                                lable={"Đã mắc Sốt xuất huyết bao giờ chưa? "}
                                name="daMacSXH"
                                value={values?.daMacSXH}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex"
                                classLable="spaces w-310"
                                lable={"Ở khu vực có bệnh nhân SXHD trong vòng 1 tuần: "}
                                name="OKhuVucDich"
                                value={values?.OKhuVucDich}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                        </div>
                    </Col>
                    {values?.daMacSXH === "1" && (
                        <Col xs={4} sm={4} md={4} lg={2}>
                            <TextValidator
                                className="flex-row"
                                lable={"Ngày mắc bệnh SXHD"}
                                isRequired
                                name="ngayMacBenhSXHD"
                                type="date"
                                value={values?.ngayMacBenhSXHD}
                                onChange={handleChange}
                                errors={errors?.ngayMacBenhSXHD}
                                touched={touched?.ngayMacBenhSXHD}
                            />
                        </Col>
                    )}
                    {isDoiTuongTuVong && (
                        <>
                            <Col xs={12} sm={12} md={12} lg={2}>
                                <Autocomplete
                                    className="spaces z-index-8 width-100"
                                    lable={"Nơi tiếp xúc"}
                                    name="noiTiepXuc"
                                    options={NOI_TIEP_XUC_OPTIONS}
                                    value={values?.noiTiepXuc || null}
                                    onChange={(value) => handleChangeSelect("noiTiepXuc", value)}
                                    touched={touched?.noiTiepXuc}
                                    errors={errors?.noiTiepXuc}
                                />
                            </Col>
                            {values?.noiTiepXuc?.code === "4" && (
                                <Col xs={4} sm={4} md={4} lg={2}>
                                    <TextValidator
                                        className="flex-row"
                                        lable={"Nơi Tiếp xúc khác"}
                                        isRequired
                                        name="noiTiepXucKhac"
                                        type="text"
                                        value={values?.noiTiepXucKhac}
                                        onChange={handleChange}
                                        errors={errors?.noiTiepXucKhac}
                                        touched={touched?.noiTiepXucKhac}
                                    />
                                </Col>
                            )}
                        </>
                    )}
                </Row>
            </div>

        </div>
    )
}

export default ThongTinChungTab