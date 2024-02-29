import { useContext, useEffect, useState } from "react";
import TableCustom, { columnNamesType } from "../../table-custom/TableCustom";
import { toast } from "react-toastify";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE, TYPE } from "../../../utils/Constant";
import { searchAllEmployee } from "../../../profile/services/ProfileServices";
import { removeChecked } from "../utils/common";
import AppContext from "../../../../AppContext";

interface IProps {
  departmentInfo: any;
  setDataChecked: any;
  selectedData: Array<any>;
  isEnableFilterData: boolean;
  resetSelectedRows: boolean;
}

function EmployeeForDepartmentTable(props: IProps) {
  const { departmentInfo, setDataChecked, selectedData, isEnableFilterData, resetSelectedRows } = props;
  const { lang } = useMultiLanguage();
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [prevEmployeeList, setPrevEmployeeList] = useState<any[]>([]);
  const { setPageLoading } = useContext(AppContext);

  useEffect(() => {
    filterDataExist(prevEmployeeList);
  }, [isEnableFilterData]);

  useEffect(() => {
    searchAllEmployeeByDepartment();
  }, [departmentInfo]);

  const searchAllEmployeeByDepartment = async () => {
    if (!departmentInfo?.id) return;

    try {
      setPageLoading(true);
      const searchObj = {
        ...SEARCH_OBJECT_MAX_SIZE,
        phongBanId: departmentInfo?.id || ""
      };
      const { data } = await searchAllEmployee(searchObj);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        filterDataExist(data?.data?.content || []);
        setPrevEmployeeList(data?.data?.content || []);
      }
      setPageLoading(false);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const filterDataExist = (data: any[]) => {
    const currentDepartmentData = selectedData?.find((item) => item?.phongBanId === departmentInfo?.id);
    const filteredData = currentDepartmentData
      ? data?.filter(
          (item: any) =>
            !currentDepartmentData?.listEmployee?.some(
              (departmentItem: any) => departmentItem.id === item?.id || departmentItem?.employeeId === item?.id
            )
        )
      : data;

    setEmployeeList(removeChecked(filteredData));
  };

  const columns: columnNamesType[] = [
    {
      name: lang("INPUT.CODE"),
      field: "custom",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
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
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      name: lang("GENERAL.EMPLOYEE.TITLE"),
      field: "viTriCongViecText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        textAlign: "left"
      }
    }
  ];

  return (
    <div className="table-modal-h">
      <TableCustom
        data={employeeList}
        columns={columns}
        updatePageData={searchAllEmployeeByDepartment}
        type={TYPE.MULTILINE}
        noPagination
        noToolbar
        notDelete
        setDataChecked={setDataChecked}
        // resetSelectedRows={resetSelectedRows}
      />
    </div>
  );
}

export default EmployeeForDepartmentTable;
