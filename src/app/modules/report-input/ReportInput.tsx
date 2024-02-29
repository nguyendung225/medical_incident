/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import "./report-input.scss";
import * as Yup from "yup";
import TextValidator from "../component/input-field/TextValidator";
import useMultiLanguage from "../../hook/useMultiLanguage";
import Autocomplete from "../component/input-field/Autocomplete";
import TableCustom from "../component/table-custom/TableCustom";
import { INIT_REPORT_DATA, listNurse } from "./models/ReportInputConst";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { heightSelectMutil } from "../component/input-field/StyleComponent";
import { useFormik } from "formik";
import { REGEX, RESPONSE_STATUS_CODE } from "../utils/Constant";
import { toast } from "react-toastify";
import AppContext from "../../AppContext";
import { unstable_batchedUpdates } from "react-dom";
import { DATA_IMPORT, DOI_TUONG_BENH_NHAN, DON_TIEP_CCCD, GIOI_TINH, HINH_THUC_VAO_KHOA, LIST_KHOA_PHONG, TUYEN_KHAM_CHUA_BENH, XU_TRI } from "./consts/ReportInputConst";
import { Columns } from "./components/Columns";
import { checkObject } from "../utils/FunctionUtils";
import { fileUpload, sendReport } from "./services/ReportInputServices";
import { getCodeFromOptionList } from "./utils/FunctionUtils";

interface IProps {
  dataReport: any;
  setIsEditReport: any;
  isView: boolean
}

