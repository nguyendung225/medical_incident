import { useIntl } from "react-intl";
import "./style.scss";
import { useEffect, useState } from "react";
import { downLoadFileById, fileUpload } from "../../utils/FileServices";
import { toast } from "react-toastify";
import { actualFileType } from "./constant";
import clsx from "clsx";

export interface IFile {
  id: string;
  name: string;
}

type IProps = {
  label: string;
  required?: boolean;
  setValue: (data: IFile) => void;
  fileValue: IFile;
  allowFileTypes: string;
  errors?: string;
  isReadOnly?: boolean;
};

function UploadFile(props: IProps) {
  const { label, required, setValue, fileValue, errors, allowFileTypes } = props;
  const intl = useIntl();
  const [selectedFile, setSelectedFile] = useState<IFile>({} as IFile);
  const allowedFileTypes = allowFileTypes.split(",").map((type) => type.trim());

  useEffect(() => {
    setSelectedFile(fileValue);
  }, [fileValue])

  const onChange = async (e: any) => {
    let file = e.target.files[0];
    if(file) {
      const isValidMaxSize = file.size > 10048576;
      const isValidFileType = actualFileType.find((item) => allowedFileTypes.includes(item.id) && item.value === file.type);
      if (!isValidFileType) {
        toast.error(intl.formatMessage({ id: "TOAST.ERROR.FORMAT.FILE" }));
        return;
      }
      if (isValidMaxSize) {
        toast.error(intl.formatMessage({ id: "TOAST.ERROR.LARGE.FILE" }))
        return;
      }
      try {
        const { data: { data }} = await fileUpload(file);
        const fileObject : IFile = {
          id: data?.id,
          name: data?.name
        };
        setSelectedFile(fileObject);
        setValue(fileObject);
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    }
  };
  const handleDownLoadFile = async (file: IFile) => {
    try {
      const res = await downLoadFileById(file.id);
      const url = window.URL.createObjectURL(new Blob([res?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" })); 
    }
  };

  return (
    <>
      <div className="text-lable-input lable mb-2">
        <span>{intl.formatMessage({ id: label })}</span>
        {required && <span className="color-red"> *</span>}
      </div>
      <div className={clsx(
        "custom-file-upload",
        { "form-control is-invalid": errors }
      )}>
        <label>
          <input type="file" onChange={onChange} accept={allowFileTypes} readOnly={props?.isReadOnly} disabled={props?.isReadOnly} />
          <i className="fa fa-cloud-upload text-primary me-1" />{intl.formatMessage({ id: "SELECT.FILE" })}
          <span className="file-preview">
            {selectedFile?.name?.length < 15
              ? selectedFile?.name
              : selectedFile?.name?.slice(0, 15) + "..."}
          </span>
        </label>
        <div
          className={clsx(
            "bi bi-download",
            { "cursor-pointer": !props?.isReadOnly && selectedFile.id}
          )}
          onClick={() => !props?.isReadOnly && selectedFile.id && handleDownLoadFile(selectedFile)}
        ></div>
      </div>
      {errors && <div className='invalid-feedback'>{errors}</div>
      }
    </>
  );
}

export default UploadFile;
