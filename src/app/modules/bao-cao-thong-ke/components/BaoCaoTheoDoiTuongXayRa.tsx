import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ISearchObj, IThongKeTheoDoiTuongXayRa } from '../models/BaoCaoThongKeModels';
import AppContext from '../../../AppContext';
import { exportThongKeDoiTuong, getTheoDoiTuongXayRaList } from '../services/BaoCaoThongKeServices';
import { formatDateToString } from '../../utils/FormatUtils';
import TableGrouping from '../../component/table/TableGrouping/TableGrouping';
import { INIT_TK_THEO_DOI_TUONG_XAY_RA, baoCaoSCYKTheoDoiTuongTableColumns } from '../constants/constants';
import { exportToFile } from '../../utils/FunctionUtils';
import { RESPONSE_STATUS_CODE } from '../../utils/Constant';

type TProps = {
    searchObj: ISearchObj,
}

const BaoCaoTheoDoiTuongXayRa = ({ searchObj }: TProps) => {
    const [reportTableData, setReportTableData] = useState<IThongKeTheoDoiTuongXayRa>(INIT_TK_THEO_DOI_TUONG_XAY_RA);
    const { setPageLoading } = useContext(AppContext);

    const handleExportExcel = () => {
        exportToFile({
            exportAPI: () => exportThongKeDoiTuong(searchObj),
            fileName: "BaoCaoTheoDoiTuongXayRa",
            setPageLoading
        })
    };

    const getReportByObjectOccurs = async () => {
        try {
            setPageLoading(true);
            const { data } = await getTheoDoiTuongXayRaList(searchObj);
            if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                setReportTableData({
                    ...data?.data,
                    baoCaoTheoDonVi: {
                        tenDonVi: data?.data?.baoCaoTheoDonVi?.tenDonVi,
                        tongSo: data?.data?.baoCaoTheoDonVi?.tongSo,
                        nguoiBenh: data?.data?.baoCaoTheoDonVi?.nguoiBenh,
                        nguoiNha: data?.data?.baoCaoTheoDonVi?.nguoiNha,
                        nhanVien: data?.data?.baoCaoTheoDonVi?.nhanVien,
                        thietBi: data?.data?.baoCaoTheoDonVi?.thietBi,
                    }
                });
            }
        } catch (err) {
            toast.error("Lỗi không lấy được thông tin báo cáo scyk theo đối tượng xảy ra");
        } finally {
            setPageLoading(false);
        }
    }

    useEffect(() => {
        getReportByObjectOccurs();
    }, [searchObj]);

    return (
        <>
            <Row className='spaces pt-15'>
                <Col xs={12} className="spaces d-flex justify-content-center flex-column align-items-center">
                    <h4 className="fw-700">BÁO CÁO SỰ CỐ Y KHOA THEO ĐỐI TƯỢNG XẢY RA</h4>
                    <h5 className="fw-500">
                        {searchObj.fromDate && formatDateToString(searchObj.fromDate)} - {searchObj.toDate && formatDateToString(searchObj.toDate)}
                    </h5>
                </Col>
                <Col xs={12}>
                    <TableGrouping
                        height={"calc(100vh - 240px)"}
                        columns={baoCaoSCYKTheoDoiTuongTableColumns}
                        sumUpData={reportTableData?.baoCaoTheoDonVi}
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

export default BaoCaoTheoDoiTuongXayRa;