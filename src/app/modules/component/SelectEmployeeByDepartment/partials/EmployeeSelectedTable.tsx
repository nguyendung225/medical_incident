import useMultiLanguage from "../../../../hook/useMultiLanguage";
import TableCollapseCustom, { columnNamesType } from "../../../component/table-collapse-custom/TableCollapseCustom";

interface Iprops {
  setSelectedData: any;
  selectedData: Array<any>;
  setDataChecked: any;
}

function EmployeeSelectedTable(props: Iprops) {
  const { lang } = useMultiLanguage();
  const { selectedData, setDataChecked, setSelectedData } = props;

  const columns: columnNamesType[] = [
    {
      name: lang("INPUT.CODE"),
      field: "custom",
      headerCellProps: {
        minWidth: "200px"
      },
      bodyCellProps: {
        textAlign: "left"
      },
      render: (row: any) => (
        <span>
          <p className="color-steel-blue fw-600 spaces p-0 m-0">{row?.maNhanVien}</p>
          <p className="spaces p-0 m-0">{row?.name}</p>
        </span>
      )
    },
    {
      name: lang("INPUT.SALARY.POSITION"),
      field: "chucVuText",
      headerCellProps: {
        minWidth: "200px"
      },
      bodyCellProps: {
        textAlign: "left"
      }
    },
    {
      name: lang("GENERAL.EMPLOYEE.TITLE"),
      field: "viTriCongViecText",
      headerCellProps: {
        minWidth: "200px"
      },
      bodyCellProps: {
        textAlign: "left"
      }
    }
  ];

  return (
    <div className="table-modal-h">
      <TableCollapseCustom
        columnNameList={columns}
        data={selectedData}
        nameParent="phongBanText"
        nameChildren="listEmployee"
        selectData={setDataChecked}
        setData={setSelectedData}
        selectionMode="multiple"
        isSelect={true}
      />
    </div>
  );
}

export default EmployeeSelectedTable;