const ReportInput = React.memo((props: IProps) => {
  const { dataReport, setIsEditReport } = props;
  const intl = useIntl();
  const { lang } = useMultiLanguage();
  const [searchObject, setSearchObject] = useState<any>({});
  const [isView, setIsView] = useState<boolean>(props?.isView || false);
  const { setPageLoading } = useContext(AppContext);
  const [title, setTitle] = useState("REPORT_INPUT.PERFORMANCE_REPORT");

  const validationSchema = Yup.object().shape({
    fromDate: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
    toDate: Yup.date()
      .min(Yup.ref("fromDate"), lang("VALIDATION.MINDATE") + lang("INPUT.DATERANGE"))
      .required(lang("VALIDATION.REQUIRE"))
      .nullable(),
    khoaBaoCao: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    dieuDuongTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
    dieuDuongTrucTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
    dieuDuongTruc: Yup.array()
      .of(Yup.object().shape({}))
      .required(lang("VALIDATION.REQUIRE"))
      .min(1, lang("VALIDATION.MINLENGTH"))
      .nullable(),
    dieudDuongHienCo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
    dieuDuongVang: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),

    dieuDuongNghiOmTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).when("dieuDuongVang", {
      is: (dieuDuongVang: any) => dieuDuongVang > 0,
      then: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
      otherwise: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
    }),
    dieuDuongNghiOm: Yup.array()
      .of(Yup.object().shape({}))
      .min(1, lang("VALIDATION.MINLENGTH"))
      .nullable(),
    dieuDuongCongTacTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).when("dieuDuongVang", {
      is: (dieuDuongVang: any) => dieuDuongVang > 0,
      then: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
      otherwise: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
    }),
    dieuDuongCongTac: Yup.array()
      .of(Yup.object().shape({}))
      .min(1, lang("VALIDATION.MINLENGTH"))
      .nullable(),
    dieuDuongNghiTrucTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).when("dieuDuongVang", {
      is: (dieuDuongVang: any) => dieuDuongVang > 0,
      then: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
      otherwise: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
    }),
    dieuDuongNghiTruc: Yup.array()
      .of(Yup.object().shape({}))
      .min(1, lang("VALIDATION.MINLENGTH"))
      .nullable(),
    dieuDuongDiHocTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).when("dieuDuongVang", {
      is: (dieuDuongVang: any) => dieuDuongVang > 0,
      then: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
      otherwise: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
    }),
    danhSachDiHoc: Yup.array()
      .of(Yup.object().shape({}))
      .min(1, lang("VALIDATION.MINLENGTH"))
      .nullable(),
    dieuDuongChoHuuTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).when("dieuDuongVang", {
      is: (dieuDuongVang: any) => dieuDuongVang > 0,
      then: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
      otherwise: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
    }),
    dieuDuongChoHuu: Yup.array()
      .of(Yup.object().shape({}))
      .min(1, lang("VALIDATION.MINLENGTH"))
      .nullable(),
    dieuDuongNghiKhacTongSo: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).when("dieuDuongVang", {
      is: (dieuDuongVang: any) => dieuDuongVang > 0,
      then: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).required(lang("VALIDATION.REQUIRE")).nullable(),
      otherwise: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
    }),
    dieuDuongNghiKhac: Yup.array()
      .of(Yup.object().shape({}))
      .min(1, lang("VALIDATION.MINLENGTH"))
      .nullable(),
    soLuongDangCongTac: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
    soLuongNghiHuu: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY")).nullable(),
  });

  const validationSchemaTable = Yup.object().shape({
    dataArray: Yup.array().of(
      Yup.object().shape({
        maBenhNhan: Yup.string()
          .matches(REGEX.CHARACTER30, lang("VALIDATION.MAX30"))
          .required(lang("VALIDATION.REQUIRE"))
          .nullable(),
        hoTen: Yup.string()
          .required(lang("VALIDATION.REQUIRE"))
          .matches(REGEX.CHARACTER255, lang("VALIDATION.MAX255"))
          .matches(REGEX.TEN, lang("VALIDATION.INVALID_NAME"))
          .nullable(),
        maVienPhi: Yup.string()
          .required(lang("VALIDATION.REQUIRE"))
          .matches(REGEX.CHARACTER30, lang("VALIDATION.MAX30"))
          .nullable(),
        donTiepCanCuocCongDan: Yup.mixed().required(lang("VALIDATION.REQUIRE")).nullable(),
        soBaoHiemYTe: Yup.string()
          .required(lang("VALIDATION.REQUIRE"))
          .matches(REGEX.CHARACTER15, lang("VALIDATION.LENGTH15"))
          .nullable(),
        canCuocCongDan: Yup.string()
          .required(lang("VALIDATION.REQUIRE"))
          .matches(REGEX.CHARACTER9or12, lang("VALIDATION.CHARACTER9OR12"))
          .nullable(),
        tuyenKhamChuaBenh: Yup.mixed().required(lang("VALIDATION.REQUIRE")).nullable(),
        gioiTinh: Yup.mixed().required(lang("VALIDATION.REQUIRE")).nullable(),
        // tuoiVaoVien: Yup.number().typeError(lang("VALIDATION.NUMBER_ONLY"))
        //   .required(lang("VALIDATION.REQUIRE"))
        //   .min(0, lang("VALIDATION.MINVALUE1"))
        //   .max(100, lang("VALIDATION.MAXVALUE100"))
        //   .nullable(),
        ngaySinh: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        doiTuong: Yup.mixed().required(lang("VALIDATION.REQUIRE")).nullable(),
        phongDieuTri: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        buongDieuTri: Yup.string().required(lang("VALIDATION.REQUIRE")).max(255, lang("VALIDATION.MAX255")).nullable(),
        giuongDieuTri: Yup.string().required(lang("VALIDATION.REQUIRE")).max(255, lang("VALIDATION.MAX255")).nullable(),
        bacSiDieuTri: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        maBenh: Yup.string().required(lang("VALIDATION.REQUIRE")).max(100, lang("VALIDATION.MAX100")).nullable(),
        tenBenh: Yup.string().required(lang("VALIDATION.REQUIRE")).max(500, lang("VALIDATION.MAX500")).nullable(),
        maBenhKemTheo: Yup.string().required(lang("VALIDATION.REQUIRE")).max(100, lang("VALIDATION.MAX100")).nullable(),
        tenBenhKemTheo: Yup.string()
          .required(lang("VALIDATION.REQUIRE"))
          .max(500, lang("VALIDATION.MAX500"))
          .nullable(),
        diaChi: Yup.string().max(1000, lang("VALIDATION.MAX1000")).nullable(),
        hoTenBo: Yup.string()
          .matches(REGEX.CHARACTER255, lang("VALIDATION.MAX255"))
          .matches(REGEX.TEN, lang("VALIDATION.INVALID_NAME"))
          .nullable(),
        soDienThoaiBo: Yup.string().matches(REGEX.CHECK_PHONE, lang("VALIDATION.ISPHONE")).nullable(),
        hoTenMe: Yup.string()
          .matches(REGEX.CHARACTER255, lang("VALIDATION.MAX255"))
          .matches(REGEX.TEN, lang("VALIDATION.INVALID_NAME"))
          .nullable(),
        soDienThoaiMe: Yup.string().matches(REGEX.CHECK_PHONE, lang("VALIDATION.ISPHONE")).nullable(),
        soDienThoai: Yup.string().matches(REGEX.CHECK_PHONE, lang("VALIDATION.ISPHONE")).nullable(),
        soDienThoaiNguoiNha: Yup.string().matches(REGEX.CHECK_PHONE, lang("VALIDATION.ISPHONE")).nullable(),
        vaoTuKhoa: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        ngayVaoKhoa: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        hinhThucVaoKhoa: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
        hoTenNguoiNha: Yup.string()
          .matches(REGEX.CHARACTER255, lang("VALIDATION.MAX255"))
          .matches(REGEX.TEN, lang("VALIDATION.INVALID_NAME"))
          .nullable(),
        ngayRaKhoa: Yup.string().nullable(),
        xuTri: Yup.mixed().required(lang("VALIDATION.REQUIRE")).nullable(),
        ketQuaDieuTri: Yup.string().nullable(),
        soNgayDieuTri: Yup.string().nullable(),
        chuyenDenKhoa: Yup.string().nullable(),
        benhVienChuyenDi: Yup.string().nullable(),
        ngayDieuTriTiep: Yup.string().nullable(),
      })
    ),
  });

  const formikData = useFormik({
    initialValues: INIT_REPORT_DATA,
    validationSchema: !dataReport?.id && validationSchema,
    onSubmit: (values) => { },
  });

  const formikTable = useFormik({
    initialValues: { dataArray: DATA_IMPORT },
    validationSchema: !dataReport?.id && validationSchemaTable,
    onSubmit: (values) => { },
  });

  const handlechange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    unstable_batchedUpdates(() => {
      const { value, name } = e?.target;
      formikData.setFieldValue(name, value);
    });
  }, []);

  const handleSelect = useCallback((name: string, value: any) => {
    unstable_batchedUpdates(() => {
      formikData.setFieldValue(name, value);
    });
  }, []);

  const handleSelectTable = useCallback(
    (name: string, value: any, index: number, itemList: any, message: string = "") => {
      unstable_batchedUpdates(() => {
        const updatedItem = {
          ...itemList[index],
          [name]: value?.code,
          [message]: "",
        };
        itemList[index] = updatedItem;
        formikTable.setFieldValue("dataArray", itemList);
      });
    },
    []
  );

  const handleChangeTable = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number, itemList: any, message: string = "") => {
      unstable_batchedUpdates(() => {
        const { value, name } = e?.target;
        const updatedItem = {
          ...itemList[index],
          [name]: value,
          [message]: "",
        };
        itemList[index] = updatedItem;
        formikTable.setFieldValue("dataArray", itemList);
      });
    },
    []
  );

  const clearMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number, itemList: any, message: string = "") => {
      if (!itemList[index][message]) return;

      unstable_batchedUpdates(() => {
        const { value, name } = e?.target;
        const updatedItem = {
          ...itemList[index],
          [name]: value,
          [message]: "",
        };
        itemList[index] = updatedItem;
        formikTable.setFieldValue("dataArray", itemList);
      });
    },
    []
  );

  const handleSearch = (data: any = {}) => {
    const dataSearch: any = {
      ...searchObject,
      ...data,
    };

    dataSearch.keyword = dataSearch?.keyword?.trim() || "";
  };

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setPageLoading(true);
        let { data } = await fileUpload(file);
        if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
          const formatData = data?.data?.map(
            (item: any) => {
              return {
                ...item,
                gioiTinh: getCodeFromOptionList(GIOI_TINH, item?.gioiTinh),
                donTiepCanCuocCongDan: getCodeFromOptionList(DON_TIEP_CCCD, item?.donTiepCanCuocCongDan),
                hinhThucVaoKhoa: getCodeFromOptionList(HINH_THUC_VAO_KHOA, item?.hinhThucVaoKhoa),
                tuyenKhamChuaBenh: getCodeFromOptionList(TUYEN_KHAM_CHUA_BENH, item?.tuyenKhamChuaBenh),
                doiTuong: getCodeFromOptionList(DOI_TUONG_BENH_NHAN, item?.doiTuong),
                xuTri: getCodeFromOptionList(XU_TRI, item?.xuTri),
              }
            }
          )
          formikTable.setFieldValue("dataArray", formatData);
        }
      }
    } catch (error) {
      toast.error("Nhập file lỗi");
    } finally {
      setPageLoading(false);
    }
  };

  const checkErrorTable = useCallback((message: string, index: number, formikTable: any, name: string) => {
    return message ? message : formikTable.errors.dataArray && (formikTable.errors?.dataArray[index] as any)?.[name];
  }, []);

  const checkTouchedTable = useCallback((message: string, index: number, formikTable: any, name: string) => {
    return message ? message : formikTable.touched.dataArray && (formikTable.touched?.dataArray[index] as any)?.[name];
  }, []);

  const MemoizedColumns = useMemo(
    () =>
      Columns({
        checkErrorTable,
        checkTouchedTable,
        clearMessage,
        handleChangeTable,
        handleSelectTable,
      }),
    [checkErrorTable, checkTouchedTable, clearMessage, handleChangeTable, handleSelectTable]
  );

  const memoizedTable = useMemo(
    () => (
      <div className="spaces pl-0 table-custom">
        <TableCustom
          id="report-input"
          data={formikTable?.values?.dataArray}
          columns={MemoizedColumns}
          page={searchObject?.pageIndex}
          notDelete={true}
          noToolbar={true}
          fixedColumnsCount={4}
          updatePageData={handleSearch}
          noPagination={true}
          formik={formikTable}
        />
      </div>
    ),
    [formikTable.errors, formikTable.values.dataArray]
  );

  useEffect(() => {
    if (dataReport?.id) {
      let { danhSachBenhNhan, ...dataForm } = dataReport
      formikData.setValues({ ...dataForm })
      formikTable.setValues({ dataArray: danhSachBenhNhan })
    }
  }, [dataReport])

  const handleCombinedSubmit = async (e: any) => {
    e.preventDefault();
    formikData.handleSubmit();
    formikTable.handleSubmit();

    const formikDataIsValid = await formikData.validateForm();
    const formikTableIsValid = await formikTable.validateForm();

    if (checkObject(formikDataIsValid) && checkObject(formikTableIsValid)) {
      try {
        setPageLoading(true);

        const dataReport: any = JSON.stringify({
          ...formikData.values,
          departmentId: formikData.values?.khoaBaoCao?.code,
          fromDate: moment(formikData.values?.fromDate).format("DD/MM/YYYY"),
          toDate: moment(formikData.values?.toDate).format("DD/MM/YYYY"),
          danhSachBenhNhan: [...formikTable.values.dataArray],
          capTuong: {
            soLuongDangCongTac: formikData.values?.soLuongDangCongTac,
            soLuongNghiHuu: formikData.values?.soLuongNghiHuu,
          },
        });
        const data = await sendReport(dataReport);
        if (data?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
          toast.success("Gửi thành công!");
        }
        if (data?.data?.code === RESPONSE_STATUS_CODE.CONFLICT) {
          formikTable.setFieldValue("dataArray", data?.data?.data);
        }
      } catch (error) {
        toast.error("Gửi báo cáo lỗi");
      } finally {
        setPageLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!formikData.values?.fromDate)
      formikData.setFieldValue("fromDate", moment().subtract(1, "days").format("YYYY-MM-DD"));
    if (formikData.values?.fromDate)
      formikData.setFieldValue("toDate", moment(formikData.values?.fromDate).add(1, "days").format("YYYY-MM-DD"));
  }, [formikData.values?.fromDate]);

  return (
    <div className="report-input">
      <form onSubmit={handleCombinedSubmit}>
        <div className="layout-v2">
          {
            !dataReport?.id &&
            <div className="header-container bg-white">
              <span className="fs-1 fw-bold text-center">{intl.formatMessage({ id: title })}</span>
            </div>
          }
          <div className="max-height">
            <div className="block-content">
              <Row>
                <Col xs={6} sm={6} md={6} lg={3}>
                  <TextValidator
                    className="flex-row min-w-80"
                    max={`${moment().subtract(1, "days").format("YYYY-MM-DD")}`}
                    lable={"Ngày báo cáo"}
                    isRequired
                    name="fromDate"
                    readOnly={isView}
                    value={formikData.values?.fromDate || ""}
                    type="date"
                    onChange={handlechange}
                    errors={formikData.errors?.fromDate}
                    touched={formikData.touched?.fromDate}
                  />
                </Col>
                <Col xs={6} sm={6} md={6} lg={3}>
                  <TextValidator
                    className="flex-row min-w-80"
                    min={`${moment(formikData.values?.fromDate).add(1, "days").format("YYYY-MM-DD")}`}
                    lable={"Đến ngày"}
                    readOnly={isView}
                    isRequired
                    name="toDate"
                    value={formikData.values?.toDate || ""}
                    type="date"
                    onChange={handlechange}
                    errors={formikData.errors?.toDate}
                    touched={formikData.touched?.toDate}
                  />
                </Col>
                <Col xs={6} sm={6} md={6} lg={3}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-8 width-100"
                      lable={"Khoa báo cáo"}
                      isDisabled={isView}
                      options={LIST_KHOA_PHONG}
                      isRequired
                      value={formikData.values?.khoaBaoCao || null}
                      name="khoaBaoCao"
                      onChange={(selectedOption) => {
                        handleSelect("khoaBaoCao", selectedOption);
                      }}
                      errors={formikData.errors?.khoaBaoCao}
                      touched={formikData.touched?.khoaBaoCao}
                    />
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={3}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Mã khoa phòng"}
                    readOnly={true}
                    name="maKhoaPhong"
                    value={formikData.values?.khoaBaoCao?.code || ""}
                    type="text"
                  />
                </Col>
              </Row>
            </div>
            <div className="block-content">
              <span className="text-header">{lang("REPORT_INPUT.PERSONNEL")}</span>
              <Row>
                <Col xs={6} sm={6} md={3} lg={3}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Tổng số ĐD"}
                    readOnly={isView}
                    isRequired
                    name="dieuDuongTongSo"
                    value={formikData.values?.dieuDuongTongSo}
                    type="text"
                    onChange={handlechange}
                    errors={formikData.errors?.dieuDuongTongSo}
                    touched={formikData.touched?.dieuDuongTongSo}
                  />
                </Col>
                <Col xs={6} sm={6} md={3} lg={3}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Số ĐD hiện có"}
                    readOnly={isView}
                    isRequired
                    name="dieudDuongHienCo"
                    value={formikData.values?.dieudDuongHienCo || ""}
                    type="text"
                    errors={formikData.errors?.dieudDuongHienCo}
                    touched={formikData.touched?.dieudDuongHienCo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={6} sm={6} md={3} lg={3}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Số ĐD trực"}
                    readOnly={isView}
                    isRequired
                    name="dieuDuongTrucTongSo"
                    value={formikData.values?.dieuDuongTrucTongSo || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongTrucTongSo}
                    touched={formikData.touched?.dieuDuongTrucTongSo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={6} sm={6} md={3} lg={3}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Số ĐD vắng"}
                    readOnly={isView}
                    isRequired
                    name="dieuDuongVang"
                    value={formikData.values?.dieuDuongVang || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongVang}
                    touched={formikData.touched?.dieuDuongVang}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-7 width-100"
                      lable={"Chọn ĐD trực"}
                      isDisabled={isView}
                      options={listNurse}
                      isRequired
                      value={formikData.values?.dieuDuongTruc || null}
                      name="dieuDuongTruc"
                      onChange={(selectedOption) => {
                        handleSelect("dieuDuongTruc", selectedOption);
                      }}
                      isMulti
                      styles={heightSelectMutil("auto", "30px")}
                      getOptionValue={(option) => option?.name}
                      errors={formikData.errors?.dieuDuongTruc}
                      touched={formikData.touched?.dieuDuongTruc}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="block-content">
              <Row>
                <Col xs={4} sm={4} md={3} lg={3} xl={2}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Nghỉ ốm"}
                    readOnly={isView}
                    name="dieuDuongNghiOmTongSo"
                    value={formikData.values?.dieuDuongNghiOmTongSo || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongNghiOmTongSo}
                    touched={formikData.touched?.dieuDuongNghiOmTongSo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={4}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-6 width-100"
                      lable={"DS nghỉ ốm"}
                      name="dieuDuongNghiOm"
                      isDisabled={isView}
                      options={listNurse}
                      isMulti
                      styles={heightSelectMutil("auto", "30px")}
                      value={formikData.values?.dieuDuongNghiOm || null}
                      onChange={(selectedOption) => {
                        handleSelect("dieuDuongNghiOm", selectedOption);
                      }}
                      getOptionValue={(option) => option?.name}
                      errors={formikData.errors?.dieuDuongNghiOm}
                      touched={formikData.touched?.dieuDuongNghiOm}
                    />
                  </div>
                </Col>
                <Col xs={4} sm={4} md={3} lg={3} xl={2}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Nghỉ trực"}
                    readOnly={isView}
                    name="dieuDuongNghiTrucTongSo"
                    value={formikData.values?.dieuDuongNghiTrucTongSo || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongNghiTrucTongSo}
                    touched={formikData.touched?.dieuDuongNghiTrucTongSo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={4}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-6 width-100"
                      lable={"DS nghỉ trực"}
                      name="dieuDuongNghiTruc"
                      isDisabled={isView}
                      options={listNurse}
                      isMulti
                      styles={heightSelectMutil("auto", "30px")}
                      value={formikData.values?.dieuDuongNghiTruc || null}
                      onChange={(selectedOption) => {
                        handleSelect("dieuDuongNghiTruc", selectedOption);
                      }}
                      getOptionValue={(option) => option?.name}
                      errors={formikData.errors?.dieuDuongNghiTruc}
                      touched={formikData.touched?.dieuDuongNghiTruc}
                    />
                  </div>
                </Col>
                <Col xs={4} sm={4} md={3} lg={3} xl={2}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Công tác"}
                    readOnly={isView}
                    name="dieuDuongCongTacTongSo"
                    value={formikData.values?.dieuDuongCongTacTongSo || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongCongTacTongSo}
                    touched={formikData.errors?.dieuDuongCongTacTongSo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={4}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-5 width-100"
                      lable={"DS công tác"}
                      name="dieuDuongCongTac"
                      isDisabled={isView}
                      options={listNurse}
                      isMulti
                      styles={heightSelectMutil("auto", "30px")}
                      value={formikData.values?.dieuDuongCongTac || null}
                      onChange={(selectedOption) => {
                        handleSelect("dieuDuongCongTac", selectedOption);
                      }}
                      getOptionValue={(option) => option?.name}
                      errors={formikData.errors?.dieuDuongCongTac}
                      touched={formikData.touched?.dieuDuongCongTac}
                    />
                  </div>
                </Col>
                <Col xs={4} sm={4} md={3} lg={3} xl={2}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Đi học"}
                    readOnly={isView}
                    name="dieuDuongDiHocTongSo"
                    value={formikData.values?.dieuDuongDiHocTongSo || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongDiHocTongSo}
                    touched={formikData.touched?.dieuDuongDiHocTongSo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={4}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-5 width-100"
                      lable={"DS đi học"}
                      name="danhSachDiHoc"
                      isDisabled={isView}
                      options={listNurse}
                      isMulti
                      styles={heightSelectMutil("auto", "30px")}
                      value={formikData.values?.danhSachDiHoc || null}
                      onChange={(selectedOption) => {
                        handleSelect("danhSachDiHoc", selectedOption);
                      }}
                      getOptionValue={(option) => option?.name}
                      errors={formikData.errors?.danhSachDiHoc}
                      touched={formikData.touched?.danhSachDiHoc}
                    />
                  </div>
                </Col>
                <Col xs={4} sm={4} md={3} lg={3} xl={2}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Chờ hưu"}
                    readOnly={isView}
                    name="dieuDuongChoHuuTongSo"
                    value={formikData.values?.dieuDuongChoHuuTongSo || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongChoHuuTongSo}
                    touched={formikData.touched?.dieuDuongChoHuuTongSo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={4}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-4 width-100"
                      lable={"DS chờ hưu"}
                      name="dieuDuongChoHuu"
                      isDisabled={isView}
                      options={listNurse}
                      isMulti
                      styles={heightSelectMutil("auto", "30px")}
                      value={formikData.values?.dieuDuongChoHuu || null}
                      onChange={(selectedOption) => {
                        handleSelect("dieuDuongChoHuu", selectedOption);
                      }}
                      getOptionValue={(option) => option?.name}
                      errors={formikData.errors?.dieuDuongChoHuu}
                      touched={formikData.touched?.dieuDuongChoHuu}
                    />
                  </div>
                </Col>
                <Col xs={4} sm={4} md={3} lg={3} xl={2}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Khác"}
                    readOnly={isView}
                    name="dieuDuongNghiKhacTongSo"
                    value={formikData.values?.dieuDuongNghiKhacTongSo || ""}
                    type="text"
                    errors={formikData.errors?.dieuDuongNghiKhacTongSo}
                    touched={formikData.touched?.dieuDuongNghiKhacTongSo}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={4}>
                  <div className="h-36 flex-row min-w-80">
                    <Autocomplete
                      className="spaces z-index-4 width-100"
                      lable={"DS nghỉ khác"}
                      name="dieuDuongNghiKhac"
                      isDisabled={isView}
                      options={listNurse}
                      isMulti
                      styles={heightSelectMutil("auto", "30px")}
                      value={formikData.values?.dieuDuongNghiKhac || null}
                      onChange={(selectedOption) => {
                        handleSelect("dieuDuongNghiKhac", selectedOption);
                      }}
                      getOptionValue={(option) => option?.name}
                      errors={formikData.errors?.dieuDuongNghiKhac}
                      touched={formikData.touched?.dieuDuongNghiKhac}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="block-content spaces pb-6">
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} className="flex">
                  <span className="text-header">{lang("REPORT_INPUT.PATIENT")}</span>
                  <label htmlFor="button-import-file" className="spaces button-primary ml-10 h-30 w-80" onClick={() => { }}>
                    Import File
                  </label>
                  <input readOnly={isView} disabled={isView} id="button-import-file" type="file" onChange={(e) => !isView && handleChangeFile(e)} />
                </Col>
                <Col xs={6} sm={6} md={4} lg={4}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Cấp tướng đang công tác"}
                    name="soLuongDangCongTac"
                    readOnly={isView}
                    value={formikData.values?.soLuongDangCongTac || ""}
                    type="text"
                    errors={formikData.errors?.soLuongDangCongTac}
                    touched={formikData.touched?.soLuongDangCongTac}
                    onChange={handlechange}
                  />
                </Col>
                <Col xs={6} sm={6} md={4} lg={4}>
                  <TextValidator
                    className="flex-row min-w-80"
                    lable={"Cấp tướng nghỉ hưu"}
                    name="soLuongNghiHuu"
                    readOnly={isView}
                    value={formikData.values?.soLuongNghiHuu || ""}
                    type="text"
                    onChange={handlechange}
                    errors={formikData.errors?.soLuongNghiHuu}
                    touched={formikData.touched?.soLuongNghiHuu}
                  />
                </Col>
              </Row>
              <div className="spaces pl-0 table-custom">{memoizedTable}</div>
            </div>
          </div>
          <div className="flex-center fixed-bottom">
            <button className="spaces button-primary py-4 fs-12 h-30" type="submit">
              Lưu báo cáo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});
export { ReportInput };
