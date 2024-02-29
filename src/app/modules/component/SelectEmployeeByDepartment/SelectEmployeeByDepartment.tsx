import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { DepartmentTable, EmployeeForDepartmentTable, EmployeeSelectedTable } from "./partials";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { removeChecked } from "./utils/common";
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG";
import { TYPE } from "../../utils/Constant";

interface IProps {
  handleClose: () => void;
  open: boolean;
  setParentSelectedData: (data: any[]) => void;
  parentSelectedData: any[];
  title: string;
}

const SelectEmployeeByDepartment: FC<IProps> = (props) => {
  const { handleClose, open, setParentSelectedData, parentSelectedData, title } = props;
  const { lang } = useMultiLanguage();

  const [department, setDepartment] = useState<any>({});
  const [isSwitchTableSelect, setIsSwitchTableSelect] = useState<boolean>(false);
  const [isFilterEmployee, setIsFilterEmployee] = useState<boolean>(false);
  const [employeeAddTemp, setEmployeeAddTemp] = useState<any[]>([]);
  const [employeeRemoveTemp, setEmployeeRemoveTemp] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [resetSelectedRows, setResetSelectedRows] = useState<boolean>(false);

  useEffect(() => {
    if (parentSelectedData?.length > 0) {
      setSelectedData(parentSelectedData);
    }
  }, [parentSelectedData]);

  const handleSelectDepartment = (row: any) => {
    setDepartment(row);
    setIsSwitchTableSelect(true);
  };

  const hanldeBtnBackClick = () => {
    setIsSwitchTableSelect(false);
  };

  const handleBtnAddClick = () => {
    if (!(employeeAddTemp?.length > 0)) return;

    let selectedDataConvert = [];
    const departmentExist = selectedData.find((item: any) => item?.phongBanId === department?.id);

    if (departmentExist) {
      selectedDataConvert = selectedData.map((row: any) => {
        let newRow =
          row?.phongBanId === department?.id
            ? {
                ...row,
                listEmployee: removeChecked([
                  ...row.listEmployee,
                  ...employeeAddTemp.filter(
                    (addItem: any) =>
                      !row.listEmployee.some(
                        (oldItem: any) =>
                          addItem?.id === oldItem?.id ||
                          (typeof addItem?.employeeId === TYPE.STRING && addItem?.employeeId === oldItem?.employeeId)
                      )
                  )
                ])
              }
            : row;
        return newRow;
      });
    } else {
      selectedDataConvert = [
        ...selectedData,
        {
          phongBanText: department?.name || "",
          phongBanId: department?.id || "",
          listEmployee: [...removeChecked(employeeAddTemp)]
        }
      ];
    }

    setSelectedData([...selectedDataConvert]);
    setEmployeeAddTemp([]);
    setIsFilterEmployee(!isFilterEmployee);
    setIsSwitchTableSelect(false);
    setResetSelectedRows(!resetSelectedRows);
  };

  const handleBtnRemoveClick = () => {
    if (!(employeeRemoveTemp?.length > 0)) return;

    const newSelectedData = selectedData.map((row: any) => {
      if (row?.isParentChecked) return null;
      return {
        ...row,
        listEmployee: (row?.listEmployee || []).filter(
          (oldItem: any) =>
            !employeeRemoveTemp?.some(
              (removeItem: any) =>
                oldItem?.id === removeItem?.id ||
                (typeof oldItem?.employeeId === TYPE.STRING && oldItem?.employeeId === removeItem?.employeeId)
            )
        )
      };
    });

    setSelectedData(newSelectedData.filter((item: any) => item !== null));
    setEmployeeRemoveTemp([]);
    setIsFilterEmployee(!isFilterEmployee);
    setResetSelectedRows(!resetSelectedRows);
  };

  const handleResetSelectedData = () => {
    setSelectedData([]);
    setIsFilterEmployee(!isFilterEmployee);
    setParentSelectedData([]);
  };

  const handleSaveParentDataSelected = () => {
    if (!(selectedData?.length > 0)) return toast.warning(lang("TOAST.SELECT_EMPLOYEE"));

    setParentSelectedData([...selectedData]);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      size="xl"
      centered
      className="modal-size-custom custom-modal"
    >
      <Modal.Header
        closeButton
        className="bg-primary"
      >
        <Modal.Title className="spaces fs-20 text-white fw-500">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-y-auto">
        <div className="grid grid-cols-11 gap-rem-1.2">
          <div className="col-span-5 flex flex-middle">
            {isSwitchTableSelect && (
              <button
                onClick={hanldeBtnBackClick}
                className="btn-reset"
              >
                <KTSVG
                  path="/media/icons/back.svg"
                  svgClassName="svg-icon-md"
                />
              </button>
            )}
            <h5 className="text-center spaces fs-18 mb-0 flex-1">
              {!isSwitchTableSelect ? (
                <span className="text-uppercase">{lang("GENERAL.DEPARTMENT_LIST")}</span>
              ) : (
                department?.name
              )}
            </h5>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-5 flex flex-middle">
            <h5 className="text-center spaces fs-18 text-uppercase mb-0 flex-1">
              {lang("GENERAL.EMPLOYEE_LIST_SELECTED")}
            </h5>
            {selectedData.length > 0 && (
              <button
                className="btn-reset"
                onClick={handleResetSelectedData}
              >
                <KTSVG
                  path="/media/icons/reset.svg"
                  svgClassName="svg-icon-md"
                />
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-11 gap-rem-1.2">
          <div className="col-span-5">
            <div className={`w-full ${isSwitchTableSelect && "hidden"}`}>
              <DepartmentTable handleSelect={handleSelectDepartment} />
            </div>
            <div className={`w-full ${!isSwitchTableSelect && "hidden"}`}>
              <EmployeeForDepartmentTable
                departmentInfo={department}
                setDataChecked={setEmployeeAddTemp}
                selectedData={selectedData}
                isEnableFilterData={isFilterEmployee}
                resetSelectedRows={resetSelectedRows}
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex-column flex-center h-full">
              <Button
                className="button-primary"
                onClick={handleBtnRemoveClick}
                disabled={!(employeeRemoveTemp?.length > 0)}
              >
                <KTSVG
                  path="/media/icons/arrow-long-left.svg"
                  className="svg-icon-1"
                />
              </Button>
              <Button
                className="button-primary"
                onClick={handleBtnAddClick}
                disabled={!(employeeAddTemp?.length > 0)}
              >
                <KTSVG
                  path="/media/icons/arrow-long-right.svg"
                  className="svg-icon-1"
                />
              </Button>
            </div>
          </div>
          <div className={`col-span-5 spaces ${employeeAddTemp.length > 0 ? "mt-34" : "mt-13"}`}>
            <EmployeeSelectedTable
              setSelectedData={setSelectedData}
              selectedData={selectedData}
              setDataChecked={setEmployeeRemoveTemp}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          className="btn btn-secondary btn-sm"
          onClick={handleClose}
        >
          {lang("BTN.CANCEL")}
        </Button>
        <Button
          className="btn btn-primary btn-sm"
          type="submit"
          onClick={handleSaveParentDataSelected}
        >
          {lang("BTN.SAVE")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SelectEmployeeByDepartment;
