import React, { useCallback, useEffect, useState } from 'react'
import TableDetailCollectionReport from './TableDetailCollectionReport'
import { Col, Row } from 'react-bootstrap'
import TableStaffCollectionReport from './TableStaffCollectionReport'
import TableCustom from '../../../component/table-custom/TableCustom'
import { ColumnStaff } from './ColumnStaff'
import { dataStaffReport } from '../../consts/NursingReportConsts'
import useMultiLanguage from '../../../../hook/useMultiLanguage'

interface IProps {
  dataReport: any
  setIsShowReport: any
  isReportMonth: boolean
}

function DepartmentCollectionReport(props: IProps) {
  let { dataReport, setIsShowReport, isReportMonth } = props;
  const { lang } = useMultiLanguage();
  const [dataTransferredIn, setDataTransferredIn] = useState<any[]>([])
  const [dataTransferredOut, setDataTransferredOut] = useState<any[]>([])
  const [dataReferral, setDataReferral] = useState<any[]>([])
  const [dataDoHome, setDataDoHome] = useState<any[]>([])
  const [dataDied, setDataDied] = useState<any[]>([])
  const [dataStaff, setDataStaff] = useState<any[]>()
  const [danhSachTangGiam, setDanhSachTangGiam] = useState<any[]>([])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number, itemList: any[], setData: any) => {
    const { value, name } = e?.target;
    const updatedItem = {
      ...itemList[index],
      [name]: value,
    };
    itemList[index] = updatedItem;
    setData([...itemList]);
  }, []);

  useEffect(() => {
    if (dataReport) {
      setDataTransferredIn(dataReport.benhNhanChuyenDen || [])
      setDataTransferredOut(dataReport?.benhNhanChuyenDi || [])
      setDataReferral(dataReport?.benhNhanChuyenTuyen || [])
      setDataDoHome(dataReport?.benhNhanNangXinve || [])
      setDanhSachTangGiam(dataReport?.danhSachTangGiam || [])
      setDataDied(dataReport?.benhNhanTuVong || [])
      setDataStaff(dataStaffReport(dataReport))
    }
  }, [dataReport])


  return (
    <div>
      <div className='department-report table-custom'>
        <h3 className='spaces m-0 text-uppercase color-primary text-center'>Báo cáo thu dung {dataReport?.khoaBaoCao} </h3>
        <Row>
          <Col xs={isReportMonth ? 12 : 9}>
            <TableDetailCollectionReport
              data={danhSachTangGiam}
            />
          </Col>
          {
            !isReportMonth &&
            <Col xs={3}>
              <TableStaffCollectionReport
                handleChange={handleChange}
                dataStaff={dataStaff}
                setData={setDataStaff}
              />
            </Col>
          }
        </Row>

        {
          !isReportMonth &&
          <>
            <div className='mt-4 table-bao-cao'>
              <h3 className='spaces m-0 py-4 text-uppercase color-primary text-center'>danh sách bênh nhân chuyển đến</h3>
              <TableCustom
                id="profile1"
                data={dataTransferredIn}
                columns={ColumnStaff({ isTransferredIn: true })}
                buttonAdd={false}
                buttonExportExcel={false}
                notDelete={false}
                justFilter={true}
                fixedColumnsCount={3}
                noPagination={true}
                updatePageData={() => { }}
              />
            </div>

            <div className='mt-4 table-bao-cao'>
              <h3 className='spaces m-0 py-4 text-uppercase color-primary text-center'>danh sách bênh nhân chuyển đi</h3>
              <TableCustom
                id="profile2"
                data={dataTransferredOut}
                columns={ColumnStaff({ isTransferredOut: true })}
                buttonAdd={false}
                buttonExportExcel={false}
                notDelete={false}
                justFilter={true}
                fixedColumnsCount={3}
                noPagination={true}
                updatePageData={() => { }}
              />
            </div>

            <div className='mt-4 table-bao-cao'>
              <h3 className='spaces m-0 py-4 text-uppercase color-primary text-center'>danh sách bênh nhân chuyển tuyến</h3>
              <TableCustom
                id="profile3"
                data={dataReferral}
                columns={ColumnStaff({ isReferral: true })}
                buttonAdd={false}
                buttonExportExcel={false}
                notDelete={false}
                justFilter={true}
                fixedColumnsCount={3}
                noPagination={true}
                updatePageData={() => { }}
              />
            </div>

            <div className='mt-4 table-bao-cao'>
              <h3 className='spaces m-0 py-4 text-uppercase color-primary text-center'>danh sách bênh nhân nặng xin về</h3>
              <TableCustom
                id="profile4"
                data={dataDoHome}
                columns={ColumnStaff({ isDoHome: true })}
                buttonAdd={false}
                buttonExportExcel={false}
                notDelete={false}
                justFilter={true}
                fixedColumnsCount={3}
                noPagination={true}
                updatePageData={() => { }}
              />
            </div>

            <div className='mt-4 table-bao-cao'>
              <h3 className='spaces m-0 py-4 text-uppercase color-primary text-center'>danh sách bênh nhân tử vong</h3>
              <TableCustom
                id="profile5"
                data={dataDied}
                columns={ColumnStaff({ isDied: true })}
                buttonAdd={false}
                buttonExportExcel={false}
                notDelete={false}
                justFilter={true}
                fixedColumnsCount={3}
                noPagination={true}
                updatePageData={() => { }}
              />
            </div>
          </>
        }
      </div>
    </div>

  )
}

export default DepartmentCollectionReport