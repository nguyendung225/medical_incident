import moment from "moment";
import Autocomplete from "../../component/input-field/Autocomplete";
import { variantStandardStyle } from "../../component/input-field/StyleComponent";
import TextValidator from "../../component/input-field/TextValidator";
import { DOI_TUONG_BENH_NHAN, DON_TIEP_CCCD, GIOI_TINH, HINH_THUC_VAO_KHOA, TUYEN_KHAM_CHUA_BENH, XU_TRI } from "../consts/ReportInputConst";

export const Columns = (props: any) => {
    let {
        checkErrorTable,
        checkTouchedTable,
        clearMessage,
        handleChangeTable,
        handleSelectTable
    } = props;
    return [
        {
            name: "STT",
            field: "",
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => <span>{stt}</span>,
        },
        {
            name: "Mã BN",
            field: "maBenhNhan",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                textAlign: "center",
                minWidth: "150px",
            },

            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => {
                return (
                    <TextValidator
                        className="variant-standard invalid-feedback-table"
                        name="maBenhNhan"
                        defaultValue={row.maBenhNhan || ""}
                        type="text"
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "maBenhNhanMessage")}
                        errors={checkErrorTable(row.maBenhNhanMessage, index, formikTable, "maBenhNhan")}
                        touched={true}
                    />
                )
            }
        },
        {
            name: "Tên bệnh nhân",
            field: "hoTen",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                textAlign: "center",
                minWidth: "150px",
            },

            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => {
                return (
                    <TextValidator
                        className="variant-standard invalid-feedback-table"
                        name="hoTen"
                        defaultValue={row.hoTen || ""}
                        type="text"
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "hoTenMessage")}
                        errors={checkErrorTable(row.hoTenMessage, index, formikTable, "hoTen")}
                        touched={true}
                    />
                )
            }
        },
        {
            name: "Mã viện phí",
            field: "maVienPhi",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                textAlign: "center",
                minWidth: "150px",
            },

            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => {
                return (
                    <TextValidator
                        className="variant-standard invalid-feedback-table"
                        name="maVienPhi"
                        defaultValue={row.maVienPhi || ""}
                        contentEditable={true}
                        type="text"
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "maVienPhiMessage")}
                        errors={checkErrorTable(row.maVienPhiMessage, index, formikTable, "maVienPhi")}
                        touched={true}
                    />
                )
            }
        },
        {
            name: "Đón tiếp CCCD",
            field: "donTiepCanCuocCongDan",
            headerStyle: {
                minWidth: "100px",
            },
            cellStyle: {
                textAlign: "center",
                minWidth: "100px",
            },

            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => {
                return (
                    <div className="h-36">
                    <Autocomplete
                        className="invalid-feedback-table"
                        options={DON_TIEP_CCCD}
                        value={row.donTiepCanCuocCongDan}
                        valueSearch="code"
                        name="donTiepCanCuocCongDan"
                        onChange={(selectedOption) => handleSelectTable("donTiepCanCuocCongDan", selectedOption, index, itemList, "donTiepCanCuocCongDanMessage")}
                        styles={variantStandardStyle("30px")}
                        errors={checkErrorTable(row.donTiepCanCuocCongDanMessage, index, formikTable, "donTiepCanCuocCongDan")}
                        touched={true}
                    />
                </div>
                )
            }
        },
        {
            name: "Số BHYT",
            field: "soBaoHiemYTe",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                textAlign: "center",
                minWidth: "150px",
            },

            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => {
                return (
                    <TextValidator
                        className="variant-standard invalid-feedback-table"
                        name="soBaoHiemYTe"
                        defaultValue={row.soBaoHiemYTe || ""}
                        contentEditable={true}
                        type="text"
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "soBaoHiemYTeMessage")}
                        errors={checkErrorTable(row.soBaoHiemYTeMessage, index, formikTable, "soBaoHiemYTe")}
                        touched={true}
                    />
                )
            }
        },
        {
            name: "CMND/CCCD",
            field: "canCuocCongDan",
            headerStyle: {
                minWidth: "100px",
            },
            cellStyle: {
                minWidth: "100px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="canCuocCongDan"
                    defaultValue={row.canCuocCongDan || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "canCuocCongDanMessage")}
                    errors={checkErrorTable(row.canCuocCongDanMessage, index, formikTable, "canCuocCongDan")}
                    touched={true}
                />
            ),
        },
        {
            name: "Tuyển KCB",
            field: "tuyenKhamChuaBenh",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <div className="h-36">
                    <Autocomplete
                        className="invalid-feedback-table"
                        options={TUYEN_KHAM_CHUA_BENH}
                        value={row.tuyenKhamChuaBenh}
                        valueSearch="code"
                        name="tuyenKhamChuaBenh"
                        onChange={(selectedOption) => handleSelectTable("tuyenKhamChuaBenh", selectedOption, index, itemList, "tuyenKhamChuaBenhMessage")}
                        styles={variantStandardStyle("30px")}
                        errors={checkErrorTable(row.tuyenKhamChuaBenhMessage, index, formikTable, "tuyenKhamChuaBenh")}
                        touched={true}
                    />
                </div>
            ),
        },
        {
            name: "Giới tính",
            field: "gioiTinh",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <div className="h-36">
                    <Autocomplete
                        className="invalid-feedback-table"
                        options={GIOI_TINH}
                        value={row.gioiTinh}
                        name="gioiTinh"
                        valueSearch="code"
                        onChange={(selectedOption) => handleSelectTable("gioiTinh", selectedOption, index, itemList, "gioiTinhMessage")}
                        styles={variantStandardStyle("30px")}
                        errors={checkErrorTable(row.gioiTinhMessage, index, formikTable, "gioiTinh")}
                        touched={true}
                    />
                </div>
            )
        },
        {
            name: "Tuổi",
            field: "tuoi",
            headerStyle: {
                minWidth: "60px",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => <span>{row.tuoi}</span>,
        },
        {
            name: "Tuổi vào viện",
            field: "tuoiVaoVien",
            headerStyle: {
                minWidth: "100px",
            },
            cellStyle: {
                minWidth: "80px",
                textAlign: "center",
            },
            // render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
            //     <TextValidator
            //         className="variant-standard invalid-feedback-table"
            //         name="tuoiVaoVien"
            //         defaultValue={row.tuoiVaoVien || ""}
            //         type="text"
            //         onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "tuoiVaoVienMessage")}
            //         errors={checkErrorTable(row.tuoiVaoVienMessage, index, formikTable, "tuoiVaoVien")}
            //         touched={true}
            //     />
            // ),
        },
        {
            name: "Ngày sinh",
            field: "ngaySinh",
            headerStyle: {
                minWidth: "100px",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => {
                return (
                    <TextValidator
                        className="variant-standard invalid-feedback-table"
                        name="ngaySinh"
                        defaultValue={row.ngaySinh}
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "ngaySinhMessage")}
                        errors={checkErrorTable(row.ngaySinhMessage, index, formikTable, "ngaySinh")}
                        touched={true}
                    />
                )
            }
        },
        {
            name: "Đối tượng",
            field: "doiTuong",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                minWidth: "150px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <div className="h-36">
                    <Autocomplete
                        className="invalid-feedback-table"
                        options={DOI_TUONG_BENH_NHAN}
                        value={row.doiTuong}
                        valueSearch="code"
                        name="doiTuong"
                        onChange={(selectedOption) => handleSelectTable("doiTuong", selectedOption, index, itemList, "doiTuongMessage")}
                        styles={variantStandardStyle("30px")}
                        errors={checkErrorTable(row.doiTuongMessage, index, formikTable, "doiTuong")}
                        touched={true}
                    />
                </div>
            ),
        },
        {
            name: "Phòng điều trị",
            field: "phongDieuTri",
            headerStyle: {
                minWidth: "120px",
            },
            cellStyle: {
                minWidth: "120px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="phongDieuTri"
                    defaultValue={row.phongDieuTri || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "phongDieuTriMessage")}
                    errors={checkErrorTable(row.phongDieuTriMessage, index, formikTable, "phongDieuTri")}
                    touched={true}
                />
            ),
        },
        {
            name: "Buồng điều trị",
            field: "buongDieuTri",
            headerStyle: {
                minWidth: "120px",
            },
            cellStyle: {
                minWidth: "120px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="buongDieuTri"
                    defaultValue={row.buongDieuTri || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "buongDieuTriMessage")}
                    errors={checkErrorTable(row.buongDieuTriMessage, index, formikTable, "buongDieuTri")}
                    touched={true}
                />
            ),
        },
        {
            name: "Giường điều trị",
            field: "giuongDieuTri",
            headerStyle: {
                minWidth: "120px",
            },
            cellStyle: {
                minWidth: "120px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="giuongDieuTri"
                    defaultValue={row.giuongDieuTri || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "giuongDieuTriMessage")}
                    errors={checkErrorTable(row.giuongDieuTriMessage, index, formikTable, "giuongDieuTri")}
                    touched={true}
                />
            ),
        },
        {
            name: "Bác sĩ điều trị",
            field: "bacSiDieuTri",
            headerStyle: {
                minWidth: "120px",
            },
            cellStyle: {
                minWidth: "120px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="bacSiDieuTri"
                    defaultValue={row.bacSiDieuTri || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "bacSiDieuTriMessage")}
                    errors={checkErrorTable(row.bacSiDieuTriMessage, index, formikTable, "bacSiDieuTri")}
                    touched={true}
                />
            ),
        },
        {
            name: "Mã bệnh",
            field: "maBenh",
            headerStyle: {
                minWidth: "120px",
            },
            cellStyle: {
                minWidth: "120px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="maBenh"
                    defaultValue={row.maBenh || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "maBenhMessage")}
                    errors={checkErrorTable(row.maBenhMessage, index, formikTable, "maBenh")}
                    touched={true}
                />
            ),
        },
        {
            name: "Tên bệnh",
            field: "tenBenh",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="tenBenh"
                    defaultValue={row.tenBenh || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "tenBenhMessage")}
                    errors={checkErrorTable(row.tenBenhMessage, index, formikTable, "tenBenh")}
                    touched={true}
                />
            ),
        },
        {
            name: "Mã bệnh kèm theo",
            field: "maBenhKemTheo",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                minWidth: "150px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="maBenhKemTheo"
                    defaultValue={row.maBenhKemTheo || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "maBenhKemTheoMessage")}
                    errors={checkErrorTable(row.maBenhKemTheoMessage, index, formikTable, "maBenhKemTheo")}
                    touched={true}
                />
            ),
        },
        {
            name: "Tên bệnh kèm theo",
            field: "tenBenhKemTheo",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                minWidth: "150px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="tenBenhKemTheo"
                    defaultValue={row.tenBenhKemTheo || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "tenBenhKemTheoMessage")}
                    errors={checkErrorTable(row.tenBenhKemTheoMessage, index, formikTable, "tenBenhKemTheo")}
                    touched={true}
                />
            ),
        },
        {
            name: "Địa chỉ",
            field: "diaChi",
            headerStyle: {
                minWidth: "300px",
            },
            cellStyle: {
                minWidth: "300px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="diaChi"
                    defaultValue={row.diaChi || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "diaChiMessage")}
                    errors={checkErrorTable(row.diaChiMessage, index, formikTable, "diaChi")}
                    touched={true}
                />
            ),
        },
        {
            name: "Họ và tên bố",
            field: "hoTenBo",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                minWidth: "150px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="hoTenBo"
                    defaultValue={row.hoTenBo || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "hoTenBoMessage")}
                    errors={checkErrorTable(row.hoTenBoMessage, index, formikTable, "hoTenBo")}
                    touched={true}
                />
            ),
        },
        {
            name: "SĐT bố",
            field: "soDienThoaiBo",
            headerStyle: {
                minWidth: "100px",
            },
            cellStyle: {
                minWidth: "100px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="soDienThoaiBo"
                    defaultValue={row.soDienThoaiBo || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "soDienThoaiBoMessage")}
                    errors={checkErrorTable(row.soDienThoaiBoMessage, index, formikTable, "soDienThoaiBo")}
                    touched={true}
                />
            ),
        },
        {
            name: "Họ và tên mẹ",
            field: "hoTenMe",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                minWidth: "150px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="hoTenMe"
                    defaultValue={row.hoTenMe || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "hoTenMeMessage")}
                    errors={checkErrorTable(row.hoTenMeMessage, index, formikTable, "hoTenMe")}
                    touched={true}
                />
            ),
        },
        {
            name: "SĐT mẹ",
            field: "soDienThoaiMe",
            headerStyle: {
                minWidth: "100px",
            },
            cellStyle: {
                minWidth: "100px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="soDienThoaiMe"
                    defaultValue={row.soDienThoaiMe || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "soDienThoaiMeMessage")}
                    errors={checkErrorTable(row.soDienThoaiMeMessage, index, formikTable, "soDienThoaiMe")}
                    touched={true}
                />
            ),
        },
        {
            name: "Số điện thoại",
            field: "soDienThoai",
            headerStyle: {
                minWidth: "100px",
            },
            cellStyle: {
                minWidth: "100px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="soDienThoai"
                    defaultValue={row.soDienThoai || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "soDienThoaiMessage")}
                    errors={checkErrorTable(row.soDienThoaiMessage, index, formikTable, "soDienThoai")}
                    touched={true}
                />
            ),
        },
        {
            name: "SĐT người nhà",
            field: "soDienThoaiNguoiNha",
            headerStyle: {
                minWidth: "120px",
            },
            cellStyle: {
                minWidth: "120px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="soDienThoaiNguoiNha"
                    defaultValue={row.soDienThoaiNguoiNha || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "soDienThoaiNguoiNhaMessage")}
                    errors={checkErrorTable(row.soDienThoaiNguoiNhaMessage, index, formikTable, "soDienThoaiNguoiNha")}
                    touched={true}
                />
            ),
        },
        {
            name: "Vào từ khoa",
            field: "vaoTuKhoa",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="vaoTuKhoa"
                    defaultValue={row.vaoTuKhoa || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "vaoTuKhoaMessage")}
                    errors={checkErrorTable(row.vaoTuKhoaMessage, index, formikTable, "vaoTuKhoa")}
                    touched={true}
                />
            ),
        },
        {
            name: "Ngày vào",
            field: "ngayVaoKhoa",
            headerStyle: {
                minWidth: "200px",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="ngayVaoKhoa"
                    defaultValue={row.ngayVaoKhoa}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "ngayVaoKhoaMessage")}
                    errors={checkErrorTable(row.ngayVaoKhoaMessage, index, formikTable, "ngayVaoKhoa")}
                    touched={true}
                />
            )
        },
        {
            name: "Hình thức vào",
            field: "hinhThucVaoKhoa",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <div className="h-36">
                    <Autocomplete
                        className="invalid-feedback-table"
                        options={HINH_THUC_VAO_KHOA}
                        value={row.hinhThucVaoKhoa}
                        valueSearch="code"
                        name="hinhThucVaoKhoa"
                        onChange={(selectedOption) => handleSelectTable("hinhThucVaoKhoa", selectedOption, index, itemList, "hinhThucVaoKhoaMessage")}
                        styles={variantStandardStyle("30px")}
                        errors={checkErrorTable(row.hinhThucVaoKhoaMessage, index, formikTable, "hinhThucVaoKhoa")}
                        touched={true}
                    />
                </div>
            )
        },
        {
            name: "Họ tên người nhà",
            field: "hoTenNguoiNha",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="hoTenNguoiNha"
                    defaultValue={row.hoTenNguoiNha || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "hoTenNguoiNhaMessage")}
                    errors={checkErrorTable(row.hoTenNguoiNhaMessage, index, formikTable, "hoTenNguoiNha")}
                    touched={true}
                />
            ),
        },
        {
            name: "Ngày ra",
            field: "ngayRaKhoa",
            headerStyle: {
                minWidth: "100px",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="ngayRaKhoa"
                    defaultValue={row.ngayRaKhoa}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "ngayRaKhoaMessage")}
                    errors={checkErrorTable(row.ngayRaKhoaMessage, index, formikTable, "ngayRaKhoa")}
                    touched={true}
                />
            )
        },
        {
            name: "Xử trí",
            field: "xuTri",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <div className="h-36">
                    <Autocomplete
                        className="invalid-feedback-table"
                        options={XU_TRI}
                        value={row.xuTri}
                        valueSearch="code"
                        name="xuTri"
                        onChange={(selectedOption) => handleSelectTable("xuTri", selectedOption, index, itemList, "xuTriMessage")}
                        styles={variantStandardStyle("30px")}
                        errors={checkErrorTable(row.xuTriMessage, index, formikTable, "xuTri")}
                        touched={true}
                    />
                </div>
            ),
        },
        {
            name: "Kết quả điều trị",
            field: "ketQuaDieuTri",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="ketQuaDieuTri"
                    defaultValue={row.ketQuaDieuTri || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "ketQuaDieuTriMessage")}
                    errors={checkErrorTable(row.ketQuaDieuTriMessage, index, formikTable, "ketQuaDieuTri")}
                    touched={true}
                />
            ),
        },
        {
            name: "Số ngày điều trị",
            field: "soNgayDieuTri",
            headerStyle: {
                minWidth: "120px",
            },
            cellStyle: {
                minWidth: "120px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="soNgayDieuTri"
                    defaultValue={row.soNgayDieuTri || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "soNgayDieuTriMessage")}
                    errors={checkErrorTable(row.soNgayDieuTriMessage, index, formikTable, "soNgayDieuTri")}
                    touched={true}
                />
            ),
        },
        {
            name: "Chuyển đến khoa",
            field: "chuyenDenKhoa",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="chuyenDenKhoa"
                    defaultValue={row.chuyenDenKhoa || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "chuyenDenKhoaMessage")}
                    errors={checkErrorTable(row.chuyenDenKhoaMessage, index, formikTable, "chuyenDenKhoa")}
                    touched={true}
                />
            ),
        },
        {
            name: "Bệnh viện chuyển đi",
            field: "benhVienChuyenDi",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                minWidth: "200px",
                textAlign: "left",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="benhVienChuyenDi"
                    defaultValue={row.benhVienChuyenDi || ""}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "benhVienChuyenDiMessage")}
                    errors={checkErrorTable(row.benhVienChuyenDiMessage, index, formikTable, "benhVienChuyenDi")}
                    touched={true}
                />
            ),
        },
        {
            name: "Ngày điều trị",
            field: "ngayDieuTriTiep",
            headerStyle: {
                minWidth: "100px",
            },
            render: (row: any, index: number, stt: number, itemList: any, formikTable: any) => (
                <TextValidator
                    className="variant-standard invalid-feedback-table"
                    name="ngayDieuTriTiep"
                    defaultValue={row.ngayDieuTriTiep}
                    type="text"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTable(e, index, itemList, "ngayDieuTriTiepMessage")}
                    errors={checkErrorTable(row.ngayDieuTriTiepMessage, index, formikTable, "ngayDieuTriTiep")}
                    touched={true}
                />
            )
        },
    ];
};