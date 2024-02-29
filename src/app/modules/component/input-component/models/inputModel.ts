export interface iInputComponent {
    component: React.ReactNode;
    itemData?: iItemData;
    key?: string | number | null;
    data?: any
}

export interface iItemData {
    id?: number;
    dataType: string;
    name?: number;
    code: string;
    units: string;
    value: string;
    children?: iChildren[]
}
export interface iChildren {
    id?: number;
    dataType: string;
    name?: string;
    code: string;
    units?: string;
    value?: string;
    attribute?: any
}
export interface iConceptDto {
    id: number;
    name?: string;
    valueComplex?: string;
    valueNumeric?: number;
    valueText?: string;

}