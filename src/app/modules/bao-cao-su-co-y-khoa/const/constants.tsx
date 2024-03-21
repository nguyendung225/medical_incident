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
import { IMedicalIncidentDetailInfo, MedicalIncidentInfo } from "../models/BaoCaoSCYKModels";
import { ITiepNhan } from '../models/BaoCaoSCYKModels';
import { exportWordFile as exportWordBaoCaoSCYK} from "../services/BaoCaoSCYKServices";
import { exportWord as exportWordBienBanXacMinh} from "../../bien-ban-xac-minh/services/BienBanXacMinhServices";
import { exportWord as exportWordBienBanHop} from "../../bien-ban-hop/services/BienBanHopServices";

export const OPTION_MUC_DO_AH = [
    { name: "Nặng", code: 1 },
    { name: "Nhẹ ", code: 2 },
    { name: "Trung Bình", code: 3 },
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

const renderPhanLoaiBaoCao = (phanLoaiCode: number) => {
    const phanLoaiBaoCao = OPTION_MUC_DO_AH.filter((mucDo) => mucDo.code === phanLoaiCode);
    return phanLoaiBaoCao && phanLoaiBaoCao[0]?.name;
}

const renderHinhThucBaoCao = (hinhThucCode: number) => {
    const hinhThuc = OPTION_HINH_THUC_BC.filter((hinhThuc) => hinhThuc.code === hinhThucCode);
    return hinhThuc && hinhThuc[0]?.name;
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
        render: (row: any) => renderPhanLoaiBaoCao(row?.phanLoaiBanDau)
    },
    {
        name: "Mã sự cố",
        field: "code",
        headerStyle: {
            minWidth: "100px"
        },
        render: (row: any) => <span>{row?.code}</span>
    },
    {
        name: "Tên sự cố",
        field: "name",
        headerStyle: {
            minWidth: "100px"
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
            minWidth: "120px"
        },
        render: (row: any) => <span>{formatDateToString(row?.ngayBaoCao)}</span>
    },
    {
        name: "Đơn vị báo cáo",
        field: "donViBaoCao",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => <span>{row?.tenDonViBaoCao}</span>
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
            row?.benhNhan && (
                <div className="d-flex flex-column text-up">
                    <span className="text-uppercase">{row?.benhNhan?.name}</span>
                    <span>{row?.benhNhan?.code} - {convertGenderToString(row?.benhNhan?.gioiTinh)} - {formatDateToString(row?.benhNhan?.ngaySinh)}</span>
                </div>
            )
        )
    },
    {
        name: "Khoa Phòng",
        field: "",
        headerStyle: {
            minWidth: "120px"
        },
        render: (row: any) => <span>{row?.tenKhoaPhong}</span>
    }
]

export const dsTabThongTinSCYK = [
    {
        eventKey: "0",
        title: "Báo cáo sự cố",
        // component: <BaoCaoSCYKDetail />,
    },
    {
        eventKey: "1",
        title: "Biên bản xác minh",
        component: <></>
    },
    {
        eventKey: "2",
        title: "Phân tích SCYK",
        component: <></>
    },
    {
        eventKey: "3",
        title: "Biên bản họp",
        component: <></>
    },
    {
        eventKey: "4",
        title: "Tài liệu đính kèm",
        component: <>Tài</>
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
	{ name: "Name", code: 1 },
	{ name: "Nữ ", code: 2 },
	{ name: "Khác", code: 3 },
];

export const OTHER_FIELD_LOAI_NBC = 5

export const InitThongTinSCYK: MedicalIncidentInfo = {
    name: "",
    phanLoai: 1,
    hinhThuc: 1,
    donViBaoCao: "",
    ngayXayRa: "",
    thoiGianXayRa: "",
    ngayBaoCao: "",
    benhNhanId: null,
    loaiDoiTuong: [],
    noiXayRa: "",
    viTriCuThe: "",
    moTa: "",
    deXuat: "",
    dieuTriBanDau: "",
    thongBaoChoBacSi: 1,
    ghiNhanHoSo: 1,
    thongBaoNguoiNha: 1,
    thongBaoNguoiBenh: 1,
    phanLoaiBanDau: 1,
    danhGiaBanDau: 1,
    tenNbc: "",
    soDienThoaiNbc: "",
    emailNbc: "",
    loaiNbc: 1,
    loaiNbcKhac: "",
    tenKhoaPhong: "",
    tenDonViBaoCao: "",
    tenNck1: "",
    tenNck2: "",
    trangThaiXuLy: 1,
    benhNhan: null,
    code: "",
    isActive: true,
    khoaPhongDieuTri: null,
    maBenhNhan: "",
    orgId: "",
    tenBenhNhan: ""
};

export const DV_BAO_CAO = [
	{
		code: '00000000-0000-0000-0000-000000000000',
		name: "Đơn vị 1",
	},
	{
		code: '00000000-0000-0000-0000-000000000001',
		name: "Đơn vị 2",
	},
];

export const KHOA_PHONG = [
	{
		code: '00000000-0000-0000-0000-000000000000',
		name: "Đơn vị 1",
	},
	{
		code: '00000000-0000-0000-0000-000000000001',
		name: "Đơn vị 2",
	},
];

export const initTiepNhan: ITiepNhan = {
    khoaPhongXuLy: "",
    phuongAnXuLy: "",
    suCoId:""
}

export const SCYK_DETAIL_INFO_INIT: IMedicalIncidentDetailInfo = {
    benhNhanResp: undefined,
    suCoResp: InitThongTinSCYK,
    bienBanXacMinhResp: initBienBanXacMinh,
    phanTichResp: PHAN_TICH_SCYK_INFO_INIT,
    bienBanHopResp: initBienBanHop,
}

export const printStyles = {
	box_square: {
		display: "inline-block",
		border: "1px solid #333",
		width: "15px",
		height: "15px",
		margin: "0 1px",
		position: "relative" as "relative",
	},
	checked: {
		position: "absolute" as "absolute",
		top: "-3px",
		left: "1px",
	},
	d_none: {
		display: "none",
	},
	d_flex: {
		display: "flex",
	},
	d_flex_align_center: {
		display: "flex",
		alignItems: "center",
	},
	d_flex_wrap: {
		display: "flex",
		flexWrap: "wrap" as "wrap",
	},
	d_flex_j_between: {
		display: "flex",
		justifyContent: "space-between",
	},
	d_flex_j_center: {
		display: "flex",
		justifyContent: "center",
	},
	width: {
		_30persent: {
			width: "30%",
		},
		_40persent: {
			width: "40%",
		},
		_48persent: {
			width: "48%",
		},
		_60persent: {
			width: "60%",
		},
	},
    marginLeft: {
        _10px: {
            marginLeft: "10px",
        },
        _180px: {
            marginLeft: "180px",
        },
    },
	marginTop: {
		_0px: {
			marginTop: "0",
		},
		_10px: {
			marginTop: "10px",
		},
        _20px: {
			marginTop: "20px",
		},
		_80px: {
			marginTop: "80px",
		},
	},
	marginBottom: {
		_0px: {
			marginBottom: "0",
		},
		_10px: {
			marginBottom: "10px",
		},
		_80px: {
			marginBottom: "80px",
		},
	},
	fontSize: {
		_15px: {
			fontSize: "15px",
		}
	},
	fontWeight: {
		bold: {
			fontWeight: "bold",
		},
		normal: {
			fontWeight: "normal",
		},
	},
	font_italic: {
		fontStyle: "italic",
	},
	lable: {
		fontWeight: "bold",
		marginTop: "10px",
	},
	container: {
		background: "white",
		padding: "10px",
		overflow: "scroll",
		height: "calc(100vh - 160px)",
		marginTop: "3px",
	},
	text_center: {
		textAlign: "center" as "center",
	},
	header: {
		fontWeight: "bold",
		textAlign: "center" as "center",
	},
	content_text: {
		padding: "0 2px",
	},
	contentTitle: {
		fontWeight: "700",
		marginTop: "4px",
		color: "#1a5e83",
	},
	header_title: {
		fontWeight: "bold",
		textAlign: "center" as "center",
		fontSize: "15px",
		marginBottom: "15px",
	},
    formTitle: {
        textAlign: "center" as "center",
        fontSize: "15px",
        fontWeight: "600",
        marginBottom: "20px"
    }
};

export const RenderTabList = (thongTinSCYK: IMedicalIncidentDetailInfo) => {
    const tabList = [
        {
            eventKey: "0",
            title: "Báo cáo sự cố",
            component: <BaoCaoSCYKDetail thongTinSCYK={thongTinSCYK?.suCoResp} />,
        }
    ]

    if (thongTinSCYK?.bienBanXacMinhResp) {
        tabList.push({
            eventKey: "1",
            title: "Biên bản xác minh",
            component: <BienBanXacMinhDetail thongTinBienBan={thongTinSCYK?.bienBanXacMinhResp} />
        })
    }

    if (thongTinSCYK?.phanTichResp) {
        tabList.push({
            eventKey: "2",
            title: "Phân tích SCYK",
            component: <PhanTichsScykDetail phanTichScyk={thongTinSCYK?.phanTichResp} />
        })
    }

    if (thongTinSCYK?.bienBanHopResp) {
        tabList.push({
            eventKey: "3",
            title: "Biên bản họp",
            component: <BienBanHopDetail thongTinBienBan={thongTinSCYK?.bienBanHopResp} />,
        })
    }

    tabList.push({
        eventKey: "4",
        title: "Tài liệu đính kèm",
        component: <div style={{height: "calc(100vh - 155px)", background: "#fff"}}>Tài liệu đính kèm</div>
    })

    return tabList
}

export const getPhieuInList = (thongTinSCYK: IMedicalIncidentDetailInfo) => {
    const phieuInList = [
        {
            title: "Báo cáo scyk",
            handleClick: () => handlePrint("in-phieu-bao-cao-scyk"),
        },
    ]

    if (thongTinSCYK?.bienBanXacMinhResp) {
        phieuInList.push({
            title: "Biên bản xác minh",
            handleClick: () => handlePrint("in-phieu-bien-ban-xac-minh"),
        })
    }

    if (thongTinSCYK?.phanTichResp) {
        phieuInList.push({
            title: "Phân tích sự cố",
            handleClick: () => handlePrint("in-phieu-phan-tich-scyk"),
        })
    }

    if (thongTinSCYK?.bienBanHopResp) {
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
            handleClick: () => {
                handleExportPdf({
                    elementId: "in-phieu-bao-cao-scyk",
                    fileName: "Báo cáo scyk",
                    setPageLoading
                })
            }
        },
        
    ]

    if(thongTinSCYK?.bienBanXacMinhResp) {
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
                handleClick: () => {
                    handleExportPdf({
                        elementId: "in-phieu-bien-ban-xac-minh",
                        fileName: "Biên bản xác minh",
                        setPageLoading
                    })
                }
            }
        )
    }

    if(thongTinSCYK?.phanTichResp) {
        exportedFileList.push(
            {
                title: "Phân tích Scyk.docx",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.phanTichResp?.id && exportWordBienBanXacMinh(thongTinSCYK?.phanTichResp?.id),
                    fileName: "Phân tích Scyk",
                    type: TYPE.WORD,
                    setPageLoading
                }),
            },
            {
                title: "Phân tích Scyk.pdf",
                handleClick: () => {
                    handleExportPdf({
                        elementId: "in-phieu-phan-tich-scyk",
                        fileName: "Phân tích Scyk",
                        setPageLoading
                    })
                }
            },
        )
    }

    if(thongTinSCYK?.bienBanHopResp) {
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
                handleClick: () => {
                    handleExportPdf({
                        elementId: "in-phieu-bien-ban-hop",
                        fileName: "Biên bản họp",
                        setPageLoading
                    })
                }
            }
        )
    }

    return exportedFileList;
}