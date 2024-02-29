interface IGeneralParameters {
    code?: string
    name?: string
    keyword?: string
    pageIndex?: number
    pageSize?: number
}

export interface IParamsSimpleCategory extends IGeneralParameters {
    type?: number
    parentId?: string
    path?: string
    uuidKey?: string
}

export interface IParamsSearchNhanVien extends IGeneralParameters {
    department?: string
    positionId?: string
    roomId?: string
    titleId?: string
    email?: string
}

export interface IParamsSearchLocation extends IGeneralParameters {
    communeId?: number
    districtId?: number
    provinceId?: number
}

export interface IParamsSearchTaiKhoan extends IGeneralParameters {
    staffName?: string
    username?: string
    roleName?: string
    email?: string
    userId?: string
}

export interface IParamsSearchNhaCungCap {
    pageIndex: number | string,
    pageSize: number | string,
    keyword?: string,
    provinceId?: string | number,
    unitId?: string | number
}