import { FC, useEffect, useState } from "react";
import { Col, Form, Row, Modal, Button } from "react-bootstrap";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import TableCustom from "../table-custom/TableCustom";
import { TYPE } from "../../utils/Constant";
import { searchByPage as getAllProfile } from "../../profile/services/ProfileServices";
import { toast } from "react-toastify";
import { LIST_STATUS_NV, STATUS_NV } from "../../profile/const/DialogChildConstants";
import { formatDateTable } from "../../utils/FunctionUtils";
import InputSearch from "../input-field/InputSearch";

interface IProps {
  handleClose: () => void;
  listChecked: any[];
  setListChecked: (values: any) => void;
}
const MultiSelectEmployee: FC<IProps> = (props) => {
  const { handleClose, listChecked, setListChecked } = props;
  const { lang } = useMultiLanguage();
  const [listEmployee, setListEmployee] = useState<any[]>([]);
  const [searchObject, setSearchObject] = useState<any>({})
  const [dataChecked, setDataChecked] = useState<any[]>(listChecked);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);

  const handleSubmit = async () => {
    const uncheckedData = dataChecked.map((employee) => ({
      ...employee,
      isChecked: false
    }));
    setListChecked(uncheckedData);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchObject({
      ...searchObject,
      keyword: e.target?.value
    })
  }

  const handleSearch = (data: any = {}) => {
    const { pageIndex, pageSize, keyword } = searchObject;
    const dataSearch: any = {
      pageIndex,
      pageSize,
      keyword,
      ...data
    }
    dataSearch.keyword = dataSearch?.keyword?.trim() || ""
    updatePageData(dataSearch)
  }

  const updatePageData = async (searchObject: any) => {
    try {
      setSearchObject({ ...searchObject })
      const { data } = await getAllProfile(searchObject);
      const employeeData = data?.data?.content || []
      setListEmployee(employeeData);
      setTotalPage(data?.data?.totalPages);
      setTotalElements(data?.data?.totalElements);
      setNumberOfElements(data?.data?.numberOfElements);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  }

  const checkStatus = (code: number) => {
    const status = LIST_STATUS_NV.find((status: any) => status?.code === code)
    return status?.backgound ? status?.backgound : ""
  }

  useEffect(() => {
    if (listEmployee?.length > 0) {
      listEmployee?.map((employee: any) => {
        let index = dataChecked.findIndex((item: any) => item?.id === employee?.id)
        employee.isChecked = index > -1
      })
    }
  }, [listEmployee])

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: "TT",
      field: "trangThaiLaoDong",
      cellStyle: {
        textAlign: "center",
      },
      render: (row: any, index: number) => <div>
        <div className={` status ${checkStatus(Number(row?.trangThaiLaoDong) || STATUS_NV.DANG_LAM_VIEC)}`}></div>
      </div>
    },
    {
      name: lang("PROFILE.CODE"),
      field: "maNhanVien",
      headerStyle: {
        minWidth: "120px"
      },
      render: (row: any) => <span className="color-steel-blue fw-600">{row?.maNhanVien}</span>
    },
    {
      name: lang("PROFILE.NAME"),
      field: "name",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: lang("PROFILE.GENDER"),
      field: "gender",
      headerStyle: {
        minWidth: "80px"
      },
      render: (row: any) => <span>{row?.gender?.name}</span>
    },
    {
      name: lang("PROFILE.BIRTHDAY"),
      field: "birthDate",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any) => <span>{formatDateTable(row?.birthDate)}</span>
    },
    {
      name: lang("PROFILE.PHONE"),
      field: "phone",
      headerStyle: {
        minWidth: "100px"
      },
      cellStyle: {
        minWidth: "100px",
        textAlign: "left",
      },
    },
    {
      name: lang("INFO.IDENTIFICATION"),
      field: "soCMNDOrCCCD",
      headerStyle: {
        minWidth: "100px"
      },
      cellStyle: {
        minWidth: "100px",
        textAlign: "left",
      },
    },
    {
      name: lang("INPUT.SALARY.DEPARTMENT"),
      field: "phongBanText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: lang("PROFILE.POSITION"),
      field: "viTriCongViecText",
      headerStyle: {
        minWidth: "250px"
      },
      cellStyle: {
        minWidth: "250px",
        textAlign: "left",
      },
    },
    {
      name: lang("INPUT.WORKPROCESS.JOBTITLE"),
      field: "chucVuText",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        textAlign: "left",
      },
    },
  ]

  return (
    <Modal show={true} onHide={handleClose} size="xl" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {lang("SELECT.EMPLOYEE")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <div className="spaces mr-10 flex-1">
                <InputSearch
                  className='border-3px'
                  value={searchObject?.keyword}
                  placeholder="Nhập vào đây"
                  isEnter={true}
                  handleSearch={handleSearch}
                  handleChange={handleChange} />
              </div>
            </Col>
            <Col xs={12}>
              <TableCustom
                id="profile"
                data={listEmployee}
                columns={columns}
                updatePageData={updatePageData}
                type={TYPE.MULTILINE}
                fixedColumnsCount={4}
                notDelete={true}
                notEdit={true}
                totalPages={totalPage}
                totalElements={totalElements}
                numberOfElements={numberOfElements}
                dataChecked={dataChecked}
                setDataChecked={setDataChecked}
                unSelectedAll={true}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="btn btn-secondary  btn-sm"
            onClick={handleClose}
          >
            {lang("BTN.CANCEL")}
          </Button>
          <Button className="btn btn-primary btn-sm" type="submit">

            {lang("BTN.SAVE")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export { MultiSelectEmployee };
