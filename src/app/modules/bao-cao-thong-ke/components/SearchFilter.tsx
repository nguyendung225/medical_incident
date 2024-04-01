import { Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import LabelRequired from "../../component/LabelRequired";
import Autocomplete from "../../component/input-field/Autocomplete";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import TextField from "../../component/TextField";
import { heightSelectMutil } from "../../component/input-field/StyleComponent";
import * as Yup from "yup";
import { INIT_SEARCH_OBJECT } from "../constants/constants";
import { ISearchObj } from "../models/BaoCaoThongKeModels";

type TProps = {
    handleChangeSearchObj: React.Dispatch<React.SetStateAction<ISearchObj>>
}

const SearchFilter = ({ 
    handleChangeSearchObj
}: TProps) => {

    const validationSchema = Yup.object().shape({
        FromDate: Yup.date()
            .max(Yup.ref("ToDate"), "Từ ngày không được lớn hơn đến ngày")
            .max(new Date(), "Từ ngày không được lớn hơn ngày hiện tại").notRequired(),
        ToDate: Yup.date()
            .min(Yup.ref("FromDate"), "Đến ngày không được nhỏ hơn từ ngày")
            .max(new Date(), "Đến ngày không được lớn hơn ngày hiện tại").notRequired(),
    });

    const handleSearch = async (values: ISearchObj) => {
        const searchObj = {
            toDate: values?.toDate,
            fromDate: values?.fromDate,
            listDepartmentId: values?.listDepartment?.map((department: any) => department?.id) || []
        }

        handleChangeSearchObj(searchObj);
    }

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                initialValues={INIT_SEARCH_OBJECT}
                onSubmit={handleSearch}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    setFieldValue,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Row className="spaces ml--15 mr--15 bg-white">
                                <Col xs={12} className="spaces d-flex bg-white p-15 align-items-center gap-20">
                                    <div className="d-flex">
                                        <LabelRequired
                                            label="Khoa/phòng ban"
                                            className="spaces min-w-100 fw-500"
                                        />
                                        <Autocomplete
                                            className="spaces h-25 min-w-250 width-100 z-index-10"
                                            name="listDepartment"
                                            onChange={(selectedOption) =>
                                                setFieldValue("listDepartment", selectedOption)
                                            }
                                            styles={heightSelectMutil("auto", "25px")}
                                            isMulti
                                            value={values.listDepartment}
                                            errors={errors?.listDepartment}
                                            touched={
                                                touched?.listDepartment
                                            }
                                            options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={option => option.id}
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <LabelRequired
                                            label="Từ ngày"
                                            className="spaces min-w-80 fw-500"
                                        />
                                        <TextField
                                            className="spaces width-100"
                                            name="fromDate"
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
                                            name="toDate"
                                            type="date"
                                        />
                                    </div>
                                    <div className="d-flex spaces gap-8">
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
        </>
    )
}

export default SearchFilter