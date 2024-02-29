import React from 'react'
import TableGrouping, { IColumns } from '../../../component/TableGrouping/TableGrouping'

interface IProps {
    data: any[]
}

function TableDetailCollectionReport(props: IProps) {
    const { data } = props;
    const comlumns: IColumns[] = [
        {
            name: "STT",
            field: "",
            render: (row: any, index: number, stt: number) => <span>{stt}</span>
        },
        {
            name: "Đối tượng",
            field: "doiTuong",
            headerStyle: {
                minWidth: "150px"
            }
        },
        {
            name: "Số cũ",
            field: "soLuongCu",
            headerStyle: {
                minWidth: "80px"
            }
        },
        {
            name: "Số tăng",
            field: "",
            child: [
                {
                    name: "Vào viện",
                    field: "soLuongVaoVien",
                    headerStyle: {
                        minWidth: "80px"
                    }
                },
                {
                    name: "chuyển khoa đến",
                    field: "soLuongChuyenDenKhoa",
                    headerStyle: {
                        minWidth: "150px"
                    }
                },
                {
                    name: "Cộng",
                    field: "tongSoLuongTang",
                    headerStyle: {
                        minWidth: "80px"
                    }
                },
            ]
        },
        {
            name: "Số giảm",
            field: "",
            child: [
                {
                    name: "Ra viện",
                    field: "soLuongRaVien",
                    headerStyle: {
                        minWidth: "80px"
                    }
                },
                {
                    name: "chuyển khoa",
                    field: "soLuongChuyenKhoa",
                    headerStyle: {
                        minWidth: "120px"
                    }
                },
                {
                    name: "Chuyển viện",
                    field: "soLuongChuyenVien",
                    headerStyle: {
                        minWidth: "110px"
                    }
                },
                {
                    name: "Tử vong",
                    field: "soLuongTuVong",
                    headerStyle: {
                        minWidth: "80px"
                    }
                },
                {
                    name: "Khác",
                    field: "soLuongKhac",
                    headerStyle: {
                        minWidth: "80px"
                    }
                },
                {
                    name: "Cộng",
                    field: "tongSoLuongGiam",
                    headerStyle: {
                        minWidth: "80px"
                    }
                },
            ]
        },
        {
            name: "Còn lại",
            field: "tongSoConLai",
            headerStyle: {
                minWidth: "80px"
            }
        },
        {
            name: "Ngày ĐT khỏi TB",
            field: "trungBinhNgayDieuTriKhoi",
            headerStyle: {
                minWidth: "200px"
            }
        },
    ];

    return (
        <div className='table-bao-cao'>
            <TableGrouping
                columns={comlumns || []}
                data={data || []}
                noPagination={true}
                isSingleRow={true}
                firstLevelTitleField="title"
                firstLevelDataField="data"
                secondLevelTitleField="phongBan"
                secondLevelDataField="data"
            />
        </div>
    )
}

export default TableDetailCollectionReport