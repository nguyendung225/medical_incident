import moment from "moment";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { downLoadFileById } from "../../utils/FileServices";
import "./style.scss";
type Props = {
    handleClose: () => void;
    listFile?: any
    setListFile: any
};

function FileUploadDialog(props: Props) {
    const { handleClose, listFile, setListFile } = props;
    const [selectedFile, setSelectedFile] = useState<any>(listFile || []);

    const onChange = async (e: any) => {
        setSelectedFile([...selectedFile, ...Array.from(e.target.files)]);
    };

    const handledownLoadFile = async (fileId: string, fileName: string) => {
        try {
            const res = await downLoadFileById(fileId);
            const url = window.URL.createObjectURL(new Blob([res?.data], {
                type: res.headers['content-type']
            }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${fileName}`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            toast.error("Lỗi hệ thống vui lòng thử lại");
        }
    };

    const handleRemoveFileUpload = (index: number) => {
        const newSelectFile = [...selectedFile]
        newSelectFile.splice(index, 1);
        setSelectedFile(newSelectFile)
    };
    return (
        <Modal show centered className="modal_custom" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tệp đính kèm</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <div className="custom-file-upload">
                    <label className="flex-fill">
                        <input type="file" onChange={onChange} multiple />
                        <i className="fa fa-cloud-upload text-primary me-1" />
                        Tải lên
                    </label>
                </div>

                <div className="spaces mt-12">
                    <div className="spaces fw-700 text-primary mb-6">
                        Danh sách tệp đã tải lên:
                    </div>
                  <div className="list-file">
                  {selectedFile &&
                        Array.from(selectedFile).map((file: any, index) => (
                            <div className="mb-1 d-flex justify-content-between gap-2" key={index}>

                                <div className="min-w-175px"> {file?.name?.length < 25
                                    ? file?.name
                                    : file?.name?.slice(0, 25) + "..."}</div>
                                <span className="ms-2 text-gray-600 min-w-90px">Size: {((file?.contentSize || file.size) / (1024 * 1024))?.toFixed(2)} Mb</span>
                                <span className="ms-2 text-gray-600">Time: {moment(file.createdAt).format("DD/MM/YYYY")}</span>
                                <div className="d-flex">
                                    <div className="spaces min-w-24" >
                                        <i
                                            className="bi bi-trash3 text-danger cursor-pointer"
                                            onClick={() =>
                                                handleRemoveFileUpload(index)
                                            }
                                        />
                                    </div>
                                    <div className="spaces min-w-20">
                                        {file.id && <i
                                            className="bi bi-download text-primary cursor-pointer"
                                            onClick={() => handledownLoadFile(file.id, file.name)}
                                        />}
                                    </div>
                                </div>
                            </div>
                        ))}
                  </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="button-primary" onClick={() => {
                    setListFile(selectedFile)
                    handleClose()
                }}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FileUploadDialog;
