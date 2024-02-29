/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ButtonContainer } from "../../component/ButtonContainer";
import { exportGiaDinh } from "../../utils/ExportExcelServices";
import { exportToExcel, useCustomIntl } from "../../utils/FunctionUtils";
import { INIT_RELATIVES_INFO, REF_TAB } from "../const/ProfileConst";
import { IRelativesInfo, IRelativesInfoDto } from "../models/DialogModels";
import "../profile.scss";
import { deleteQuanHeGiaDinh, getAllQuanHeGiaDinhById } from "../services/DialogServices";
import { RelativesDialog } from "./Dialog/RelativesDialog";
import TableCustom from "../../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { toast } from "react-toastify";
import { convertDataFamilyUI } from "../utils/FunctionUtils";
import { KTSVG } from "../../../../_metronic/helpers";

const FamilyInformation = (props: any) => {
  const [shouldOpenRelativesDialog, setShouldOpenRelativesDialog] = useState<boolean>(false);
  const { identify, isView, employeeProfiles, activeTab } = props;
  const [relative, setRelative] = useState<IRelativesInfo>(INIT_RELATIVES_INFO);
  const [listRelative, setListRelative] = useState<IRelativesInfoDto[]>([]);
  const [dataChecked, setDataChecked] = useState<IRelativesInfoDto[]>([]);

  useEffect(() => {
    if (identify && activeTab === REF_TAB.TT_GIA_DINH) {
      updateDataRelatives()
    }
  }, [employeeProfiles, activeTab]);


  const handleCloseRelativesDialog = (): void => {
    updateDataRelatives();
    setRelative(INIT_RELATIVES_INFO);
    setShouldOpenRelativesDialog(false);
  };

  const updateDataRelatives = async () => {
    if (identify) {
      let data = await getAllQuanHeGiaDinhById(identify);
      setListRelative(data?.data?.data);
    }
  };

  const handleOpenDialog = (row: any) => {
    setShouldOpenRelativesDialog(true);
    setRelative(convertDataFamilyUI(row));
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: IRelativesInfoDto) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteQuanHeGiaDinh(ids)
    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      toast.success("Xóa thành công")
      updateDataRelatives()
    }
  }

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: useCustomIntl("INPUT.FAMILY.RELATION"),
      field: "quanHeNV",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        maxWidth: "200px",
        textAlign: "left",
      },
      render: (row: any) => <span className="color-steel-blue fw-600">{row?.quanHeNVText}</span>
    },
    {
      name: useCustomIntl("INPUT.FAMILY.NAME"),
      field: "ten",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: useCustomIntl("INPUT.FAMILY.BIRTH"),
      field: "namSinh",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
      },
    },
    {
      name: useCustomIntl("INPUT.FAMILY.MORE_INFO"),
      field: "moreDetails",
      headerStyle: {
        minWidth: "500px"
      },
      cellStyle: {
        minWidth: "500px",
        textAlign: "left"
      },
      render: (row: any) => {
        const lines = row?.moreDetails ? row?.moreDetails.split('\n') : [];
        return (
          lines.map((line: string, index: number) => (
            <p className="spaces m-0" key={index}>{line}</p>
          ))
        )
      }
    },
    {
      name: useCustomIntl("INPUT.FAMILY.IS_DEATH"),
      field: "isDeadth",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
      },
      render: (row: any) => row?.isDeadth ? <KTSVG path='/media/icons/check.svg' className=' svg-icon-1' /> : ""
    },
    {
      name: useCustomIntl("INPUT.FAMILY.IS_SAME_ORGANIZATION"),
      field: "isSameOrganization",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
      },
      render: (row: any) => row?.isSameOrganization ? <KTSVG path='/media/icons/check.svg' className=' svg-icon-1' /> : ""
    },
    {
      name: useCustomIntl("INPUT.FAMILY.IS_DEPENDENT_PERSON"),
      field: "isDependentPerson",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
      },
      render: (row: any) => row?.isDependentPerson ? <KTSVG path='/media/icons/check.svg' className=' svg-icon-1' /> : ""
    }
  ]

  return (
    <>
      <div className="form-info">
        <div className="block-content">
          <TableCustom
            id="listRelative"
            data={listRelative}
            columns={columns}
            updatePageData={updateDataRelatives}
            type={TYPE.MULTILINE}
            fixedColumnsCount={3}
            noToolbar={true}
            noPagination={true}
            buttonAdd={!isView}
            notDelete={isView}
            buttonExportExcel={true}
            handleDoubleClick={!isView ? handleOpenDialog : () => { }}
            handleOpenDialog={() => setShouldOpenRelativesDialog(true)}
            handleDelete={handleDelete}
            handleExportExcel={() => exportToExcel(() => exportGiaDinh(employeeProfiles.id))}
            setDataChecked={setDataChecked}
            dependencies={activeTab}
          />
        </div>
      </div>
      {shouldOpenRelativesDialog && (
        <RelativesDialog
          handleCloseRelativesDialog={handleCloseRelativesDialog}
          identify={identify}
          isView={isView}
          dataRelativeEdit={relative}
        />
      )}
    </>
  );
};

export default FamilyInformation;
