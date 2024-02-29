export type IStatisticalChart = {
  id?: number;
  options: any;
  keys?: string[];
  title?: string;
  height?: number | string;
  type?: string;
  typeId?: number;
}

export type IDataStatisticalResponse = {
  nam: number;
  gioitinhNam: number;
  gioitinhNu: number;
  gioitinhKhac: number;
  dotuoiDuoi30: number;
  dotuoi3140: number;
  dotuoi4150: number;
  dotuoi5160: number;
  dotuoiTren60: number;
}