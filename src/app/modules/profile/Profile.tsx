import React, { FC, useContext, useEffect, useState } from "react";
import "../styles/index.scss";
import { exportHoSo } from "../utils/ExportExcelServices";
import { convertSearch, exportToExcel, formatDateTable, hasRole } from "../utils/FunctionUtils";
import { IItemSearch, ProfileInfo } from "./models/ProfileModels";
import "./profile.scss";
import { getAllDonVi, searchAllEmployee } from "./services/ProfileServices";
import { Col, Row } from "react-bootstrap";
import InputSearch from "../component/input-field/InputSearch";
import SelectTree from "../component/SelectTree";
import { DON_VI_PHONG_BAN, FIELD_SEARCH, INIT_INPUT_SEARCH } from "./const/ProfileConst";
import { KTSVG } from "../../../_metronic/helpers";
import TableCustom from "../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE, TYPE } from "../utils/Constant";
import { LIST_STATUS_NV } from "./const/DialogChildConstants";
// import AdvancedSearch from "./component/Dialog/AdvancedSearch";
import { ProfileAddAndUpdate } from "./ProfileAddAndUpdate";
import { searchPhongBanNhanVien } from "./services/DialogServices";
import { TYPE_CATEGORY } from "../constant";
import useMultiLanguage from "../../hook/useMultiLanguage";
import { ROLE } from "../../Constant";
import AppContext from "../../AppContext";

