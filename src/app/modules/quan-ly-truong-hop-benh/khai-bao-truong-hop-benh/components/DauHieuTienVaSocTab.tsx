import { Col, Row } from "react-bootstrap"
import RadioGroup from "../../../component/input-field/RadioGroup"
import { RADIO_OPTIONS } from "../../constants/QuanLyTruongHopBenhConstants";
import { useFormikContext } from "formik";
import TextValidator from "../../../component/input-field/TextValidator";

const DauHieuTienVaSocTab = () => {
    const { values, setFieldValue } = useFormikContext<any>();

    const handleChange = (e: any) => {
        setFieldValue(e.target.name, e.target.value);
    }

    return (
        <div className="tab-content-container">
            <div className="tab-main-content">6.Dấu hiệu tiền và sốc</div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={4}>
                        <div className="d-flex flex-column justify-content-around h-100">
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Vật vã: "}
                                name="noiBan"
                                value={values?.noiBan ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Li bì: "}
                                name="chamXuatHuyet"
                                value={values?.chamXuatHuyet ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Da lạnh ẩm: "}
                                name="mangXuatHuyet"
                                value={values?.mangXuatHuyet ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4}>
                        <div className="d-flex flex-column h-100">
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-140"
                                lable={"Chân tay lạnh"}
                                name="xuatHuyetNoiCuc"
                                value={values?.xuatHuyetNoiCuc ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-140"
                                lable={"Nhịp mạch (lần / phút): "}
                                name="noiBan"
                                value={values?.noiBan ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-14"
                                classLable="spaces w-150"
                                lable={"Huyết áp tối đa / tối thiểu: "}
                                name="chamXuatHuyet"
                                value={values?.chamXuatHuyet ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Xuất huyết nơi khác (ghi rõ)"}
                            isRequired
                            name="huyetAp"
                            type="text"
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default DauHieuTienVaSocTab