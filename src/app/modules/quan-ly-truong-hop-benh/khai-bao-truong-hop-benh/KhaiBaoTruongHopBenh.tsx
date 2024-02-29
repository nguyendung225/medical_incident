import { Tabs } from 'antd';
import { CREATE_DISEASE_CASE_TAB_KEY, CREATE_DISEASE_CASE_TAB_LIST } from '../constants/QuanLyTruongHopBenhConstants';
import { Form, Formik, FormikErrors } from 'formik';
import * as Yup from "yup";
import "../styles/quanLyTruongHopBenh.scss";
import useMultiLanguage from '../../../hook/useMultiLanguage';
import { useEffect, useState } from 'react';
import { handleGetAge } from '../utils/FunctionUtils';

const KhaiBaoTruongHopBenh = () => {
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
        nhipMach: Yup.number().required(lang("VALIDATION.REQUIRE")).nullable(),
        huyetAp: Yup.number().required(lang("VALIDATION.REQUIRE")).nullable(),
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
        benhNhanDaKhamTaiXaPhuong: "1",
        benhNhanDaKhamTaiBenhVien: "2",
        benhVienTuyen: "",
        ngayNhapVien: "",
        tenBenhVien: "",
        daMacSXH: "1",
        ngayMacBenhSXHD: "",
        OKhuVucDich: "1",

        // Triệu chứng và chẩn đoán sơ bộ 
        ngayBatDauSot: null,
        nhietDoCaoNhat: null,
        soNgaySot: null,
        nhipMach: null,
        huyetAp: null,
        xuatHuyetNoiKhac: "",
        dauDau: "1",
        dauBapThit: "1",
        dauXuongKhop: "1",
        dauHieuDayThat: "1",
        noiBan: "1",
        chamXuatHuyet: "1",
        xuatHuyetNoiCuc: "1",
        mangXuatHuyet: "1",
        xuatHuyetLoiRang: "1",
        nonRaMau: "1",
        diNgoaiRaMau: "1",
        diTieuRaMau: "1",
        hanhKinhKeoDai: "1",
        dauVungGan: "1",
        ganDuoiBoSuon: "1",
        sungHachBachHuyet: "1",
        chanDoanSoBo: "1",
        vatVa: "1",
        liBi: "1",
        daLanhAm: "1",
        chanTayLanh: "1",
        nhipMachLanPhut: "1",
        huyetApToiDaToiThieu: "1",


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
        chanDoanSXHD: null,
        phanDoNangCuaSXHD: {},
        dieuTri: {},
        ketQuaCuoiCung: {},
        ngayDieuTraKetQua: null,

        //Thông tin người báo cáo
        tenNguoiBaoCao: "",
        donViCongTac:  "",
        soDienThoai: ""
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            items={CREATE_DISEASE_CASE_TAB_LIST}
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

export default KhaiBaoTruongHopBenh