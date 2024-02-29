import { Col, Row } from "react-bootstrap"
import TextValidator from "../../../component/input-field/TextValidator"
import RadioGroup from "../../../component/input-field/RadioGroup"
import { useFormikContext } from "formik";
import { KET_QUA_XN_OPTIONS, RADIO_CHAN_DOAN_SO_BO, RADIO_OPTIONS } from "../../constants/QuanLyTruongHopBenhConstants";

const TrieuChungVaChanDoanSoBo = () => {
    const { values, errors, touched, setFieldValue } = useFormikContext<any>();

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
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <div className="d-flex flex-column justify-content-around h-100">
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Đau đầu: "}
                                name="dauDau"
                                value={values?.dauDau ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Đau bắp thịt: "}
                                name="dauBapThit"
                                value={values?.dauBapThit ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={7} xxl={6}>
                        <div className="d-flex flex-column justify-content-around h-100">
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Đau xương khớp: "}
                                name="dauXuongKhop"
                                value={values?.dauXuongKhop ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Dấu hiệu dây thắt: "}
                                name="dauHieuDayThat"
                                value={values?.dauHieuDayThat ?? "1"}
                                handleChange={handleChange}
                                radioItemList={KET_QUA_XN_OPTIONS}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="spaces mt-10 fs-15">
                Các triệu chứng xuất huyết (Gồm 13 triệu chứng sau)
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Nổi ban: "}
                            name="noiBan"
                            value={values?.noiBan || "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Chấm xuất huyết: "}
                            name="chamXuatHuyet"
                            value={values?.chamXuatHuyet || "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Xuất huyết nổi cục: "}
                            name="xuatHuyetNoiCuc"
                            value={values?.xuatHuyetNoiCuc || "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Mảng xuất huyết: "}
                            name="mangXuatHuyet"
                            value={values?.mangXuatHuyet || "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Xuất huyết lợi răng: "}
                            name="xuatHuyetLoiRang"
                            value={values?.xuatHuyetLoiRang ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Nôn ra máu: "}
                            name="nonRaMau"
                            value={values?.nonRaMau ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Đi ngoài ra máu"}
                            name="diNgoaiRaMau"
                            value={values?.diNgoaiRaMau ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Đi tiểu ra máu: "}
                            name="diTieuRaMau"
                            value={values?.diTieuRaMau ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Hành kinh kéo dài: "}
                            name="hanhKinhKeoDai"
                            value={values?.hanhKinhKeoDai ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Đau vùng gan"}
                            name="dauVungGan"
                            value={values?.dauVungGan ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Gan dưới bờ sườn: "}
                            name="ganDuoiBoSuon"
                            value={values?.ganDuoiBoSuon ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <RadioGroup
                            className="d-flex spaces gap-4"
                            classLable="spaces w-140"
                            lable={"Sưng hạch bạch huyết: "}
                            name="sungHachBachHuyet"
                            value={values?.sungHachBachHuyet ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_OPTIONS}
                        />
                    </Col>
                </Row>
            </div>
            <div className="block-content">
                <Row>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <TextValidator
                            className="flex-row-label min-w-80"
                            lable={"Xuất huyết nơi khác (ghi rõ)"}
                            name="xuatHuyetNoiKhac"
                            type="text"
                            value={values?.xuatHuyetNoiKhac}
                        />
                    </Col>
                </Row>
            </div>
            <div className="tab-main-content">5.Chẩn đoán sơ bộ</div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <RadioGroup
                            name="chanDoanSoBo"
                            value={values?.chanDoanSoBo ?? "1"}
                            handleChange={handleChange}
                            radioItemList={RADIO_CHAN_DOAN_SO_BO}
                        />
                    </Col>
                </Row>
            </div>
            <div className="tab-main-content">6.Dấu hiệu tiền và sốc</div>
            <div className="block-content">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <div className="d-flex flex-column justify-content-around h-100">
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Vật vã: "}
                                name="vatVa"
                                value={values?.vatVa || "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Li bì: "}
                                name="liBi"
                                value={values?.liBi || "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-110"
                                lable={"Da lạnh ẩm: "}
                                name="daLanhAm"
                                value={values?.daLanhAm ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xxl={4}>
                        <div className="d-flex flex-column h-100">
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-140"
                                lable={"Chân tay lạnh"}
                                name="chanTayLanh"
                                value={values?.chanTayLanh ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-24"
                                classLable="spaces w-140"
                                lable={"Nhịp mạch (lần / phút): "}
                                name="nhipMachLanPhut"
                                value={values?.nhipMachLanPhut ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                            <RadioGroup
                                className="d-flex spaces gap-14"
                                classLable="spaces w-150"
                                lable={"Huyết áp tối đa / tối thiểu: "}
                                name="huyetApToiDaToiThieu"
                                value={values?.huyetApToiDaToiThieu ?? "1"}
                                handleChange={handleChange}
                                radioItemList={RADIO_OPTIONS}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={2}>
                        <TextValidator
                            className="flex-row"
                            lable={"Triệu chứng khác: "}
                            name="trieuChungKhac"
                            type="text"
                            value={values?.TrieuChungKhac}
                        />
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default TrieuChungVaChanDoanSoBo