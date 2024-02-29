import { FC, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AddNewContract } from "./components/AddNewContract";
import "./contract.scss";
import { IContractInfoDto, IContractInfo } from "./services/models/IContract";
import { getListContracts } from "./services/contractServices";
import { toast } from "react-toastify";
import { convertSearch, exportToExcel, formatDateTable, useCustomIntl } from "../utils/FunctionUtils";
import { exportHopDong } from "../utils/ExportExcelServices";
import TableCustom from "../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE, TYPE } from "../utils/Constant";
import { INIT_CONTACT, ListSearch } from "./const/ContractConst";
import { convertDataUI } from "./utils/FunctionUtils";
import { Col, Row } from "react-bootstrap";
import InputSearch from "../component/input-field/InputSearch";
import { DON_VI_PHONG_BAN, INIT_INPUT_SEARCH } from "../profile/const/ProfileConst";
import { IItemSearch } from "../profile/models/ProfileModels";
import { KTSVG } from "../../../_metronic/helpers";
import SelectTree from "../component/SelectTree";
import { TYPE_CATEGORY } from "../constant";
import { getAllDonVi } from "../profile/services/ProfileServices";
import { searchPhongBan } from "../profile/services/DialogServices";
import AppContext from "../../AppContext";
import AdvancedSearch from "../component/AdvancedSearch";
const Contract: FC = () => {
  const intl = useIntl();
  document.title = `${intl.formatMessage({
    id: "GENERAL.APP.NAME",
  })} | ${intl.formatMessage({ id: "GENERAL.CONTRACT" })}`;
  const [shouldOpenAddNewContract, setShouldOpenAddNewContract] = useState<boolean>(false);
  const [viewInfoContract, setViewInfoContract] = useState<boolean>(false);
  const [contractInfo, setContractInfo] = useState<IContractInfo>(INIT_CONTACT);
  const [contracts, setContracts] = useState<IContractInfoDto[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);

  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [searchObject, setSearchObject] = useState<any>({});
  const [listInputSearch, setListInputSearch] = useState<any[]>([INIT_INPUT_SEARCH]);
  const [dataChecked, setDataChecked] = useState([]);
  const [codeCollapses, setCodeCollapses] = useState<string[]>([]);
  const [idSelected, setIdSelected] = useState<string>("");
  const [listTreeSelect, setListTreeSelect] = useState<any>([])
  const { setPageLoading } = useContext(AppContext);

  const updatePageData = async (searchData?: any) => {
    try {
      setPageLoading(true);
      setSearchObject({ ...searchData });
      const { data } = await getListContracts(searchData);
      setPageLoading(false);
      setContracts(data?.data?.content || []);
      setTotalPage(data?.data?.totalPages);
      setTotalElements(data?.data?.totalElements);
      setNumberOfElements(data?.data?.numberOfElements);

      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        setIsAdvancedSearch(false);
      }
    } catch (error) {
      setPageLoading(false);
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  };

  const handleCloseDialog = () => {
    setShouldOpenAddNewContract(false);
    setViewInfoContract(false);
    setContractInfo(INIT_CONTACT);
    updatePageData();
  };

  const handleOpenInfoDialog = (row: any) => {
    setViewInfoContract(true);
    setShouldOpenAddNewContract(true);
    setContractInfo(convertDataUI(row));
  };

  const handleOpenAddNewContract = () => {
    setShouldOpenAddNewContract(true);
  };

  const handleOpenUpdateDialog = () => {
    setViewInfoContract(false);
  };

  const handleCloseUpdateDialog = () => {
    setViewInfoContract(true);
  };

  const handleExportExcel = () => {
    let ids: string[] = [];

    if (dataChecked?.length > 0) {
      dataChecked.forEach((data: any) => {
        data?.id && ids.push(data?.id);
      });
    }
    exportToExcel(() => exportHopDong({ ids, ...searchObject }));
  };

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

  const handleOpenAdvancedSearch = () => {
    setIsAdvancedSearch(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchObject({
      keyword: e.target?.value
    });
  };

  const handleAdvancedSearch = (data: IItemSearch[]) => {
    setListInputSearch(data);
    handleSearch(convertSearch(data));
  };

  useEffect(() => {
    setCodeCollapses([
      DON_VI_PHONG_BAN.code,
      ...DON_VI_PHONG_BAN.filter.map((item: any) => item.code),
    ]);
  }, []);

  const handelTreeSelect = (item: any) => {
    if (item?.type === TYPE_CATEGORY.donVi) {
      handleSearch({ donViCongTacId: item?.id })
      return;
    }

    if (item?.type === TYPE_CATEGORY.phongBan) {
      handleSearch({ phongBanId: item?.id })
      return;
    }

    handleSearch({
      donViCongTacId: null,
      phongBanId: null,
    })
  }

  const getPhongBan = async () => {
    let treeSelect: any = []
    let dataDonVi = (await getAllDonVi(SEARCH_OBJECT_MAX_SIZE))?.data?.data?.content
    let dataPhongBan = (await searchPhongBan(SEARCH_OBJECT_MAX_SIZE))?.data?.data?.content

    dataDonVi?.forEach((donVi: any) => {
      let itemTreeSelect: any = {
        id: donVi?.id,
        code: donVi?.code,
        name: donVi?.name,
        type: TYPE_CATEGORY.donVi
      }
      let filter = dataPhongBan.filter((phongBan: any) => {
        if (phongBan?.unitId === donVi?.id) {
          phongBan.type = TYPE_CATEGORY.phongBan
          return phongBan;
        }
      })
      if (filter?.length > 0) {
        itemTreeSelect.filter = filter
      }
      treeSelect.push(itemTreeSelect)
    });
    setListTreeSelect(treeSelect)
  };

  useEffect(() => {
    getPhongBan()
  }, [])

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: useCustomIntl("CONTRACT.NUMBER"),
      field: "soHopDong",
      headerStyle: {
        minWidth: "120px"
      },
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      name: useCustomIntl("INPUT.CODE_NEW"),
      field: "employeeCode",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        textAlign: "left"
      },
      render: (row: any) => <span className="color-steel-blue fw-600">{row?.employeeCode}</span>
    },
    {
      name: useCustomIntl("CONTRACT.WORKERFULLNAME"),
      field: "tenNguoiLaoDong",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        textAlign: "left"
      }
    },
    {
      name: useCustomIntl("CONTRACT.SIGNINGDATE"),
      field: "ngayKyHopDong",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayKyHopDong)}</span>
    },
    {
      name: useCustomIntl("PROFILE.ROLE"),
      field: "chucVuText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left"
      }
    },
    {
      name: useCustomIntl("INPUT.SALARY.ROLE"),
      field: "chucDanhText",
      headerStyle: {
        minWidth: "250px"
      },
      cellStyle: {
        minWidth: "250px",
        textAlign: "left"
      }
    },
    {
      name: useCustomIntl("INPUT.DEPARTMENTS"),
      field: "phongBanText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left"
      }
    },
    {
      name: useCustomIntl("CONTRACT.TYPE"),
      field: "loaiHopDong",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        textAlign: "left"
      },
      render: (row: any) => <span>{row?.loaiHopDong?.name || ""}</span>
    },
    {
      name: useCustomIntl("CONTRACT.SIGNINGSTATUS"),
      field: "trangThaiKy",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        textAlign: "left"
      },
      render: (row: any) => <span>{row?.trangThaiKy?.name || ""}</span>
    },
    {
      name: useCustomIntl("CONTRACT.STATUS"),
      field: "trangThaiHopDong",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        textAlign: "left"
      },
      render: (row: any) => <span>{row?.trangThaiHopDong?.name}</span>
    }
  ];

  return (
    <div className="spaces mt-16 flex-1">
      {!shouldOpenAddNewContract && (
        <>
          <Row className="spaces mb-16">
            <Col xs={7}>
              <h2 className="color-primary text-uppercase flex flex-middle">{intl.formatMessage({ id: "CONTRACT.ALL" })}</h2>
            </Col>
            <Col
              xs={5}
              className="flex"
            >
              <div className="spaces mr-10 flex-1">
                <InputSearch
                  className="border-3px"
                  value={searchObject?.keyword}
                  placeholder="Nhập vào đây"
                  handleSearch={handleSearch}
                  handleChange={handleChange}
                  isEnter
                />
              </div>
              <button
                className="spaces button-primary mr-10"
                onClick={() => handleSearch()}
              >
                Tìm kiếm
              </button>
              <button
                className="spaces button-primary-outline mr-10"
                onClick={handleOpenAdvancedSearch}
              >
                Tìm nâng cao
              </button>

              {isAdvancedSearch && (
                <AdvancedSearch
                  open={isAdvancedSearch}
                  listInputSearch={listInputSearch}
                  handleSearch={handleAdvancedSearch}
                  listOption={ListSearch()}
                  handeleClose={() => setIsAdvancedSearch(false)}
                />
              )}
            </Col>
          </Row>

          <Row className="bg-white">
            <Col
              xs={2}
              className="box-shadow-menu spaces p-0"
            >
              <div className="spaces p-10">
                <div className="spaces py-10 flex ">
                  <KTSVG
                    path={"/media/svg/icons/sidebar-reverse.svg"}
                    className="svg-icon-sidebar"
                  />
                  <h2 className="spaces fw-600 pl-8 m-0 ">{intl.formatMessage({ id: "GENERAL.UNIT_DEPARTMENT" })}</h2>
                </div>
                <InputSearch
                  className="spaces h-30 p-8"
                  value=""
                  placeholder={intl.formatMessage({ id: "GENERAL.UNIT_DEPARTMENT" })}
                  handleChange={() => { }}
                  handleSearch={() => { }}
                />
              </div>
              <div className="spaces pl-4 select-tree">
                <SelectTree
                  codeCollapses={codeCollapses}
                  handleChangeCollapsesCode={setCodeCollapses}
                  idSelected={idSelected}
                  handleChangeSelectId={setIdSelected}
                  selectTree={listTreeSelect}
                  handleRow={handelTreeSelect}
                />
              </div>
            </Col>
            <Col
              xs={10}
              className="spaces pl-0 table-custom"
            >
              <TableCustom
                id="contracts"
                data={contracts}
                columns={columns}
                updatePageData={updatePageData}
                buttonAdd={true}
                buttonExportExcel={true}
                notDelete={true}
                handleExportExcel={handleExportExcel}
                type={TYPE.MULTILINE}
                fixedColumnsCount={4}
                totalPages={totalPage}
                totalElements={totalElements}
                numberOfElements={numberOfElements}
                handleOpenDialog={handleOpenAddNewContract}
                handleDoubleClick={handleOpenInfoDialog}
                setDataChecked={setDataChecked}
              />
            </Col>
          </Row>
        </>
      )}
      {shouldOpenAddNewContract && (
        <AddNewContract
          view={viewInfoContract}
          contractInfo={contractInfo}
          handleClose={handleCloseDialog}
          handleOpenUpdateDialog={handleOpenUpdateDialog}
          handleCloseUpdateDialog={handleCloseUpdateDialog}
        />
      )}
    </div>
  );
};
export { Contract };
