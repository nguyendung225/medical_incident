/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import TableCustom from "../../component/table/table-custom/TableCustom"
import { tableAttachedFilesCulumns, tableLichSuCapNhatCulumns } from "../const/constants"
import { IMedicalIncidentDetailInfo, IUpdateHistoryList } from "../models/BaoCaoSCYKModels"
import { getUpdateHistoryList } from "../services/BaoCaoSCYKServices"
import { toast } from "react-toastify"

type TProps = {
    thongTinScyk: IMedicalIncidentDetailInfo,
}

const ThongTinKhacTab = ({ thongTinScyk }: TProps) => {
    const [attachedFiles, setAttachedFiles] = useState<any>();
    const [updateHistoryList, setUpdateHistoryList] = useState<IUpdateHistoryList[]>()

    const handleGetUpdateHistoryList = async () => {
        try {
            const { data } = await getUpdateHistoryList(thongTinScyk?.suCoResp?.id || "");
            setUpdateHistoryList(data?.data)
        } catch (error) {
            toast.error("Lấy thông tin lịch sử cập nhật thất bại");
        }
    }

    useEffect(() => {
        const attachedFilesTemp = [];
        thongTinScyk?.phanTichResp?.fileDinhKems && attachedFilesTemp.push(...thongTinScyk?.phanTichResp?.fileDinhKems);
        thongTinScyk?.bienBanHopResp?.fileDinhKems && attachedFilesTemp.push(...thongTinScyk?.bienBanHopResp?.fileDinhKems);
        setAttachedFiles(attachedFilesTemp);
        thongTinScyk?.suCoResp?.id && handleGetUpdateHistoryList();
    }, [thongTinScyk])

    return (
        <div className="orther-info-tab-container">
            <div>
                <div className="main-content-title">1. Lịch sử cập nhật trạng thái</div>
                <TableCustom
                    height={attachedFiles?.length > 0 ? "calc(60vh - 255px)" : "calc(100vh - 255px)"}
                    id="lich-su-cap-nhat"
                    columns={tableLichSuCapNhatCulumns}
                    data={updateHistoryList || []}
                    buttonAdd={false}
                    buttonExportExcel={false}
                    notDelete={false}
                    justFilter={true}
                    fixedColumnsCount={0}
                    noPagination={true}
                    updatePageData={() => { }}
                />
            </div>
            {attachedFiles?.length > 0 && (
                <div>
                    <div className="main-content-title">2. Tài liệu đính kèm</div>
                    <TableCustom
                        height={"calc(40vh)"}
                        id="lich-su-cap-nhat"
                        columns={tableAttachedFilesCulumns}
                        data={attachedFiles}
                        buttonAdd={false}
                        buttonExportExcel={false}
                        notDelete={false}
                        justFilter={true}
                        fixedColumnsCount={0}
                        noPagination={true}
                        updatePageData={() => { }}
                    />
                </div>
            )}
        </div>
    )
}

export default ThongTinKhacTab