import { Col, Row } from "react-bootstrap"
import TextValidator from "../../../component/input-field/TextValidator"
import Autocomplete from "../../../component/input-field/Autocomplete"
import { useFormikContext } from "formik";

type TProps = {
    mainContent: string;
}

const ThongTinNguoiBaoCaoTab = ({ mainContent }: TProps) => {
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

    const handleChange = (e: any) => {
        setFieldValue(e.target.name, e.target.value);
    }

    return (
        <div className="tab-content-container">
            <div className="tab-main-content">{mainContent}</div>
            <div className="block-content">
                <Row>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <TextValidator
                            className="flex-row"
                            lable={"Tên người báo cáo"}
                            isRequired
                            name="tenNguoiBaoCao"
                            type="text"
                            value={values?.tenNguoiBaoCao}
                            onChange={handleChange}
                            errors={errors?.tenNguoiBaoCao}
                            touched={touched?.tenNguoiBaoCao}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <Autocomplete
                            className="spaces z-index-8 width-100"
                            lable={"Đơn vị công tác"}
                            options={[]}
                            isRequired
                            defaultValue={null}
                            name="donViCongTac"
                            value={values?.donViCongTac}
                            onChange={handleChange}
                            errors={errors?.donViCongTac}
                            touched={touched?.donViCongTac}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <TextValidator
                            className="flex-row"
                            lable={"Số điện thoại"}
                            isRequired
                            name="soDienThoai"
                            type="text"
                            value={values?.soDienThoai}
                            onChange={handleChange}
                            errors={errors?.soDienThoai}
                            touched={touched?.soDienThoai}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={3}>
                        <TextValidator
                            className="flex-row"
                            lable={"Email"}
                            name="email"
                            type="text"
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ThongTinNguoiBaoCaoTab