import React, { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TemplateComponent from "./TemplateComponent";
import { css } from "./StylePrint";

export type Props = {
    handleClose: () => void;
    open: boolean;
    template: string;
    data: any;
    size?: "sm" | "lg" | "xl";
    textYes?: string;
    textClose?: string;
    title?: string;
}

const ComponentPrint: FC<Props> = (props) => {
    let { handleClose, open, template, data, size, textYes, textClose, title } = props
    const style = `@media print {
        @page {
          margin: -3mm;
        }
     }`

    const handlePrint = () => {
        let content = document.getElementById("print_contents");
        let pri = (document.getElementById("ifmcontentstoprint") as any)
            .contentWindow;
        pri.document.open();
        pri.document.write("<style>" + style + "</style>");
        pri.document.write((content as HTMLElement).innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    };
    const [dataPrint, setDataPrint] = useState(data)

    const [page, setPage] = useState(0)
    useEffect(() => {
        setDataPrint({ ...data, list: data?.list?.[page]?.items || [] })
    }, [data, page])
    return (
        <>
            <Modal
                size={size}
                animation
                centered
                id="kt_header_search_modal"
                aria_hidden="true"
                onHide={handleClose}
                show={open}
            >
                <Modal.Header closeButton className="py-2 header-modal">
                    <Modal.Title className="text-pri">{title}</Modal.Title>
                </Modal.Header>
                <iframe
                    title="print"
                    id="ifmcontentstoprint"
                    style={{
                        height: "0px",
                        width: "0px",
                        position: "absolute",
                    }}
                ></iframe>
                <Modal.Body id="print_contents" className="dialog_body_scroll phieu_in" >
                    <TemplateComponent css={css} template={template} data={dataPrint} />
                </Modal.Body>
                <Modal.Footer className="flex justify-content-center pt-0 pb-2">
                    {data?.list?.length > 1 &&
                        <>
                        <Button disabled={page === 0} className="btn-fill min-w-50px" onClick={() => {

                            setPage(prev => prev - 1)
                        }}>
                            Phiếu trước
                        </Button>
                        <div>{`${page + 1}/${data?.list?.length || 1}`}</div>
                        <Button disabled={page === (data?.list?.length || 1) - 1} className="btn-fill min-w-50px" onClick={() => {

                            setPage(prev => prev + 1)
                        }}>
                            Phiếu sau
                        </Button>
                        </>
                    }
                    <Button className="btn-fill min-w-50px" onClick={handlePrint}>
                        {textYes ? textYes : "In phiếu"}
                    </Button>
                    <Button className="btn-fill" onClick={handleClose}>
                        {textClose ? textClose : "Đóng"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ComponentPrint;
