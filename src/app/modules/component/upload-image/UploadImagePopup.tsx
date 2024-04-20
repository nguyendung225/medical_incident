import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import "../style.scss"
import { toast } from "react-toastify";

type Props = {
    open: boolean
    handleClose: () => void
    handleUpdate: (state: any) => void
};

export interface IUploadImage {
    files: any[];
    isEmpty: boolean;
    src: any;
    formData: string;
}

const UploadImagePopup = (props: Props) => {
    let { open, handleClose, handleUpdate } = props
    const [state, setState] = useState<IUploadImage[]>([])

    const handleFileSelect = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = [...e.target.files];
            files.forEach((file: any) => {
                fileReaderImage([file]);
            })
        }
    };

    const fileReaderImage = (files: any) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => 
            setState((prevState) => {
                return [
                    ...prevState,
                    {
                        files: files,
                        isEmpty: false,
                        src: reader.result,
                        formData: ""
                    }
                ]
            })
        )
        reader.readAsDataURL(files[0]);
    }

    const HandleSaveImageFile = () => {
        if (state.length > 0) {
            handleUpdate(state);
            handleClose();
            setState([]);
        } else {
            toast.error("Vui lòng chọn ảnh!");
        }
    }

    return (
        <Container>
            <Modal show={open} centered className="modal_custom" onHide={handleClose}>
                <Modal.Header className='header-modal p-4'>
                    <Modal.Title>
                        Tải lên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='dialog-body p-4 spaces max-h-60vh overflow-auto'>
                    <div className="upload-form">
                        <div>
                            {(state?.length > 0)
                                ? (
                                    state?.map(item => (
                                        <div className="flex flex-center flex-middle">
                                            <img src={item?.src} className="img w-100" alt="" />
                                        </div>
                                    ))
                                )
                                : (
                                    <div className={`upload-drop-box flex flex-center flex-middle`}>
                                        <span>Drop your files here</span>
                                    </div>
                                )
                            }
                            <div className="flex flex-wrap mt-2 justify-content-center cursor-pointer">
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
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center p-4">
                    <Button
                        className='btn-navy min-w-80px'
                        size="sm"
                        onClick={HandleSaveImageFile}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            setState([]);
                        }}
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
