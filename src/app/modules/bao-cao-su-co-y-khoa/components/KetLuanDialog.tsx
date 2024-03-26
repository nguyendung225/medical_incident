import { Formik } from 'formik';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import LabelRequired from '../../component/LabelRequired';
import TextField from '../../component/TextField';
import { RESPONSE_STATUS_CODE } from '../../utils/Constant';
import { initKetLuan } from '../const/constants';
import { IKetLuanSCYK } from '../models/BaoCaoSCYKModels';
import { ketLuanSCYK } from '../services/BaoCaoSCYKServices';
import Autocomplete from './../../component/input-field/Autocomplete';
import { localStorageItem } from '../../utils/LocalStorage';
import { KEY_LOCALSTORAGE } from '../../auth/core/_consts';

type Props = {
    handleClose: () => void
    suCoId: string
    updatePageData: (objectSearch: any) => void;
}

const KetLuanSCYKDialog = ({ handleClose, suCoId, updatePageData }: Props) => {

    const validationSchema = Yup.object().shape({
        lyDo: Yup.string().required("Bắt buộc chọn"),
        nguoiKetLuanId: Yup.string().required("Bắt buộc chọn"),
    });

    const handleSubmit = async (values: IKetLuanSCYK) => {
        values.suCoId = suCoId
        try {
            const { data: { code, message } } = await ketLuanSCYK(values)
            if (code === RESPONSE_STATUS_CODE.CREATED) {
                toast.success(message)
                updatePageData({})
                handleClose()
            }

        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    }

    return (
        <Modal show={true} onHide={handleClose} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Kết luận sự cố y khoa</Modal.Title>
            </Modal.Header>
            <Formik
                validationSchema={validationSchema}
                initialValues={initKetLuan}
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    values,
                    touched,
                    handleSubmit,
                    setValues,
                }) => {

                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Row>
                                    <Col xs={6}>
                                        <div className="spaces pb-4">
                                            <LabelRequired
                                                className="text-primary spaces fw-700 h-24 mb-4"
                                                label="Lý do kết luận"
                                                isRequired
                                            />
                                            <TextField
                                                className="spaces"
                                                name="lyDo"

                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="spaces pb-4">
                                            <LabelRequired
                                                className="text-primary spaces fw-700 h-24 mb-4"
                                                label="Người kết luận"
                                                isRequired
                                            />
                                            <Autocomplete
                                                onChange={(selectedOption) => {
                                                    setValues({
                                                        ...values, nguoiKetLuanId: selectedOption.id,
                                                        maChucVu: selectedOption.maChucVu,
                                                        tenChucVu: selectedOption.tenChucVu,
                                                        tenKhoaPhong: selectedOption.tenPhong,
                                                        maKhoaPhong: selectedOption.phongId
                                                    })
                                                }}
                                                getOptionLabel={(option) => option.fullName}

                                                className="spaces h-25 width-100"
                                                name="chuTriObj"
                                                searchObject={{}}
                                                options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_NHAN_VIEN)}
                                                value={values.nguoiKetLuanId}
                                                errors={errors?.nguoiKetLuanId}
                                                touched={
                                                    touched?.nguoiKetLuanId
                                                }

                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="spaces pb-4">
                                            <LabelRequired
                                                className="text-primary spaces fw-700 h-24 mb-4"
                                                label="Khoa/Phòng"
                                            />
                                            <Autocomplete
                                                isReadOnly
                                                className="spaces h-25 width-100"
                                                options={[]}
                                                value={{
                                                    code: values.maKhoaPhong,
                                                    name: values.tenKhoaPhong
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="spaces pb-4">
                                            <LabelRequired
                                                className="text-primary spaces fw-700 h-24 mb-4"
                                                label="Chức vụ"
                                            />
                                            <Autocomplete
                                                isReadOnly
                                                className="spaces h-25 width-100"
                                                options={[]}
                                                value={{
                                                    code: values.maChucVu,
                                                    name: values.tenChucVu
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="spaces pb-4">
                                            <LabelRequired
                                                className="text-primary spaces fw-700 h-24 mb-4"
                                                label="Ghi chú"
                                            />
                                            <TextField
                                                className="spaces"
                                                name="ghiChu"
                                                as="textArea"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center">
                                <Button
                                    className="button-primary"
                                    type='submit'
                                >
                                    Lưu
                                </Button>
                                <Button
                                    className="button-gray"
                                    onClick={handleClose}
                                >
                                    Hủy
                                </Button>
                            </Modal.Footer>
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    )
}

export default KetLuanSCYKDialog