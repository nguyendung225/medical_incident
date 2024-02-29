import ImageUpload from "../../component/ImageUpload/ImageUpload";
import { EmployeeProfile } from "../models/ProfileModels";
import { FILE_TYPE } from "../../component/FileUpload/constant";
import moment from "moment";
import { LIST_STATUS_NV } from "../const/DialogChildConstants";

interface Props {
  isView: boolean;
  handleUploadAvatar?: (url: string) => void | undefined;
  employeeProfiles: EmployeeProfile | null;
}

function EmployeeInfo(props: Props) {
  const { isView, handleUploadAvatar, employeeProfiles } = props;

  return (
    <div className="w-full">
      <div className="user-info flex-column justify-content-center flex-middle w-full">
        <div className="profile-avatar flex justify-content-center flex-middle">
          <ImageUpload
            view={isView}
            handleUploadAvatar={handleUploadAvatar}
            url={employeeProfiles?.photo || ""}
            allowFileTypes={`${FILE_TYPE.JPEG},${FILE_TYPE.JPG},${FILE_TYPE.PNG}`}
          />
        </div>
        <div className="user-info-basic flex-column justify-content-center flex-middle">
          <div className="name">{employeeProfiles?.name}</div>
          <div className="code">{employeeProfiles?.maNhanVien || ""}</div>
          <div className="employee-status flex justify-content-center flex-middle">
            <div className={`dot ${LIST_STATUS_NV.find(status => status.code === employeeProfiles?.trangThaiLaoDong?.code)?.backgound}`}></div>
            <div className="status-name">{employeeProfiles?.trangThaiLaoDong?.name || ""}</div>
          </div>
        </div>
      </div>
      <div className="information w-100">
        <ul className="w-100 p-0 m-0 flex-column list">
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-70">Ngày sinh : </div>
            <div className="value flex-1">
              {employeeProfiles?.birthDate ? moment(employeeProfiles?.birthDate).format("DD/MM/YYYY") : ""}
            </div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-65">Giới tính : </div>
            <div className="value flex-1">{employeeProfiles?.gender?.name}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-65">Nơi sinh : </div>
            <div className="value flex-1">{employeeProfiles?.noiSinh}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-60">ĐTDĐ :</div>
            <div className="value flex-1">{employeeProfiles?.phone}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-60">CCCD : </div>
            <div className="value flex-1">{employeeProfiles?.soCMNDOrCCCD}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-80">Chức vụ : </div>
            <div className="value flex-1">{employeeProfiles?.chucVu?.value}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-60">Chức danh :</div>
            <div className="value flex-1">{employeeProfiles?.viTriCongViecText}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-80">Khoa phòng : </div>
            <div className="value flex-1">{employeeProfiles?.phongBanText}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-90">Ngày thử việc : </div>
            <div className="value flex-1">{employeeProfiles?.ngayThuViec}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-105">Ngày chính thức : </div>
            <div className="value flex-1">{employeeProfiles?.ngayChinhThuc}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-90">Tính chất LĐ : </div>
            <div className="value flex-1">{employeeProfiles?.tinhChatLaoDong?.name}</div>
          </li>
          <li className="flex color-primary justify-content-between">
            <div className="spaces label w-90">Tên tài khoản : </div>
            <div className="value flex-1">{employeeProfiles?.username}</div>
          </li>
          <li className="flex">
            <div className="adjust-btn fit-content my-0 mx-auto flex justify-content-center flex-middle cursor-pointer">
              <i className="bi-pencil"></i>
              Tùy chỉnh
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EmployeeInfo;
