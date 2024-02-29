import { Button, Modal } from 'react-bootstrap'

type Props = {
  show: boolean;
  handleCloseDialog: () => void;
  children: JSX.Element;
  title?: string;
  size?: "sm" | "lg" | "xl";
  stylePrint?: string;
  fullscreen?: string | true | undefined;
  contentClassName?: string
}

const ModalPhieuIn = ({show, handleCloseDialog, children, title, size, stylePrint = "", fullscreen, contentClassName}: Props) => {

  const handlePrint = () => {
    let content = document.getElementById("print-contents");
    let pri = (document.getElementById("ifmcontentstoprint") as any).contentWindow;
    pri.document.open();

    pri.document.write(stylePrint);
    pri.document.write((content as HTMLElement).innerHTML);

    pri.document.close();
    pri.focus();
    pri.print();
  };

  return (
    <div>
      <Modal centered show={show} onHide={handleCloseDialog} size={size} className='dialog-background' fullscreen={fullscreen} contentClassName={contentClassName}>
        <Modal.Header closeButton className='py-4'>
          <Modal.Title>
           {title}
          </Modal.Title>
        </Modal.Header>

        <iframe
          id="ifmcontentstoprint"
          style={{
            height: "0px",
            width: "0px",
            position: "absolute",
          }}
        ></iframe>
        <Modal.Body id="print-contents">
          {children}
        </Modal.Body>

        <Modal.Footer className="py-3">
          <Button className='btn-outline' onClick={handleCloseDialog}>
            Hủy
          </Button>

          <Button className='btn-fill' onClick={handlePrint}>In phiếu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalPhieuIn