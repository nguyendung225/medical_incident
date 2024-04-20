import BienBanHopDetail from "../../bien-ban-hop/components/BienBanHopDetail";
import { initBienBanHop } from "../../bien-ban-hop/const/constants";
import BienBanXacMinhDetail from "../../bien-ban-xac-minh/components/BienBanXacMinhDetail";
import { initBienBanXacMinh } from "../../bien-ban-xac-minh/const/constants";
import PhanTichsScykDetail from "../../phan-tich-scyk/components/PhanTichScykDetail";
import { PHAN_TICH_SCYK_INFO_INIT } from "../../phan-tich-scyk/constants/constants";
import { TYPE } from "../../utils/Constant";
import { convertGenderToString, formatDateToString, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";
import { exportToFile, handleExportPdf, handlePrint } from "../../utils/FunctionUtils";
import BaoCaoSCYKDetail from "../components/BaoCaoSCYKDetail";
import { IKetLuanSCYK, IMedicalIncidentDetailInfo, MedicalIncidentInfo } from "../models/BaoCaoSCYKModels";
import { ITiepNhan } from '../models/BaoCaoSCYKModels';
import { exportWordFile as exportWordBaoCaoSCYK, exportPdf as exportPdfBaoCaoSCYK} from "../services/BaoCaoSCYKServices";
import { exportWord as exportWordBienBanXacMinh, exportPdf as exportPdfBienBanXacMinh} from "../../bien-ban-xac-minh/services/BienBanXacMinhServices";
import { exportWord as exportWordPhanTichSCYK, exportPdf as exportPdfPhanTichSCYK } from "../../phan-tich-scyk/services/PhanTichSCYKServices";
import { exportWord as exportWordBienBanHop, exportPdf as exportPdfBienBanHop} from "../../bien-ban-hop/services/BienBanHopServices";
import { handleDownLoadFile } from "../../utils/FileServices";
import moment from "moment";

export const OPTION_MUC_DO_AH = [
    { name: "Nặng", code: 1 },
    { name: "Trung Bình", code: 2 },
    { name: "Nhẹ ", code: 3 },
];

export const OPTION_HINH_THUC_BC = [
    {
        name: "Tự nguyện",
        code: 1,
    },
    {
        name: "Bắt buộc",
        code: 2,
    },
];

export const DOI_TUONG_XAY_RA_SC = [
    {
        name: "Người bệnh",
        code: "1",
    },
    {
        name: "Nhân viên y tế",
        code: "2",
    },
    {
        name: "Người nhà/ Khách đến thăm",
        code: "3",
    },
    {
        name: "Trang thiết bị/ Cơ sở hạ tầng",
        code: "4",
    },
];

export const TRANG_THAI_OPTIONS = [
    { name: "Tất cả", code: "0" },
    { name: "Mới tạo", code: "1" },
    { name: "Chờ tiếp nhận", code: "2" },
    { name: "Đã tiếp nhận", code: "3" },
    { name: "Đã xác minh", code: "4" },
    { name: "Đã phân tích", code: "5" },
    { name: "Tạo biên bản", code: "6" },
    { name: "Đã báo cáo", code: "7" },
    { name: "Đã kết luận", code: "8" },
]

const renderPhanLoaiBaoCao = (phanLoaiCode: number) => {
    const phanLoaiBaoCao = OPTION_MUC_DO_AH.filter((mucDo) => mucDo.code === phanLoaiCode);
    return phanLoaiBaoCao && phanLoaiBaoCao[0]?.name;
}

const renderHinhThucBaoCao = (hinhThucCode: number) => {
    const hinhThuc = OPTION_HINH_THUC_BC.filter((hinhThuc) => hinhThuc.code === hinhThucCode);
    return hinhThuc && hinhThuc[0]?.name;
}

export const renderLoaiDoiTuong = (loaiDoiTuong: string[]) => {
    const doiTruongList: string[] = [];
    DOI_TUONG_XAY_RA_SC.forEach(doiTuong => {
        if(loaiDoiTuong?.includes(doiTuong.code))  
            doiTruongList.push(doiTuong.name);
    })
    return doiTruongList.toString();
}

export const tableDSSuCoYKhoaColumns = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "TT",
        field: "name",
        render: (row: any) => renderMedicalIncidentReportStatus(row?.trangThaiXuLy)
    },
    {
        name: "Phân loại SCYK",
        field: "phanLoai",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => renderPhanLoaiBaoCao(row?.danhGiaBanDau)
    },
    {
        name: "Mã sự cố",
        field: "code",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => <span>{row?.code}</span>
    },
    {
        name: "Tên sự cố",
        field: "name",
        headerStyle: {
            minWidth: "180px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{row?.name}</span>
    },
    {
        name: "Hình thức",
        field: "hinhThuc",
        headerStyle: {
            minWidth: "100px"
        },
        render: (row: any) => renderHinhThucBaoCao(row?.hinhThuc)
    },
    {
        name: "Ngày báo cáo",
        field: "ngayBaoCao",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => <span>{formatDateToString(row?.ngayBaoCao)}</span>
    },
    {
        name: "Đối tượng xảy ra",
        field: "loaiDoiTuong",
        headerStyle: {
            minWidth: "200px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{renderLoaiDoiTuong(row?.loaiDoiTuong)}</span>
    },
    {
        name: "Họ và tên",
        field: "",
        headerStyle: {
            minWidth: "200px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => (
            row?.tenBenhNhan && (
                <div className="d-flex flex-column text-up">
                    <span className="text-uppercase">{row?.tenBenhNhan}</span>
                    <span>{row?.maBenhNhan} - {convertGenderToString(row?.gioiTinh)} - {formatDateToString(row?.ngaySinh)}</span>
                </div>
            )
        )
    },
    {
        name: "Khoa Phòng",
        field: "",
        headerStyle: {
            minWidth: "200px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => (<span>{row?.tenKhoaPhongDieuTri}</span>)
    }
]

export const tableLichSuCapNhatCulumns = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Thao tác",
        field: "thaoTac",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => (<>{row?.thaoTac}</>)
    },
    {
        name: "Người xử lý",
        field: "nguoiXuLy",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => (<>{row?.nguoiXuLy}</>)
    },
    {
        name: "Khoa phòng",
        field: "khoaPhong",
        headerStyle: {
            minWidth: "140px",
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => (<>{row?.khoaPhong}</>)
    },
    {
        name: "Thời gian",
        field: "thoiGian",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => (<>{moment(row?.thoiGian).format("DD/MM/YYYY HH:mm:ss")}</>)
    },
    {
        name: "Chỉ đạo của phòng quản lý chất lượng",
        field: "chiDaoCuaPhongQlcl",
        headerStyle: {
            minWidth: "200px",
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => (<>{row?.chiDaoCuaPhongQlcl}</>)
    },
    {
        name: "Ghi chú",
        field: "ghiChu",
        headerStyle: {
            minWidth: "140px",
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => (<>{row?.ghiChu}</>)
    },
]

export const tableAttachedFilesCulumns = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Tên file",
        field: "name",
        headerStyle: {
            minWidth: "200px"
        },
        render: (row: any) => (<>{row?.name}</>)
    },
    {
        name: "Kích thước file",
        field: "ncontentSizeame",
        headerStyle: {
            minWidth: "100px"
        },
        render: (row: any) => (<>{((row?.contentSize) / (1024 * 1024))?.toFixed(2)} Mb</>)
    },
    {
        name: "",
        field: "",
        render: (row: any) => (
            <i
                className="bi bi-download text-primary cursor-pointer"
                onClick={() => handleDownLoadFile(row?.id, row?.name)}
            />
        )
    },
]

export const OPTION_XAC_NHAN = [
    { name: "Có", code: 1 },
    { name: "Không", code: 2 },
    { name: "Không ghi nhận", code: 3 },
];

export const OPTION_PHAN_LOAI = [
    { name: "Chưa xảy ra", code: 1 },
    { name: "Đã xảy ra", code: 2 },
];

export const CHUC_VU_OPTION = [
    { name: "Chức vụ 1", code: "CV1" },
    { name: "Chức vụ 2 ", code: "CV2" },
    { name: "Chúc vụ 3", code: "CV3" },
];

export const TT_NGUOI_THONG_BAO = [
	{ name: "Điều dưỡng (Chức danh)", code: 1 },
	{ name: "Người bệnh", code: 2 },
	{ name: "Bác sĩ (Chức danh)", code: 3 },
	{ name: "Người nhà/Khách thăm", code: 4 },
	{ name: "Khác(Ghi cụ thể)", code: 5 },
];

export const GENDER_OPTION = [
	{ name: "Nam", code: 1 },
	{ name: "Nữ ", code: 2 },
	{ name: "Khác", code: 3 },
];

export const OTHER_FIELD_LOAI_NBC = 5

export const benhNhanInitInfo = {
    code: "",
    gioiTinh: "",
    id: "",
    khoaPhongDieuTriId: null,
    name: "",
    ngaySinh: "",
    tenKhoaPhongDieuTri: "",
}

export const InitThongTinSCYK: MedicalIncidentInfo = {
    name: "",
    phanLoai: 3,
    hinhThuc: 1,
    donViBaoCao: "",
    ngayXayRa: moment(new Date()).format("YYYY-MM-DD"),
    thoiGianXayRa: moment(new Date()).format("HH:mm"),
    ngayBaoCao: moment(new Date()).format("YYYY-MM-DD"),
    benhNhanId: null,
    loaiDoiTuong: [],
    noiXayRa: "",
    viTriCuThe: "",
    moTa: "",
    deXuat: "",
    dieuTriBanDau: "",
    thongBaoChoBacSi: 3,
    ghiNhanHoSo: 3,
    thongBaoNguoiNha: 3,
    thongBaoNguoiBenh: 3,
    phanLoaiBanDau: 2,
    danhGiaBanDau: 2,
    tenNbc: "",
    soDienThoaiNbc: "",
    emailNbc: "",
    loaiNbc: null,
    loaiNbcKhac: "",
    tenKhoaPhong: "",
    tenDonViBaoCao: "",
    tenNck1: "",
    tenNck2: "",
    trangThaiXuLy: 0,
    benhNhan: null,
    code: "",
    isActive: true,
    khoaPhongDieuTri: null,
    maBenhNhan: "",
    orgId: "",
    tenBenhNhan: null,
    ngaySinh: null,
    soBenhAn: null,
    gioiTinh: null,
    tenKhoaPhongDieuTri: "",
    khoaPhongDieuTriId: "",
};

export const initTiepNhan: ITiepNhan = {
    khoaPhongXuLy: "",
    phuongAnXuLy: "",
    suCoId:""
}

export const initKetLuan: IKetLuanSCYK = {
    lyDo: "",
    suCoId: "",
    nguoiKetLuanId: "",
    ghiChu: ""
}

export const SCYK_DETAIL_INFO_INIT: IMedicalIncidentDetailInfo = {
    benhNhanResp: undefined,
    suCoResp: InitThongTinSCYK,
    bienBanXacMinhResp: initBienBanXacMinh,
    phanTichResp: PHAN_TICH_SCYK_INFO_INIT,
    bienBanHopResp: initBienBanHop,
}

export const SEARCH_OBJECT_INIT = {
    pageNumber: 1,
    pageSize: 10,
    tuNgay: "",
    denNgay: "",
    trangThaiXuLy: undefined,
    hinhThuc: undefined,
    phanLoai: undefined,
    khoaPhongDieuTri: undefined,
}

export const getTabList = (thongTinSCYK: IMedicalIncidentDetailInfo) => {
    const tabList = [
        {
            eventKey: "0",
            title: "Báo cáo sự cố",
            component: <BaoCaoSCYKDetail thongTinSCYK={thongTinSCYK?.suCoResp} thongTinBenhNhan={thongTinSCYK?.benhNhanResp || benhNhanInitInfo}/>,
        }
    ]

    if (thongTinSCYK?.bienBanXacMinhResp?.id) {
        tabList.push({
            eventKey: "1",
            title: "Biên bản xác minh",
            component: <BienBanXacMinhDetail thongTinBienBan={thongTinSCYK?.bienBanXacMinhResp} />
        })
    }

    if (thongTinSCYK?.phanTichResp?.id) {
        tabList.push({
            eventKey: "2",
            title: "Phân tích SCYK",
            component: <PhanTichsScykDetail phanTichScyk={thongTinSCYK?.phanTichResp} thongTinScyk={thongTinSCYK?.suCoResp}/>
        })
    }

    if (thongTinSCYK?.bienBanHopResp?.id) {
        tabList.push({
            eventKey: "3",
            title: "Biên bản họp",
            component: <BienBanHopDetail thongTinBienBan={thongTinSCYK?.bienBanHopResp} />,
        })
    }

    return tabList
}

export const getPhieuInList = (thongTinSCYK: IMedicalIncidentDetailInfo) => {
    const phieuInList = [
        {
            title: "Báo cáo scyk",
            handleClick: () => handlePrint("in-phieu-bao-cao-scyk"),
        },
    ]

    if (thongTinSCYK?.bienBanXacMinhResp?.id) {
        phieuInList.push({
            title: "Biên bản xác minh",
            handleClick: () => handlePrint("in-phieu-bien-ban-xac-minh"),
        })
    }

    if (thongTinSCYK?.phanTichResp?.id) {
        phieuInList.push({
            title: "Phân tích sự cố",
            handleClick: () => handlePrint("in-phieu-phan-tich-scyk"),
        })
    }

    if (thongTinSCYK?.bienBanHopResp?.id) {
        phieuInList.push({
            title: "Biên bản họp",
            handleClick: () => handlePrint("in-phieu-bien-ban-hop"),
        })
    }
    
    return phieuInList;
}

export const getExportedFileList = (thongTinSCYK: IMedicalIncidentDetailInfo, setPageLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const exportedFileList = [
        {
            title: "Báo cáo scyk.docx",
            handleClick: () => exportToFile({
                exportAPI: () => thongTinSCYK?.suCoResp?.id && exportWordBaoCaoSCYK(thongTinSCYK?.suCoResp?.id), 
                fileName: "Báo cáo scyk",
                type: TYPE.WORD,
                setPageLoading
            }),
        },
        {
            title: "Báo cáo scyk.pdf",
            handleClick: () => exportToFile({
                exportAPI: () => thongTinSCYK?.suCoResp?.id && exportPdfBaoCaoSCYK(thongTinSCYK?.suCoResp?.id), 
                fileName: "Báo cáo scyk",
                type: TYPE.PDF,
                setPageLoading
            }),
        },
        
    ]

    if(thongTinSCYK?.bienBanXacMinhResp?.id) {
        exportedFileList.push(
            {
                title: "Biên bản xác minh.docx",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.bienBanXacMinhResp?.id && exportWordBienBanXacMinh(thongTinSCYK?.bienBanXacMinhResp?.id),
                    fileName: "Biên bản xác minh",
                    type: TYPE.WORD,
                    setPageLoading
                }),
            },
            {
                title: "Biên bản xác minh.pdf",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.bienBanXacMinhResp?.id && exportPdfBienBanXacMinh(thongTinSCYK?.bienBanXacMinhResp?.id),
                    fileName: "Biên bản xác minh",
                    type: TYPE.PDF,
                    setPageLoading
                }),
            }
        )
    }

    if(thongTinSCYK?.phanTichResp?.id) {
        exportedFileList.push(
            {
                title: "Phân tích Scyk.docx",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.phanTichResp?.id && exportWordPhanTichSCYK(thongTinSCYK?.phanTichResp?.id),
                    fileName: "Phân tích Scyk",
                    type: TYPE.WORD,
                    setPageLoading
                }),
            },
            {
                title: "Phân tích Scyk.pdf",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.phanTichResp?.id && exportPdfPhanTichSCYK(thongTinSCYK?.phanTichResp?.id),
                    fileName: "Phân tích Scyk",
                    type: TYPE.PDF,
                    setPageLoading
                }),
            },
        )
    }

    if(thongTinSCYK?.bienBanHopResp?.id) {
        exportedFileList.push(
            {
                title: "Biên bản họp.docx",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.bienBanHopResp?.id && exportWordBienBanHop(thongTinSCYK?.bienBanHopResp?.id),
                    fileName: "Biên bản họp",
                    type: TYPE.WORD,
                    setPageLoading
                }),
            },
            {
                title: "Biên bản họp.pdf",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.bienBanHopResp?.id && exportPdfBienBanHop(thongTinSCYK?.bienBanHopResp?.id),
                    fileName: "Biên bản họp",
                    type: TYPE.PDF,
                    setPageLoading
                }),
            }
        )
    }

    return exportedFileList;
}