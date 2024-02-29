import React, { useContext, useEffect, useState } from 'react'
import TableCustom from '../component/table-custom/TableCustom'
import { ColumnCollectionReport } from './components/tab-nursing-report/ColumnCollectionReport'
import DepartmentCollectionReport from './components/tab-nursing-report/DepartmentCollectionReport'
import useMultiLanguage from '../../hook/useMultiLanguage'
import "./styles/NursingReport.scss"
import Autocomplete from '../component/input-field/Autocomplete'
import TextValidator from '../component/input-field/TextValidator'
import { Col, Row } from 'react-bootstrap'
import { heightAutocomplete, heightSelectMutil } from '../component/input-field/StyleComponent'
import { LIST_MONTH, RESPONSE_STATUS_CODE, VARIABLE_STRING } from '../utils/Constant'
import AppContext from '../../AppContext'
import { exportBaoCao, getByIdReport, searchCollectionReport } from './Services/CollectionReportService'
import { checkInvalidDate, exportToExcel, formatDateParam, formatDateTime } from '../utils/FunctionUtils'
import { ReportInput } from '../report-input/ReportInput'
import { KTSVG } from '../../../_metronic/helpers'
import { toast } from 'react-toastify'
import { LIST_KHOA_PHONG } from '../report-input/consts/ReportInputConst'

function CollectionReport() {
    const { lang } = useMultiLanguage();
    const { setPageLoading } = useContext(AppContext);

    const [isShowReport, setIsShowReport] = useState<boolean>(false)
    const [isEditReport, setIsEditReport] = useState<boolean>(false)
    const [isListReport, setIsListReport] = useState<boolean>(true)
    const [dataReport, setDataReport] = useState<any[]>([])
    const [isReportMonth, setIsReportMonth] = useState<boolean>(false)
    const [isView, setIsView] = useState<boolean>(false)
    const [item, setItem] = useState<any>()
    const [reportDay, setReportDay] = useState<any>(null)
    const [reportMonth, setReportMonth] = useState<string | null | number>(null)

    const handleOpenShowReport = (row: any = {}) => {
        setIsShowReport(true)
        setIsListReport(false)
        getById(row?.id)
    }

    const handleOpenReportInput = (row: any, isView: boolean) => {
        setIsEditReport(true)
        setIsListReport(false)
        setIsView(isView)
        getById(row?.id)
    }

    const handleSelect = (name: string, value: any) => {
        setReportMonth(value?.code)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e?.target;

        switch (name) {
            case VARIABLE_STRING.REPORT_DAY:
                setReportDay(value)
                break
            default:
                break
        }
    }

    const updatePageData = async (searchObject: any = {}) => {
        try {
            setPageLoading(true);
            let { data } = await searchCollectionReport(searchObject);
            if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                setDataReport(data?.data.content)
            }
        } catch (error) {
            toast.error(lang("GENERAL.ERROR"));
        } finally {
            setPageLoading(false);
        }
    }

    const getById = async (id: string) => {
        let { data } = await getByIdReport(id)
        if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
            setItem(data?.data)
        }
    }

    const hanldeSearchMonth = () => {
        if (!reportMonth) {
            toast.warning("Chưa chọn tháng cần lọc");
            return;
        }

        let date = new Date();
        date.setDate(1);
        date.setMonth(Number(reportMonth) - 1);

        let searchObject = {
            reportMonth: formatDateParam(date)
        }
        setIsReportMonth(true)
        setReportDay(null)
        updatePageData(searchObject)
    }

    const handleSearch = () => {
        if (!reportDay) {
            setReportDay(new Date())
        }

        if (!checkInvalidDate(reportDay)) {
            let searchObject = {
                reportDay: reportDay ? formatDateParam(reportDay) : formatDateParam(new Date())
            }
            setReportMonth(null)
            setIsReportMonth(false)
            updatePageData(searchObject)
            return
        }
    }

    useEffect(() => {
        setReportDay(new Date())
        handleSearch()
    }, [])

    const hanldeBack = () => {
        setIsShowReport(false)
        setIsEditReport(false)
        setIsListReport(true)
        setIsReportMonth(reportMonth ? true : false)
    }

    const handleExportExcel = () => {
        exportToExcel(() => exportBaoCao(item?.id));
    }
    
    return (
        <div className='bg-white mt-2 p-2'>
            {
                isListReport &&
                <div>
                    <Row className='flex-middle'>
                        <Col xs={3} className='h-36 flex-row-label min-w-80'>
                            <Autocomplete
                                className="spaces z-index-8 width-100"
                                lable={"Khoa báo cáo"}
                                options={LIST_KHOA_PHONG}
                                isRequired
                                defaultValue={null}
                                styles={heightAutocomplete("30px")}
                                name="khoaBaoCao"
                            />
                        </Col>
                        <Col xs={3} >
                            <TextValidator
                                className="flex-row-label min-w-80"
                                lable={"Tìm theo ngày"}
                                isRequired
                                name={VARIABLE_STRING.REPORT_DAY}
                                type="date"
                                value={reportDay ? formatDateTime(reportDay) : ""}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col xs={1}>
                            <button
                                className='spaces button-primary py-4 fs-12 h-30'
                                onClick={handleSearch}
                            >
                                Tim Kiếm
                            </button>
                        </Col>
                        <Col xs={5} className='flex flex-end'>
                            <div className='flex'>
                                <button
                                    className='spaces button-primary py-4 fs-12'
                                    onClick={hanldeSearchMonth}
                                >
                                    Xem báo cáo tháng
                                </button>
                                <div className="spaces w-200 ml-10">
                                    <Autocomplete
                                        className='spaces z-index-5'
                                        options={LIST_MONTH}
                                        value={reportMonth || null}
                                        valueSearch="code"
                                        styles={heightAutocomplete("30px")}
                                        name="reportDay"
                                        onChange={(selectedOption) => handleSelect(VARIABLE_STRING.REPORT_DAY, selectedOption)}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className='table-custom pt-5'>
                        <TableCustom
                            id="profile"
                            data={dataReport || []}
                            columns={ColumnCollectionReport({
                                handleOpenShowReport,
                                handleOpenReportInput
                            })}
                            buttonAdd={false}
                            buttonExportExcel={false}
                            notDelete={false}
                            fixedColumnsCount={3}
                            justFilter={true}
                            updatePageData={() => { }}
                        />
                    </div>
                </div>
            }

            <>
                {
                    !isListReport &&
                    <div className='pb-2 flex flex-space-between'>
                        <div className="spaces d-flex align-items-center cursor-pointer w-110" onClick={hanldeBack}>
                            <i className="bi bi-arrow-bar-left fs-2 me-2 text-primary "></i>
                            <span className="fs-3 fw-bold">
                                {lang("BTN.BACK")}
                            </span>
                        </div>
                        <div>
                            {
                                isShowReport &&
                                <button
                                    className="spaces table-btn outline py-4 fs-12"
                                    onClick={handleExportExcel}
                                >
                                    <KTSVG path="/media/icons/export-excel.svg" />{" "}
                                    {lang("BTN.EXPORT")}
                                </button>
                            }
                        </div>
                    </div>
                }

                {
                    isShowReport &&
                    <DepartmentCollectionReport
                        isReportMonth={isReportMonth}
                        dataReport={item}
                        setIsShowReport={setIsShowReport}
                    />
                }

                {
                    isEditReport &&
                    <ReportInput
                        isView={isView}
                        dataReport={item}
                        setIsEditReport={setIsEditReport}
                    />
                }
            </>
        </div>
    )
}

export default CollectionReport