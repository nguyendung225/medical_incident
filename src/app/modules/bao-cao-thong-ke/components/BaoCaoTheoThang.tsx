import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AppContext from '../../../AppContext';
import TableGrouping from '../../component/table/TableGrouping/TableGrouping';
import { RESPONSE_STATUS_CODE } from '../../utils/Constant';
import { formatDateToString } from '../../utils/FormatUtils';
import { exportToFile } from '../../utils/FunctionUtils';
import { convertSumUpData, thongKeTheoThangColumns } from '../constants/constants';
import { ISearchObj, IThongKeTheoDoiTuongXayRa } from '../models/BaoCaoThongKeModels';
import { exportThongKeTheoThang, getThongKeTheoThang } from '../services/BaoCaoThongKeServices';

type TProps = {
    searchObj: ISearchObj,
}

const BaoCaoTheoThang = ({ searchObj }: TProps) => {
    const [reportTableData, setReportTableData] = useState<IThongKeTheoDoiTuongXayRa>({});
    const { setPageLoading } = useContext(AppContext);

    const handleExportExcel = () => {
        exportToFile({
            exportAPI: () => exportThongKeTheoThang(searchObj),
            fileName: "BaoCaoTheoThang",
            setPageLoading
        })
    };

    const getDataBaoCaoTheoThang = async () => {
        try {
            setPageLoading(true);
            const { data } = await getThongKeTheoThang(searchObj);
            if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                setReportTableData(data.data);
            }
        } catch (err) {
            toast.error("Lỗi không lấy được thông tin báo cáo scyk theo tháng");
        } finally {
            setPageLoading(false);
        }
    }

    useEffect(() => {
        getDataBaoCaoTheoThang();
    }, [searchObj]);
    return (
        <>
            <Row className='spaces pt-15'>
                <Col xs={12} className="spaces d-flex justify-content-center flex-column align-items-center">
                    <h4 className="fw-700">BÁO CÁO SỰ CỐ Y KHOA NĂM 2024</h4>
                    <h5 className="fw-500">
                        {searchObj.fromDate && formatDateToString(searchObj.fromDate)} - {searchObj.toDate && formatDateToString(searchObj.toDate)}
                    </h5>
                </Col>
                <Col xs={12}>
                    <TableGrouping
                        height={"calc(100vh - 240px)"}
                        columns={thongKeTheoThangColumns}
                        sumUpData={convertSumUpData(reportTableData?.baoCaoTheoDonVi)}
                        data={reportTableData?.baoCaoTheoKhoaPhongs || []}
                        buttonExportExcel={true}
                        handleExportExcel={handleExportExcel}
                        noPagination={true}
                        isSingleRow={true}
                        secondLevelTitleField={''}
                        secondLevelDataField={''}
                        firstLevelTitleField={''}
                        firstLevelDataField={''}
                        id={''}
                    />
                </Col>
            </Row>
        </>
    );
};

export default BaoCaoTheoThang;