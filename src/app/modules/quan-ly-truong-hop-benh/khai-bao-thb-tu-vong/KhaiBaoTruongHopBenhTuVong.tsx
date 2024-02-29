import { Tabs } from 'antd';
import { CREATE_DISEASE_CASE_TAB_KEY, KHAI_BAO_THB_TU_VONG_TAB_LIST } from '../constants/QuanLyTruongHopBenhConstants';
import { Form, Formik, FormikErrors } from 'formik';
import * as Yup from "yup";
import "../styles/quanLyTruongHopBenh.scss";
import useMultiLanguage from '../../../hook/useMultiLanguage';
import { useEffect, useState } from 'react';
import { handleGetAge } from '../utils/FunctionUtils';

const KhaiBaoTruongHopBenhTuVong = () => {
    const { lang } = useMultiLanguage();
    const [tabActiveKey, setTabActiveKey] = useState(CREATE_DISEASE_CASE_TAB_KEY.THONG_TIN_CHUNG);
    
    const onChangeTab = (key: string) => {
        setTabActiveKey(key);
    };

    const handlePrevTab = () => {
        setTabActiveKey(prev => {
            return (parseInt(prev) - 1).toString();
        });
    }

    const handleNextTab = () => {
        setTabActiveKey(prev => {
            return (parseInt(prev) + 1).toString();
        });
    }

    const validationTabThongTinChung = {
        namMacBenh: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        hoTen: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        ngaySinh: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        hoTenNguoiThan: Yup.string().when("ngaySinh", {
            is: (ngaySinh: string) =>  handleGetAge(ngaySinh) <= 15,
            then: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        benhVienTuyen: Yup.string().when("benhNhanDaKhamTaiBenhVien", {
            is: "1",
            then: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        ngayNhapVien: Yup.date().when("benhNhanDaKhamTaiBenhVien", {
            is: "1",
            then: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        tenBenhVien: Yup.string().when("benhNhanDaKhamTaiBenhVien", {
            is: "1",
            then: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        ngayMacBenhSXHD: Yup.date().when("daMacSXH", {
            is: "1",
            then: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
    };

    const validationTabTrieuChungVaChanDoan = {
        ngayBatDauSot: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        nhietDoCaoNhat: Yup.number().required(lang("VALIDATION.REQUIRE")).nullable(),
        soNgaySot: Yup.number().required(lang("VALIDATION.REQUIRE")).nullable(),
        dauViTriKhac: Yup.string().when("viTriDau", {
            is: (viTriDau: string[]) => viTriDau.includes("4"),
            then: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        nhipMach: Yup.number().required(lang("VALIDATION.REQUIRE")).nullable(),
        huyetAp: Yup.number().required(lang("VALIDATION.REQUIRE")).nullable(),
        xuatHuyetkhac: Yup.string().when("xuatHuyet", {
            is: (xuatHuyet: string[]) => xuatHuyet.includes("10"),
            then: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        kichThuocGanDuoiBoSuon: Yup.number().when("ganDuoiBoSuon", {
            is: "1",
            then: Yup.number().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
    }

    const validationTabXetNghiemVaChanDoan = {
        ngayLayMauNS1: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        ketQuaLayMauNS1: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        ngayLayMauPCR: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        ketQuaLayMauPCR: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        ngayLayMauPhanLap: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        ketQuaLayMauPhanLap: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        ngayLayHuyetThanh1: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        ketQuaHuyetThanh1: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        ngayLayHuyetThanh2: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
        ketQuaHuyetThanh2: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        chanDoanSXHD: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        phanDoNangCuaSXHD: Yup.object().when("chanDoanSXHD", {
            is: "1",
            then: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        dieuTri: Yup.object().when("chanDoanSXHD", {
            is: "1",
            then: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        ketQuaCuoiCung: Yup.object().when("chanDoanSXHD", {
            is: "1",
            then: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
        }),
        ngayDieuTraKetQua: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
    }

    const validationTabThongTinNguoiBaoCao = {
        tenNguoiBaoCao: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        donViCongTac: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        soDienThoai: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    }

    const [validationSchema, setValidationSchema] = useState<any>(Yup.object().shape(validationTabThongTinChung))

    const INIT_DISEASE_CASE_INFO = {
        // Thông tin chung
        provinceId: "",
        namMacBenh: new Date().getFullYear(),
        soBenhAn: "",
        hoTen: "Nguyen Van A",
        gioiTinh: "1",
        ngaySinh: "",
        tuoi: "",
        ngheNghiep: "",
        hoTenNguoiThan: "",
        benhNhanDaKhamTaiXaPhuong: "2",
        benhNhanDaKhamTaiBenhVien: "1",
        benhVienTuyen: "",
        ngayNhapVien: "",
        tenBenhVien: "",
        daMacSXH: "1",
        ngayMacBenhSXHD: "",
        OKhuVucDich: "2",
        noiTiepXuc: "",
        noiTiepXucKhac: "",

        // Triệu chứng và chẩn đoán sơ bộ 
        ngayBatDauSot: null,
        nhietDoCaoNhat: null,
        soNgaySot: null,
        nhipMach: null,
        huyetAp: null,
        viTriDau: ["1"],
        dauViTriKhac: "",
        dauHieuDayThat: "2",
        ganDuoiBoSuon: "3",
        kichThuocGanDuoiBoSuon: null,
        sungHachBachHuyet: "2",
        xuatHuyet: ["1"],
        xuatHuyetkhac: "",

        //Xét nghiệm và chẩn đoán
        hematocri: "",
        tieuCau: "",
        hongCau: "",
        bachCau: "",
        ngayLayMauNS1: null,
        ketQuaLayMauNS1: null,
        ngayLayMauPCR: null,
        ketQuaLayMauPCR: null,
        ngayLayMauPhanLap: null,
        ketQuaLayMauPhanLap: null,
        ngayLayHuyetThanh1: null,
        ketQuaHuyetThanh1: null,
        ngayLayHuyetThanh2: null,
        ketQuaHuyetThanh2: null,
        ketQuaCuoiCung: {},
        ngayDieuTraKetQua: null,

        //Chẩn đoán xuất viện
        chanDoanSXHD: null,
        phanDoNangCuaSXHD: null,
        bienChungKemTheo: null,
        benhKhacKemTheo: null,
        dieuTri: null,
        ngayTuVong: null,
        noiTuVong: null,
        noiTuVongKhac: null,
        tinhTuVong: null,
        huyenTuVong: null,
        xaPhuongTuVong: null,

        //Thông tin người báo cáo
        tenNguoiBaoCao: "",
        donViCongTac:  "",
        soDienThoai: "",
    }

    const handleSubmit = () => {
        if(tabActiveKey !== CREATE_DISEASE_CASE_TAB_KEY.THONG_TIN_NGUOI_BAO_CAO) {
            handleNextTab();
        }
    }

    useEffect(() => {
        switch(tabActiveKey) {
            case CREATE_DISEASE_CASE_TAB_KEY.THONG_TIN_CHUNG: {
                setValidationSchema(Yup.object().shape(validationTabThongTinChung));
                break;
            }
            case CREATE_DISEASE_CASE_TAB_KEY.TRIEU_CHUNG_VA_CHAN_DOAN_SO_BO: {
                setValidationSchema(Yup.object().shape({
                    ...validationTabThongTinChung,
                    ...validationTabTrieuChungVaChanDoan,
                }));
                break;
            }
            case CREATE_DISEASE_CASE_TAB_KEY.XET_NGHIEM_VA_CHAN_DOAN: {
                setValidationSchema(Yup.object().shape({
                    ...validationTabThongTinChung,
                    ...validationTabTrieuChungVaChanDoan,
                    ...validationTabXetNghiemVaChanDoan,
                }));
                break;
            }
            default: {
                setValidationSchema(Yup.object().shape({
                    ...validationTabThongTinChung,
                    ...validationTabTrieuChungVaChanDoan,
                    ...validationTabXetNghiemVaChanDoan,
                    ...validationTabThongTinNguoiBaoCao
                }));
                break;
            }
        }
    }, [tabActiveKey])

    return (
        <div className='spaces px-5'>
            <Formik
                initialValues={INIT_DISEASE_CASE_INFO}
                validationSchema={validationSchema}
                validateOnChange={true}
                validate={(values) => {
                const errors: FormikErrors<any> = {};
                return errors;
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="tab-content-container">
                        <Tabs
                            defaultActiveKey={tabActiveKey}
                            items={KHAI_BAO_THB_TU_VONG_TAB_LIST}
                            activeKey={tabActiveKey}
                            onChange={onChangeTab}
                        />
                        <div className="spaces mt-10 d-flex justify-content-end">
                            {tabActiveKey !== CREATE_DISEASE_CASE_TAB_KEY.THONG_TIN_CHUNG && (
                                <button className="spaces button-primary py-4 fs-12 h-30 mr-10" type='button' onClick={handlePrevTab}>
                                    Quay lại
                                </button>
                            )}
                            <button className="spaces button-primary py-4 fs-12 h-30" type='submit'>
                                Lưu và tiếp tục
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default KhaiBaoTruongHopBenhTuVong