import { useAuth } from "../auth";
import AdvancedSearch from "../component/AdvancedSearch";
export const ProfileContext = React.createContext(() => { });
const Profile: FC = () => {
  const [shouldOpenDialog, setShouldOpenDialog] = useState<boolean>(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<ProfileInfo[]>([]);
  const [isViewProfiles, setIsViewProfiles] = useState<boolean>(false);
  const [idEmployee, setIdEmployee] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [listInputSearch, setListInputSearch] = useState<any[]>([INIT_INPUT_SEARCH])
  const [searchObject, setSearchObject] = useState<any>({})
  const [listTreeSelect, setListTreeSelect] = useState<any>([])
  const [dataChecked, setDataChecked] = useState([]);
  const [codeCollapses, setCodeCollapses] = useState<string[]>([]);
  const [idSelected, setIdSelected] = useState<string>("");
  const { lang } = useMultiLanguage();
  // const { setPageLoading } = useContext(AppContext);
  const { currentUser } = useAuth()

  const showNameTitle = (row: any = null) => {
    if (row?.id) {
      document.title = `${row.maNhanVien ? row.maNhanVien + "-  " : ""} ${row.name}`;
    } else {
      document.title = `${lang('GENERAL.APP.NAME')} | ${lang('GENERAL.PROFILE')}`;
    }
  }

  useEffect(() => {
    showNameTitle()
  }, [])

  const handleOpenDialog = (row?: any): void => {
    showNameTitle(row)

    setIsViewProfiles(row?.id ? true : false);
    setIdEmployee(row?.id ? row?.id : "");
    setShouldOpenDialog(true);
  };
  const handleOpenAddNewDialog = () => {
    setIdEmployee("");
    setIsViewProfiles(false);
    setShouldOpenDialog(true);
  };
  const handleCloseDialog = (): void => {
    setShouldOpenDialog(false);
    showNameTitle();

  };
  const handleToggleIsView = () => {
    setIsViewProfiles(!isViewProfiles);
  };

  const updatePageData = async (searchObject: any) => {
    setSearchObject({ ...searchObject })
    // setPageLoading(true);
    let { data } = await searchAllEmployee(searchObject);
    setProfiles(data?.data?.content || []);
    setTotalPage(data?.data?.totalPages);
    setTotalElements(data?.data?.totalElements);
    setNumberOfElements(data?.data?.numberOfElements);

    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      setIsAdvancedSearch(false)
    }
    // setPageLoading(false);
  };

  const getPhongBan = async () => {
    let treeSelect: any = []
    let dataDonVi = (await getAllDonVi(SEARCH_OBJECT_MAX_SIZE))?.data?.data?.content
    let dataPhongBan = (await searchPhongBanNhanVien(SEARCH_OBJECT_MAX_SIZE))?.data?.data

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
          phongBan.total = phongBan?.totalEmployee;
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

  useEffect(() => {
    const handleWindowScroll = () => {
      let mucLucWidth = document.getElementById("profile__table-of-content")?.clientWidth;
      let mucLuc = document.getElementById('table-of-profiles');
      if (window.scrollY >= 80 && mucLuc) {
        mucLuc?.classList.add('fixed');
        mucLuc.style.width = `${mucLucWidth}px`;
      } else if (window.scrollY < 80) {
        mucLuc?.classList.remove('fixed');
      }
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  useEffect(() => {
    setCodeCollapses([
      DON_VI_PHONG_BAN.code,
      ...DON_VI_PHONG_BAN.filter.map((item: any) => item.code),
    ]);
  }, []);

  const handleSearch = (data: any = {}) => {
    const dataSearch: any = {
      ...searchObject,
      ...data
    }

    dataSearch.keyword = dataSearch?.keyword?.trim() || ""
    updatePageData(dataSearch)
  }

  const handleAdvancedSearch = (data: IItemSearch[]) => {
    setListInputSearch(data)
    handleSearch(convertSearch(data))
  }

  const checkStatus = (code: number) => {
    const status = LIST_STATUS_NV.find((status: any) => status?.code === code)
    return status?.backgound ? status?.backgound : ""
  }

  const handleOpenAdvancedSearch = () => {
    setIsAdvancedSearch(true)
  }

  const handelTreeSelect = (item: any) => {
    if (item?.type === TYPE_CATEGORY.donVi) {
      handleSearch({
        pageIndex: 1,
        phongBanId: null,
        donViCongTacId: item?.id
      })
      return;
    }

    if (item?.type === TYPE_CATEGORY.phongBan) {
      handleSearch({
        pageIndex: 1,
        donViCongTacId: null,
        phongBanId: item?.id
      })
      return;
    }

    handleSearch({
      donViCongTacId: null,
      phongBanId: null,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchObject({
      ...searchObject,
      keyword: e.target?.value
    })
  }

  const handleExportExcel = () => {
    let ids: string[] = [];

    if (dataChecked?.length > 0) {
      dataChecked.forEach((data: any) => {
        data?.id && ids.push(data?.id);
      })
    }
    exportToExcel(() => exportHoSo({ ids, ...searchObject }))
  }

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
        <div data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="right" title={row?.trangThaiLaoDong?.name || "Không có trạng thái"} className={` status cursor-pointer ${checkStatus(Number(row?.trangThaiLaoDong?.code) || 1)}`}></div>
      </div>
    },
    {
      name: "Mã nhân viên",
      field: "maNhanVien",
      headerStyle: {
        minWidth: "120px"
      },
      render: (row: any) => <span className="color-steel-blue fw-600">{row?.maNhanVien}</span>
    },
    {
      name: "Họ và tên",
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
      name: "Giới tính",
      field: "gender",
      headerStyle: {
        minWidth: "80px"
      },
      render: (row: any) => <span>{row?.gender?.name}</span>
    },
    {
      name: "Ngày sinh",
      field: "birthDate",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any) => <span>{formatDateTable(row?.birthDate)}</span>
    },
    {
      name: "Số ĐTDĐ",
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
      name: "CCCD",
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
      name: "Khoa/Phòng",
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
      name: "Chức vụ",
      field: "chucVuText",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        textAlign: "left",
      },
    },
    {
      name: "Chức danh",
      field: "viTriCongViecText",
      headerStyle: {
        minWidth: "250px"
      },
      cellStyle: {
        minWidth: "250px",
        textAlign: "left",
      },
    },
  ]

  return (
    <div className="spaces profile">
      {(!shouldOpenDialog && !hasRole(ROLE.USER)) &&
        <>
          <Row className="spaces my-16">
            <Col xs={7}>
              <h2 className="color-primary text-uppercase flex flex-middle">
                danh sách hồ sơ nhân viên
              </h2>
            </Col>
            <Col xs={5} className="flex">
              <div className="spaces mr-10 flex-1">
                <InputSearch
                  className='border-3px'
                  value={searchObject?.keyword}
                  placeholder="Nhập vào đây"
                  isEnter={true}
                  handleSearch={handleSearch}
                  handleChange={handleChange} />
              </div>
              <button className="spaces button-primary mr-10" onClick={() => handleSearch()}>Tìm kiếm</button>
              <button className="spaces button-primary-outline mr-10" onClick={handleOpenAdvancedSearch}>Tìm nâng cao</button>

              {isAdvancedSearch &&
                <AdvancedSearch
                  open={isAdvancedSearch}
                  listInputSearch={listInputSearch}
                  handleSearch={handleAdvancedSearch}
                  listOption={FIELD_SEARCH}
                  handeleClose={() => setIsAdvancedSearch(false)}
                />
              }
            </Col>
          </Row>
          <Row className="bg-white container-profile">
            <Col xs={2} className="box-shadow-menu spaces p-0">
              <div className="spaces p-10">
                <div className="spaces py-10 flex ">
                  <KTSVG path={"/media/svg/icons/sidebar-reverse.svg"} className='svg-icon-sidebar' />
                  <h2 className="spaces fw-600 pl-8 m-0 ">Đơn vị/Phòng ban</h2>
                </div>
                <InputSearch
                  className='spaces h-30 p-8'
                  value=''
                  placeholder="Đơn vị/phòng ban"
                  handleSearch={() => { }}
                  handleChange={() => { }} />
              </div>
              <div className="spaces pl-4 select-tree">
                <SelectTree
                  codeCollapses={codeCollapses}
                  handleChangeCollapsesCode={setCodeCollapses}
                  idSelected={idSelected}
                  handleChangeSelectId={setIdSelected}
                  // selectTree={DON_VI_PHONG_BAN}
                  selectTree={listTreeSelect}
                  handleRow={handelTreeSelect}
                  isTotal={true}
                />
              </div>
            </Col>
            <Col xs={10} className="spaces pl-0 table-custom">
              <TableCustom
                id="profile"
                data={profiles}
                columns={columns}
                page={searchObject?.pageIndex}
                buttonAdd={true}
                buttonExportExcel={true}
                notDelete={true}
                type={TYPE.MULTILINE}
                fixedColumnsCount={4}
                totalPages={totalPage}
                totalElements={totalElements}
                numberOfElements={numberOfElements}
                updatePageData={handleSearch}
                handleExportExcel={handleExportExcel}
                handleOpenDialog={handleOpenAddNewDialog}
                handleDoubleClick={handleOpenDialog}
                setDataChecked={setDataChecked}
              />
            </Col>
          </Row>
        </>
      }
      {(shouldOpenDialog || hasRole(ROLE.USER)) && (
        <ProfileAddAndUpdate
          handleCloseDialog={handleCloseDialog}
          idEmployee={idEmployee}
          setIdEmployee={setIdEmployee}
          isView={isViewProfiles}
          setIsView={setIsViewProfiles}
          handleToggleIsView={handleToggleIsView}
        />
      )}
    </div>
  );
};
export { Profile };