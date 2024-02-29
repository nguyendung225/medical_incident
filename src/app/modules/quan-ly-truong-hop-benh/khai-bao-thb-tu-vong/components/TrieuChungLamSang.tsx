import { useFormikContext } from "formik";
import { Col, Row } from "react-bootstrap";
import TextValidator from "../../../component/input-field/TextValidator";
import RadioGroup from "../../../component/input-field/RadioGroup";
import { KET_QUA_XN_OPTIONS, RADIO_DAU_OPTIONS, RADIO_MORE_OPTIONS, TIEN_CHOANG_VA_CHOANG_OPTIONS, XUAT_HUYET_OPTIONS } from "../../constants/QuanLyTruongHopBenhConstants";
import CheckboxGroup from "../../../component/input-field/CheckboxGroup";

const TrieuChungLamSang = () => {
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

    const handleChangeCheckbox = (checkboxName: string, value: string[]) => {
        setFieldValue(checkboxName, value);
    }

    const handleChange = (e: any) => {
        setFieldValue(e.target.name, e.target.value);
    }

    return (
        <div className="tab-content-container">
            <div className="tab-main-content">4.Triệu chứng lâm sàng</div>
            <div className="block-content">
                <Row>
                    <Col xs={4} sm={4} md={4} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Ngày bắt đầu sốt"}
                            isRequired
                            name="ngayBatDauSot"
                            type="date"
                            value={values?.ngayBatDauSot}
                            onChange={handleChange}
                            errors={errors?.ngayBatDauSot}
                            touched={touched?.ngayBatDauSot}
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Nhiệt độ cao nhất"}
                            isRequired
                            name="nhietDoCaoNhat"
                            type="number"
                            value={values?.nhietDoCaoNhat}
                            onChange={handleChange}
                            errors={errors?.nhietDoCaoNhat}
                            touched={touched?.nhietDoCaoNhat}
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Số ngày sốt"}
                            isRequired
                            name="soNgaySot"
                            type="number"
                            value={values?.soNgaySot}
                            onChange={handleChange}
                            errors={errors?.soNgaySot}
                            touched={touched?.soNgaySot}
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Nhịp mạch (lần/phút)"}
                            isRequired
                            name="nhipMach"
                            type="number"
                            value={values?.nhipMach}
                            onChange={handleChange}
                            errors={errors?.nhipMach}
                            touched={touched?.nhipMach}
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Huyết áp tối đa /tối thiểu"}
                            isRequired
                            name="huyetAp"
                            type="number"
                            value={values?.huyetAp}
                            onChange={handleChange}
                            errors={errors?.huyetAp}
                            touched={touched?.huyetAp}
                        />
                    </Col>
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={8} xxl={6}>
                        <div className="d-flex flex-column justify-content-around h-100">
                            <CheckboxGroup
                                className="d-flex spaces gap-20"
                                classLable="spaces w-150"
                                classCheckbox="spaces mr-13"
                                lable={"Đau"}
                                value={values?.viTriDau}
                                handleChange={(value) => handleChangeCheckbox("viTriDau", value)}
                                radioItemList={RADIO_DAU_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex"
                                classLable="spaces w-140"
                                lable={"Dấu hiệu dây thắt: "}
                                name="dauHieuDayThat"
                                value={values?.dauHieuDayThat ?? "1"}
                                handleChange={handleChange}
                                radioItemList={KET_QUA_XN_OPTIONS}
                            />
                        </div>
                    </Col>
                    {values?.viTriDau.includes("4") && (
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <TextValidator
                                lable="Đau vị trí khác"
                                isRequired
                                name="dauViTriKhac"
                                type="text"
                                value={values?.dauViTriKhac}
                                onChange={handleChange}
                                errors={errors?.dauViTriKhac}
                                touched={touched?.dauViTriKhac}
                            />
                        </Col>
                    )}
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={8} xxl={6}>
                        <div className="d-flex flex-column justify-content-around h-100">
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-140"
                                lable={"Gan dưới bờ sườn: "}
                                name="ganDuoiBoSuon"
                                value={values?.ganDuoiBoSuon}
                                handleChange={handleChange}
                                radioItemList={RADIO_MORE_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-140"
                                lable={"Sưng hạch bạch huyết: "}
                                name="sungHachBachHuyet"
                                value={values?.sungHachBachHuyet}
                                handleChange={handleChange}
                                radioItemList={RADIO_MORE_OPTIONS}
                            />
                        </div>
                    </Col>
                    {values?.ganDuoiBoSuon === "1" && (
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <TextValidator
                                isRequired
                                lable="Kích thước (cm)"
                                name="kichThuocGanDuoiBoSuon"
                                type="number"
                                value={values?.kichThuocGanDuoiBoSuon}
                                onChange={handleChange}
                                errors={errors?.kichThuocGanDuoiBoSuon}
                                touched={touched?.kichThuocGanDuoiBoSuon}
                            />
                        </Col>
                    )}
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={10} xxl={8}>
                        <div className="d-flex flex-col align-items-center">
                            <CheckboxGroup
                                className="w-100"
                                classCheckbox="spaces width-20"
                                lable={"Xuất huyết"}
                                value={values?.xuatHuyet}
                                handleChange={(value) => handleChangeCheckbox("xuatHuyet", value)}
                                radioItemList={XUAT_HUYET_OPTIONS}
                            />
                        </div>
                    </Col>
                    {values?.xuatHuyet?.includes("10") && (
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <TextValidator
                                placeholder="Khác"
                                isRequired
                                lable="Xuất huyết khác"
                                name="xuatHuyetkhac"
                                type="text"
                                value={values?.xuatHuyetkhac}
                                onChange={handleChange}
                                errors={errors?.xuatHuyetkhac}
                                touched={touched?.xuatHuyetkhac}
                            />
                        </Col>
                    )}
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="d-flex flex-col align-items-center">
                            <CheckboxGroup
                                className="w-100"
                                classCheckbox="spaces width-20"
                                lable={"Tiền choáng và choáng"}
                                value={values?.tienChoangVaChoang}
                                handleChange={(value) => handleChangeCheckbox("tienChoangVaChoang", value)}
                                radioItemList={TIEN_CHOANG_VA_CHOANG_OPTIONS}
                            />
                        </div>
                    </Col>
                    {values?.tienChoangVaChoang?.includes("8") && (
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <TextValidator
                                placeholder="Khác"
                                lable="Nhịp mạch (lần/ phút)"
                                name="xuatHuyetkhac"
                                type="text"
                                value={values?.xuatHuyetkhac}
                                onChange={handleChange}
                                errors={errors?.xuatHuyetkhac}
                                touched={touched?.xuatHuyetkhac}
                            />
                        </Col>
                    )}
                    {values?.tienChoangVaChoang?.includes("9") && (
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <TextValidator
                                placeholder="Khác"
                                lable="Huyết áp tối đa/tối thiểu"
                                name="xuatHuyetkhac"
                                type="text"
                                value={values?.xuatHuyetkhac}
                                onChange={handleChange}
                                errors={errors?.xuatHuyetkhac}
                                touched={touched?.xuatHuyetkhac}
                            />
                        </Col>
                    )}
                    {values?.tienChoangVaChoang?.includes("10") && (
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <TextValidator
                                placeholder="Khác"
                                lable="Triệu chứng khác"
                                name="xuatHuyetkhac"
                                type="text"
                                value={values?.xuatHuyetkhac}
                                onChange={handleChange}
                                errors={errors?.xuatHuyetkhac}
                                touched={touched?.xuatHuyetkhac}
                            />
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default TrieuChungLamSang