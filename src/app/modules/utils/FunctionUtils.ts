// @ts-nocheck
import moment from "moment";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { IItemSearch } from "../profile/models/ProfileModels";
import { localStorageItem } from "./LocalStorage";
import { NUMBER_EXCEPT_THIS_SYMBOLS, TYPE, VARIABLE_STRING, EXTENSIONS } from "./Constant";
import { TMenu, allMenu } from "../../pages/Homepage/listMenu";
import { RESPONSE_STATUS_CODE } from "./Constant";
import generatePDF, { Options } from "react-to-pdf";
import { getDSChucDanh, getDSChucVu, getDSPhongBan } from "../bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices";
import { KEY_LOCALSTORAGE } from "../auth/core/_consts";
import { getListNhanVien } from "../bien-ban-hop/services/BienBanHopServices";
import debounce from 'lodash/debounce';
import * as echarts from "echarts";

export const checkTypeOf = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};
export const covertDateToString = (value: any) => {
  return value ? moment(value).format("YYYY-MM-DD") : "";
};

export function useCustomIntl(messageId: string) {
  const intl = useIntl();
  return intl.formatMessage({ id: messageId });
}

export const exportToExcel = async (exportAPI: AxiosPromise<any>) => {
  try {
    const data = await exportAPI();
    if (data.status === RESPONSE_STATUS_CODE.SUCCESS) {
      const url = window.URL.createObjectURL(new Blob([data.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DanhSach.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Export thành công");
    } else {
      toast.error("Lỗi hệ thống");
    }
  } catch (error) {
    toast.error("Lỗi hệ thống");
  }
};

export const hasAuthority = (permission: string, ability: string, type?: string): boolean => {
  const authoritiesString = localStorage.getItem("authorities");
  const authorities = authoritiesString ? JSON.parse(authoritiesString) : {};
  const permissionAndAbility = type === TYPE?.MODULE ? `${permission}_${ability}` : `${permission}.${ability}`;
  return authorities[permissionAndAbility];
};

export const hasRole = (permission): boolean => {
  const authorities = localStorageItem.get("authorities") || {};
  return authorities[permission];
};

export const checkInvalidDate = (date: any) => {
  const newDate = new Date(date);
  if (1900 > newDate.getFullYear() || newDate.getFullYear() > 9999) {
    return true;
  }
  return isNaN(Date.parse(newDate));
};

export const handleBlurDate = (setFieldValue, date, name) => {
  if (checkInvalidDate(date)) {
    setFieldValue(name, null);
    return;
  }
}

export const checkObject = (obj: any) => {
  return Object.keys(obj ? obj : {}).length === 0;
};

export const formatDateTable = (date) => {
  const newDate = new Date(date)
  return date ? moment(newDate).format("DD/MM/YYYY") : null;
};

export const convertSearch = (data: any[]) => {
  let dataSearch: any = {}
  data.forEach((item: IItemSearch) => {
    if(item.field === VARIABLE_STRING.GENDER) {
      dataSearch.gender = item.value?.code || null;
    }else {
      dataSearch[item.field] = item.value || null
    }
  })
  return dataSearch;
}

export const numberExceptThisSymbols = (event: any) => {
  return NUMBER_EXCEPT_THIS_SYMBOLS.includes(event?.key) && event.preventDefault()
}

export const removeDiacritics = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export const formatDateTime = (date) => {
  const newDate = new Date(date)
  return date ? moment(newDate).format("YYYY-MM-DD") : null;
};

export const formatDateParam = (date) => {
  return date ? moment(date).format("DD/MM/YYYY hh:mm:ss") : null;
};

export const checkMenuByPermissions = (): TMenu[] => {
  const checkedMenu: TMenu[] = [];
  allMenu.forEach((menu) => {
    const filteredSubMenu: TSubMenu[] = [];
    if (hasAuthority(menu.permission, menu.ability)) {
      menu.subMenu.forEach((subMenu) => {
        if (hasAuthority(subMenu.permission, subMenu.ability)) {
          filteredSubMenu.push(subMenu);
        }
      });
      const checkedMenuItems: TMenu = {
        ...menu,
        subMenu: filteredSubMenu,
      };
      checkedMenu.push(checkedMenuItems);
    }
  });
  return checkedMenu; //khi có phân quyền sẽ check
  // return allMenu;
};

export const convertTextPrice = (value: string) => {
  return String(value).replace(/\D/g, '');
}

export const convertNumberPrice = (value: number | string | null) => {
  const valueNumber = String(value).replace(/\D/g, '');
  const number = Number(valueNumber ? valueNumber : 0);
  const plainNumber = number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return plainNumber.substr(0, plainNumber.length - 2);
};

export const addMoreYear = (currentDate: string, quality: number) => {
  if (!currentDate) return "";
  let yearAdd = 365.25 * 24 * 60 * 60 * 1000 * quality;
  let newDate = new Date(new Date(currentDate).getTime() + yearAdd);
  let newYear = newDate.getFullYear();
  let newMonth = newDate.getMonth() + 1;
  let newDay = newDate.getDate();

  return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
};

//Kiểm tra độ sâu của mảng (arr là mảng trong mảng, không hỗ trợ mảng trong object)
export const countArrayDeep = (arr: any[]): number => {
  if (!Array.isArray(arr)) return 0;

  let maxDeep = 1;

  arr.forEach(item => {
    if (Array.isArray(item)) {
      const deep = 1 + countArrayDeep(item);
      maxDeep = Math.max(maxDeep, deep);
    }
  })

  return maxDeep;
}

//Tách các phần tử của mảng theo độ sâu của mảng
export const extractElementsByDepth = (array: any[], level: number = 0, target: any[] = []) => {
  array.forEach((element) => {
    if (Array.isArray(element)) {
      extractElementsByDepth(element, level + 1, target);
    } else {
      target[level] ? target[level].push(element) : (target[level] = [element]);
    }
  });

  return target;
};

//Chuyển đổi số Integer sang số la mã
export const romanize = (num: number): string => {
  if (isNaN(num)) return "NaN";
  let digits = String(+num).split("");
  const  key: string[] = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
      "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
      "","I","II","III","IV","V","VI","VII","VIII","IX"
    ];
  let roman = "";
  let i = 3;
  while (i--) roman = (key[+digits.pop()! + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}; 

export const exportToFile = async (props: IPropsExport) => {
  const { exportAPI, fileName = "Danh sách", setPageLoading, type = TYPE.EXCEL } = props;
  try {
    if(setPageLoading){
      setPageLoading(true);
    }
    const data = await exportAPI(); 

    if (data.status === RESPONSE_STATUS_CODE.SUCCESS) {
      const url = window.URL.createObjectURL(new Blob([data.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.${EXTENSIONS[type]}`);
      document.body.appendChild(link);
      link.click();
      toast.success("Export thành công");
    } else {
      toast.error("Lỗi hệ thống");
    }
  } catch (error) {
    toast.error("Lỗi hệ thống");
  } finally {
    if(setPageLoading){
      setPageLoading(false);
    }
  }
};

export const handlePrint = (id: string) => {
    let content = document.getElementById(id);
    let pri = (document.getElementById("ifmcontentstoprint") as any).contentWindow;
    pri.document.open();

    pri.document.write(`
      <head>
        <style type="text/css" media="print">
          @page {
            margin: 5mm;
          }
        </style>
      </head>
      <body>
        ${content?.innerHTML}
      </body>
    `);


    pri.document.close();
    pri.focus();
    pri.print();
};

export const handleExportPdf = async ({elementId, fileName, setPageLoading}) => {
  setPageLoading(true);
  const options: Options = {
      filename: fileName,
      page: {
          margin: 20
      }
  };
  const getTargetElement = () => document.getElementById(elementId);
  const downloadPdf = async () => generatePDF(getTargetElement, options);

  await downloadPdf();
  setPageLoading(false);
  toast.success("Xuất file thành công");
}

export const getListDeleteItem = (arrBeforeDelete, arrAfterDelete) => {
    const initialIds = arrBeforeDelete?.map(item => item.id);
    const deletedIds = initialIds?.filter(id => !arrAfterDelete.some(item => item.id === id));
    return deletedIds;
}

export const getListCategory = async () => {
    try {
        const res = await getDSChucVu();
        localStorageItem.set(KEY_LOCALSTORAGE.LIST_CHUC_VU, res.data.data);
    } catch (error) {
        toast.error('Lỗi khi lấy danh sách chức vụ');
    }

    try {
        const res = await getDSPhongBan();
        localStorageItem.set(KEY_LOCALSTORAGE.LIST_PHONG_BAN, res.data.data);
    } catch (error) {
        toast.error('Lỗi khi lấy danh sách phòng ban');
    }

    try {
        const res = await getDSChucDanh();
        localStorageItem.set(KEY_LOCALSTORAGE.LIST_CHUC_DANH, res.data.data);
    } catch (error) {
        toast.error('Lỗi khi lấy danh sách chức danh');
    }
    
    try {
        const res = await getListNhanVien();
        localStorageItem.set(KEY_LOCALSTORAGE.LIST_NHAN_VIEN, res.data.data);
    } catch (error) {
        toast.error('Lỗi khi lấy danh sách nhân viên');
    }
};

const handleResize = debounce((entries) => {
  entries.forEach(({ target }: any) => {
    const instance = echarts.getInstanceByDom(target as HTMLElement);
    if (instance) {
      instance.resize();
    }
  });
}, 100);

export const resizeObserver = new window.ResizeObserver(handleResize);

export const convertToChartData = (data: any, color: string[]) => {
  const chartData = Object.keys(data || {}).map((key, index) => {
    return {
      name: data[key].name,
      value: data[key].quantity,
      percent: data[key].percent,
      itemStyle: {
        color: color[index],
      },
      label: {
        position: "inside",
        show: !(data[key].percent === 0),
        formatter: '{d}%'
      }
    };
  });
  return chartData
}