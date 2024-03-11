import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Formik } from 'formik';
import LabelRequired from '../../component/LabelRequired';
import TextField from '../../component/TextField';
import Autocomplete from '../../component/input-field/Autocomplete';
import { initTiepNhan, KHOA_PHONG } from '../const/constanst';
import *as Yup  from 'yup';
type Props = {
    handleClose: () => void
}

const TiepNhanSCYKDialog = ({ handleClose }: Props) => {

    const validationSchema = Yup.object().shape({
        khoaPhongXuLy: Yup.string().required("Bắt buộc chọn"),
        phuongAnXuLyBanDau: Yup.string().required("Bắt buộc nhập"),
    });

    return (
        <Modal show={true} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tiếp nhận sự cố y khoa</Modal.Title>
            </Modal.Header>
            <Formik
                validationSchema={validationSchema}
                initialValues={initTiepNhan}
                onSubmit={() => { }}
            >
                {({
                    errors,
                    values,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }) => {
                    const handleChangeSelect = (name: string, value: any) => {
                        setFieldValue(name, value?.code);
                    };
                    
                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <div className="spaces pb-4">
                                    <LabelRequired
                                        isRequired
                                        className="text-primary spaces fw-700 h-24 mb-4"
                                        label="Khoa/Phòng xử lý"
                                    />
                                    <Autocomplete
                                        className="spaces h-25"
                                        name="khoaPhongXuLy"
                                        onChange={(
                                            selectedOption
                                        ) =>
                                            handleChangeSelect(
                                                "khoaPhongXuLy",
                                                selectedOption
                                            )
                                        }
                                        options={KHOA_PHONG}
                                        value={values?.khoaPhongXuLy}
                                        errors={errors?.khoaPhongXuLy}
                                        touched={touched?.khoaPhongXuLy}
                                    />
                                </div>
                                <div className="mo-ta-su-co spaces pb-4">
                                    <LabelRequired
                                        className="text-primary spaces fw-700 h-24 mb-4"
                                        label="Phương án xử lý ban đầu"
                                        isRequired
                                    />
                                    <TextField
                                        className="spaces min-w-242 h-92"
                                        name="phuongAnXuLyBanDau"
                                        as="textarea"
                                        rows={4}
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    className="button-primary"
                                    type='submit'
                                >
                                    Gửi
                                </Button>
                                <Button
                                    className="button-primary"
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

export default TiepNhanSCYKDialog