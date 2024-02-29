import { useContext, useState } from "react";
import TableCustom, { columnNamesType } from "../../table-custom/TableCustom";
import { toast } from "react-toastify";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { searchPhongBan } from "../../../profile/services/DialogServices";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE } from "../../../utils/Constant";
import AppContext from "../../../../AppContext";

interface Iprops {
  handleSelect: (row: any) => void;
}

function DepartmentTable(props: Iprops) {
  const { lang } = useMultiLanguage();
  const { handleSelect } = props;
  const [departmentList, setDepartmentList] = useState([]);
  const { setPageLoading } = useContext(AppContext);

  const getDepartmentData = async () => {
    try {
      setPageLoading(true);
      const { data } = await searchPhongBan(SEARCH_OBJECT_MAX_SIZE);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        setDepartmentList(data?.data?.content || []);
      }
      setPageLoading(false);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const columns: columnNamesType[] = [
    {
      name: lang("TABLE.INDEX"),
      field: "stt",
      headerStyle: {
        minWidth: "50px"
      },
      render: (row: any, index: number, STT: number) => <span>{STT}</span>
    },
    {
      name: lang("GENERAL.OFFICE"),
      field: "name",
      headerStyle: {
        minWidth: "300px"
      },
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      name: lang("GENERAL.ACTION"),
      field: "name",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row) => (
        <button
          className="btn button-primary-outline btn-sm"
          onClick={() => handleSelect(row)}
        >
          {lang("BTN.SELECT")}
        </button>
      )
    }
  ];

  return (
    <div className="table-modal-h">
      <TableCustom
        data={departmentList}
        columns={columns}
        updatePageData={getDepartmentData}
        noPagination
        noToolbar
      />
    </div>
  );
}

export default DepartmentTable;
