import { Button, Col, Row } from "react-bootstrap";
import ThongKeTongQuanBCSuCo from "./components/ThongKeTongQuanBCSuCo";
import LabelRequired from "../component/LabelRequired";
import Autocomplete from "../component/input-field/Autocomplete";
import TextField from "../component/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import { INIT_DASHBOARD_DATA, INIT_DASHBOARD_SEARCH_VALUE } from "./constants/constants";
import { useContext, useEffect, useState } from "react";
import { IDashboardObject, ISearchObject } from "./models/ThongKeModels";
import { searchTongQuanBaoCaoByParam } from "./services/ThongKeServices";
import { toast } from "react-toastify";
import AppContext from "../../AppContext";

const ThongKeSCYK = () => {
    const { setPageLoading } = useContext(AppContext);
    const [thongKeSCYK, setThongKeSCYK] = useState<IDashboardObject>(INIT_DASHBOARD_DATA);

    const validationSchema = Yup.object().shape({
        tuNgay: Yup.date()
            .max(Yup.ref("denNgay"), "Từ ngày" + " không được lớn hơn đến ngày")
            .max(new Date(), "Từ ngày" + " không được lớn hơn ngày hiện tại").notRequired(),
        denNgay: Yup.date()
            .min(Yup.ref("tuNgay"), "Đến ngày" + " không được nhỏ hơn từ ngày")
            .max(new Date(), "Đến ngày" + " không được lớn hơn ngày hiện tại").notRequired(),
    });

    const fetchTongQuanBaoCao = async (searchObject: ISearchObject) => {
        try {
            setPageLoading(true);
            const { data } = await searchTongQuanBaoCaoByParam(searchObject)
            setThongKeSCYK({ tongQuanBaoCao: data?.data || INIT_DASHBOARD_DATA.tongQuanBaoCao })
            setPageLoading(false);
        } catch (error) {
            setPageLoading(false);
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };
    useEffect(() => {
        fetchTongQuanBaoCao(INIT_DASHBOARD_SEARCH_VALUE);
    }, []);

    const handleSearch = async (searchObject: ISearchObject) => {
        fetchTongQuanBaoCao(searchObject);
    };

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                initialValues={INIT_DASHBOARD_SEARCH_VALUE}
                onSubmit={handleSearch}
            >
                {({
                    handleSubmit,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Row className="spaces d-flex p-0 flex-grow-1 ml--15 mr--15">
                                <Col xs={12} className="spaces d-flex bg-white p-15 align-items-center gap-20">
                                    <div className="d-flex">
                                        <LabelRequired
                                            label="Khoa/phòng ban"
                                            className="spaces min-w-100 fw-500"
                                        />
                                        <Autocomplete
                                            getOptionLabel={(option) => option.code}
                                            className="spaces h-25 min-w-200 width-100"
                                            name="khoaPhong"
                                            isMulti
                                            searchObject={{}}
                                            searchFunction={async () => { }}
                                            options={[]}
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <LabelRequired
                                            label="Từ ngày"
                                            className="spaces min-w-80 fw-500"
                                        />
                                        <TextField
                                            className="spaces width-100"
                                            name="tuNgay"
                                            type="date"
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <LabelRequired
                                            label="Đến ngày"
                                            className="spaces min-w-80 fw-500"
                                        />
                                        <TextField
                                            className="spaces width-100"
                                            name="denNgay"
                                            type="date"
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <Button
                                            className="button-primary"
                                            type="submit"
                                        >
                                            Tìm kiếm
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    );
                }}
            </Formik>

            <Row>
                {thongKeSCYK.tongQuanBaoCao && (
                    <Col xs={4}>
                        <div className="spaces py-16 d-flex gap-10">
                            <ThongKeTongQuanBCSuCo tongQuanBCSuCo={thongKeSCYK.tongQuanBaoCao} />
                        </div>
                    </Col>
                )}
            </Row>
        </>

    );
};

export default ThongKeSCYK;
