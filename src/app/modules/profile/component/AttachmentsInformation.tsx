/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { exportTepDinhKem } from '../../utils/ExportExcelServices';
import { exportToExcel, hasAuthority } from '../../utils/FunctionUtils';
import { ITaiLieuDinhKemInfo } from '../models/ProfileModels';
import { deleteTaiLieuDinhKem, getAllTaiLieuDinhKemById } from '../services/DialogServices';
import AttachmentsDialog from './Dialog/AttachmentsDialog';
import TableCustom from '../../component/table-custom/TableCustom';
import { RESPONSE_STATUS_CODE, TYPE } from '../../utils/Constant';
import { toast } from 'react-toastify';
import { REF_TAB } from '../const/ProfileConst';
import { PERMISSIONS, PERMISSION_ABILITY } from '../../../Constant';
import useMultiLanguage from '../../../hook/useMultiLanguage';

export const AttachmentsInformation = (props: any) => {
  const [shouldOpenAttachments, setShouldOpenAttachments] = useState<boolean>(false);
  const { identify, isView, employeeProfiles, activeTab } = props;

  const [attachment, setAttachment] = useState<ITaiLieuDinhKemInfo>({} as ITaiLieuDinhKemInfo);
  const [listAttachment, setListAttachment] = useState<ITaiLieuDinhKemInfo[]>([]);
  const [dataChecked, setDataChecked] = useState<ITaiLieuDinhKemInfo[]>([]);

  const { lang } = useMultiLanguage();

  useEffect(() => {
    if (!(identify && activeTab === REF_TAB.TT_KHAC)) return
    updateDataAttachment();
  }, [employeeProfiles, activeTab])

  const handleOpenAttachments = (data: ITaiLieuDinhKemInfo): void => {
    setAttachment(data)
    setShouldOpenAttachments(true);
  };

  const handleCloseAttachments = (): void => {
    setShouldOpenAttachments(false);
    updateDataAttachment();
    setAttachment({} as ITaiLieuDinhKemInfo);
  };

  const updateDataAttachment = async () => {
    if (identify) {
      try {
        const { data } = await getAllTaiLieuDinhKemById(identify);
        setListAttachment(data?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: ITaiLieuDinhKemInfo) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteTaiLieuDinhKem(ids)
    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      toast.success("Xóa thành công")
      updateDataAttachment()
    }
  }

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: lang("GENERAL.INFO.ATTACHMENTS.NAME"),
      field: "fileName",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        maxWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: lang("GENERAL.INFO.ATTACHMENTS.ALLOW"),
      field: "ngayCap",
      headerStyle: {
        minWidth: "100px"
      },
      cellStyle: {
        minWidth: "100px",
        maxWidth: "100px",
        textAlign: "left",
      },
      render: (row: any) => <span>{row?.choPhepTaiVe ? "Có" : "Không"}</span>
    },
    {
      name: lang("INPUT.CERTIFICATE.NOTE"),
      field: "ghiChu",
      headerStyle: {
        minWidth: "130px"
      },
      cellStyle: {
        minWidth: "130px",
        maxWidth: "130px",
        textAlign: "left",
      },
    },
  ]

  return (
    <>
      <div className="form-info">
        <div className="block-content">
          <TableCustom
            id="listAttachment"
            title={lang("INPUT.VACCINATION.ATTACHMENTS")}
            isActionTableTab
            data={listAttachment}
            columns={columns}
            updatePageData={updateDataAttachment}
            type={TYPE.MULTILINE}
            fixedColumnsCount={2}
            noToolbar={true}
            noPagination={true}
            handleDoubleClick={handleOpenAttachments}
            handleDelete={handleDelete}
            setDataChecked={setDataChecked}
            dependencies={activeTab}
            buttonAdd={!isView && hasAuthority(PERMISSIONS.EMPLOYEE, PERMISSION_ABILITY.UPDATE)}
            buttonExportExcel={hasAuthority(PERMISSIONS.EMPLOYEE, PERMISSION_ABILITY.VIEW)}
            handleOpenDialog={() => setShouldOpenAttachments(true)}
            handleExportExcel={() => exportToExcel(() => exportTepDinhKem(employeeProfiles.id))}
          />
        </div>
        {shouldOpenAttachments && (
          <AttachmentsDialog
            handleCloseAttachmentsDialog={handleCloseAttachments}
            identify={props?.identify}
            isView={isView}
            attachmentEdit={attachment}
          />
        )}
      </div>
    </>
  );
};