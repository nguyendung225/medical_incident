import React from 'react'
import TableGrouping, { IColumns } from '../../../component/TableGrouping/TableGrouping'
import TextValidator from '../../../component/input-field/TextValidator';

type Props = {
    handleChange: any;
    dataStaff: any;
    setData: any
}

function TableStaffCollectionReport(props: Props) {
    const { dataStaff, handleChange, setData } = props
    const comlumns: IColumns[] = [
        {
            name: "Nhân viên",
            field: "",
            child: [
                {
                    name: "",
                    field: "loai",
                    headerStyle: {
                        minWidth: "150px"
                    },
                    render: (row: any) => <b>{row?.loai}</b>
                },
                {
                    name: "BS",
                    field: "bs",
                    headerStyle: {
                        minWidth: "40px"
                    },
                },
                {
                    name: "ĐDV",
                    field: "ddv",
                    headerStyle: {
                        minWidth: "40px"
                    },
                },
            ]
        },
    ];
    return (
        <div className='spaces table-bao-cao'>
            <TableGrouping
                columns={comlumns || []}
                data={dataStaff}
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

export default TableStaffCollectionReport