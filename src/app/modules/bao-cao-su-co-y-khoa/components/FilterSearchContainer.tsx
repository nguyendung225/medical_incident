import { Button } from "react-bootstrap";
import { KTSVG } from "../../../../_metronic/helpers";
import InputSearch from "../../component/InputSearch";
import { Dispatch, SetStateAction, useState } from "react";
import AdvancedSearchDialog from "./AdvancedSearchDialog";
import { SearchObject } from "../models/BaoCaoSCYKModels";
import { ISelectOption } from "../../models/models";

type TProps = {
    handleCreate: () => void,
    handleSearch: () => void,
    title: string,
    searchObj: SearchObject,
    handleChangeSearchObj: Dispatch<SetStateAction<SearchObject>>,
    statusOptions: ISelectOption[],
    timeReportLable: string,
    hasAddNew?: boolean,
}

const FilterSearchContainer = ({
    handleCreate,
    handleSearch,
    title,
    searchObj,
    handleChangeSearchObj,
    statusOptions,
    timeReportLable,
    hasAddNew = true,
}: TProps) => {
    const [shouldOpenAdvancedSearchDialog, setShouldOpenAdvancedSearchDialog] = useState(false);

    return (
        <>
            <div className="ds-header">
                <div className="d-flex align-items-center">
                    <KTSVG path={'/media/svg/icons/List ul.svg'} svgClassName="spaces w-14 h-14 mr-10" />
                    <span className="title">
                        {title}
                    </span>
                </div>
                {hasAddNew && (
                    <Button
                        className="button-primary"
                        onClick={handleCreate}
                    >
                        <i className="bi bi-plus m-0"></i>Thêm mới
                    </Button>
                )}
            </div>
            <div className="ds-search-box">
                <div className="box-search">
                    <InputSearch
                        placeholder="Tìm kiếm theo Họ và tên, Mã BN, Mã SC, Tên SC"
                        handleChange={(e) => { 
                            handleChangeSearchObj({...searchObj, keyword: e.target.value}) 
                        }}
                        className="spaces h-32"
                        value={searchObj?.keyword}
                        handleSearch={handleSearch}
                    />
                </div>
                <Button
                    className="button-primary"
                    onClick={() => setShouldOpenAdvancedSearchDialog(true)}
                >
                    <i className="bi bi-search m-0"></i>Tìm kiếm nâng cao
                </Button>
            </div>
            {shouldOpenAdvancedSearchDialog && (
                <AdvancedSearchDialog
                    handleClose={() => setShouldOpenAdvancedSearchDialog(false)}
                    handleSearch={handleSearch}
                    searchObj={searchObj}
                    handleChangeSearchObj={(searchData: SearchObject) => handleChangeSearchObj(searchData)}
                    statusOptions={statusOptions}
                    timeReportLable={timeReportLable}
                />
            )}
        </>
    )
}

export default FilterSearchContainer