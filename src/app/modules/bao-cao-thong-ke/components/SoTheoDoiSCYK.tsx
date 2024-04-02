import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ISearchObj, ISoTheoDoi } from '../models/BaoCaoThongKeModels';
import AppContext from '../../../AppContext';
import { exportSoTheoDoi, getSoTheoDoiScykList } from '../services/BaoCaoThongKeServices';
import { formatDateToString } from '../../utils/FormatUtils';
import { INIT_SO_THEO_DOI_DATA, soTheoDoiScykTableColumns } from '../constants/constants';
import TableGrouping from '../../component/table/TableGrouping/TableGrouping';
import { exportToFile } from '../../utils/FunctionUtils';
import { RESPONSE_STATUS_CODE } from '../../utils/Constant';

type TProps = {
    searchObj: ISearchObj,
}

const SoTheoDoiSCYK = ({ searchObj }: TProps) => {
    const [soTheoDoiScykList, setSoTheoDoiScykList] = useState<ISoTheoDoi[]>(INIT_SO_THEO_DOI_DATA);
    const { setPageLoading } = useContext(AppContext);

    const handleExportExcel = () => {
        exportToFile({
            exportAPI: () => exportSoTheoDoi(searchObj),
            fileName: "SoTheoDoiSCYK",
            setPageLoading
        })
    };

    const getMedicalIncidentMonitoringBook = async () => {
        try {
            setPageLoading(true);
            const { data } = await getSoTheoDoiScykList(searchObj);
            if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                setSoTheoDoiScykList(data?.data);
            }
        } catch (err) {
            toast.error("Lỗi không lấy được sổ theo dõi báo cáo scyk theo đối tượng xảy ra");
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        getMedicalIncidentMonitoringBook();
    }, [searchObj]);

    return (
        <>
            <Row className='spaces pt-15'>
                <Col xs={12} className="spaces d-flex justify-content-center flex-column align-items-center">
                    <h4 className="fw-700">SỔ BÁO CÁO CHI TIẾT SỰ CỐ Y KHOA</h4>
                    <h5 className="fw-500">( {searchObj.fromDate && formatDateToString(searchObj.fromDate)} - {searchObj.toDate && formatDateToString(searchObj.toDate)} )</h5>
                </Col>
                <Col xs={12}>
                    <TableGrouping
                        height={"calc(100vh - 275px)"}
                        columns={soTheoDoiScykTableColumns}
                        data={soTheoDoiScykList}
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

export default SoTheoDoiSCYK;