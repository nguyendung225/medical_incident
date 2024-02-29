import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

export interface Props {
  show: boolean;
  onHide: () => void;
  title: string | null;
  children: any;
  handlePrint?: () => void;
  handleSave?: () => void;
}

const CustomModalFullScreen: FC<Props> = (props) => {
  const {
    show,
    onHide,
    title,
    children,
    handlePrint,
    handleSave,
  } = props;

  return (
    <Modal
      className="bg-body modal-full-custom"
      fullscreen
      scrollable
      show={show}
      onHide={onHide}
      title={title}
      backdrop="static"
      //   keyboard={false}
    >
      <Modal.Header closeButton className="py-3 header-modal">
        <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="flex flex-center py-3">
        
        <Button variant="primary" className="btn-navy min-w-80px btn-navy btn-primary" onClick={handlePrint}>
          In
        </Button>
        <Button variant="primary" className="btn-navy min-w-80px btn-navy btn-primary" onClick={handleSave}>
          Lưu
        </Button>
        <Button variant="ouline" className="btn-navy-outlined btn btn-primary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModalFullScreen;
