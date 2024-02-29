export interface ITreeItem {
  noiDung: string;
  batDau?: string;
  ketThuc?: string;
  tgYLenh?: string;
  khoa?: string;
  phong?: string;
  children?: ITreeItem[];
  khoangCach?: number;
}

export interface IColumnTree {
  title: string;
  field: string;
  className?: string;
  cellStyles?: string;
  render?: any;
}