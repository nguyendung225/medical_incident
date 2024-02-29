import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import TableCustom, { columnNamesType } from "../table-custom/TableCustom";
import { searchAllEmployee } from "../../profile/services/ProfileServices";
import { toast } from "react-toastify";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import InputSearch from "../input-field/InputSearch";
import AppContext from "../../../AppContext";

interface Iprops {
  open: boolean;
  handleClose: () => void;
  handleSaveData: (newData: any) => void;
  dataParent: any[];
}

function SelectEmployeeDialog(props: Iprops) {
  const { open, handleClose, handleSaveData, dataParent } = props;
  const { lang } = useMultiLanguage();

  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [dataSelect, setDataSelect] = useState<any[]>([]);
  const [keyword, setKeyWord] = useState<string>("");
  const { setPageLoading } = useContext(AppContext);

  const updatePageData = async (searchObject: any) => {
    try {
      setPageLoading(true);
      let { data } = await searchAllEmployee(searchObject);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        Array.isArray(data?.data?.content) &&
          data?.data?.content?.forEach((item: any) => {
            if (item?.id === dataParent[0]?.id || item?.id === dataParent[0]?.employeeId) {
              item.isChecked = true;
            }
          });
        setData(data?.data?.content || []);
        setTotalPage(data?.data?.totalPages);
        setTotalElements(data?.data?.totalElements);
        setNumberOfElements(data?.data?.numberOfElements);
      }
      setPageLoading(false);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const handleSaveDataParent = () => {
    if (!(dataSelect?.length > 0)) return toast.warning(lang("TOAST.SELECT_EMPLOYEE"));
    handleSaveData(dataSelect);
    handleClose();
  };

  const handleSearch = () => {
    const searchData = {
      keyword: keyword.trim()
    };
    updatePageData(searchData);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  };

  const columns: columnNamesType[] = [
    {
      name: lang("TABLE.INDEX"),
      field: "index",
      headerStyle: {
        minWidth: 50
      },
      cellStyle: {
        textAlign: "center"
      },
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: lang("INPUT.CODE"),
      field: "maNhanVien",
      headerStyle: {
        minWidth: 80
      },
      cellStyle: {
        textAlign: "center"
      },
      render: (row: any) => <span className="color-steel-blue fw-600">{row?.maNhanVien}</span>
    },
    {
      name: lang("INPUT.FULLNAME"),
      field: "name",
      headerStyle: {
        minWidth: 200
      },
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      name: lang("PROFILE.ROLE"),
      field: "chucVuText",
      headerStyle: {
        minWidth: 250
      },
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      name: lang("GENERAL.EMPLOYEE.TITLE"),
      field: "viTriCongViecText",
      headerStyle: {
        minWidth: 150
      },
      cellStyle: {
        textAlign: "left"
      }
    }
  ];

  return (
    <Modal
      show={open}
      onHide={handleClose}
      centered
      size="xl"
    >
      <Modal.Header
        closeButton
        className="spaces py-12"
      >
        <Modal.Title className="spaces fs-20 fw-600">{lang("SELECT.EMPLOYEE")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="spaces pt-0">
        <div className="flex flex-end">
          <div className="flex spaces pt-16 w-1/2">
            <div className="spaces mr-10 flex-1">
              <InputSearch
                className="border-3px"
                value={keyword}
                placeholder={lang("GENERAL.ENTER_HERE")}
                handleSearch={handleSearch}
                handleChange={handleChangeSearch}
                isEnter
              />
            </div>
            <button
              className="spaces button-primary mr-10"
              onClick={() => handleSearch()}
            >
              {lang("GENERAL.SEARCH")}
            </button>
          </div>
        </div>
        <TableCustom
          data={data}
          columns={columns}
          updatePageData={updatePageData}
          totalPages={totalPage}
          totalElements={totalElements}
          numberOfElements={numberOfElements}
          noToolbar
          type={TYPE.SINGLE}
          notDelete
          setDataChecked={setDataSelect}
        />
      </Modal.Body>
      <Modal.Footer className="flex-center">
        <Button
          variant="outline-secondary"
          className="button-secondary btn-sm"
          onClick={handleClose}
        >
          {lang("BTN.CANCEL")}
        </Button>

        <Button
          variant="primary"
          className="button-primary btn-sm"
          onClick={handleSaveDataParent}
          type="button"
        >
          {lang("BTN.SAVE")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SelectEmployeeDialog;
