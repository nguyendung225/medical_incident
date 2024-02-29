import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import "../style.scss"

type Props = {
    open: boolean
    handleClose: () => void
    handleUpdate: (state: any) => void
};

interface IUploadImage {
    files: [];
    isEmpty: boolean;
    src: any;
    formData: string;
}

const UploadImagePopup = (props: Props) => {
    let { open, handleClose, handleUpdate } = props
    const [state, setState] = useState<IUploadImage>({
        files: [],
        isEmpty: true,
        src: null,
        formData: "",
    })

    const handleFileSelect = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            let files = [...e.target.files];
            fileReaderImage(files)
        }
    };

    const fileReaderImage = (files: any) => {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
            setState({
                ...state,
                src: reader.result,
                isEmpty: false,
                files: files
            })
        );
        reader.readAsDataURL(files[0]);
    }

    return (
        <Container>
            <Modal
                show={open || false}
                centered
                className='dialog-nhap-ket-qua upload'

            >
                <Modal.Header className='header-modal p-4'>
                    <Modal.Title>
                        Tải lên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='dialog-body p-4'>
                    <div className="upload-form">
                        <div>
                            {state?.isEmpty ? (
                                <div className={`upload-drop-box flex flex-center flex-middle`}>
                                    <span>Drop your files here</span>
                                </div>
                            ) : (state.src && (
                                <div className="flex flex-center flex-middle  ">
                                    <img src={state.src} className="img" alt="" />
                                </div>
                            ))}
                            <div className="flex flex-wrap mt-2">
                                <label htmlFor="upload-single-file" className="upload-single btn-navy">
                                    <div className="flex flex-middle">
                                        <i className="bi bi-cloud-arrow-up-fill"></i>
                                        <span>Chọn tệp</span>
                                    </div>
                                </label>
                                <input
                                    className="display-none"
                                    onChange={handleFileSelect}
                                    id="upload-single-file"
                                    type="file"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center p-4">
                    <Button
                        className='btn-navy min-w-80px'
                        size="sm"
                        onClick={() => handleUpdate(state)}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={handleClose}
                        className='btn-navy-outlined min-w-80px' size="sm"
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
};

export default UploadImagePopup;
