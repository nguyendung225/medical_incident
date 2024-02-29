import { ReactNode, useEffect } from "react"
import { IconFolder, IconThinFile } from "./IconSvg"

type TFilterTree = {
    name: string
    code: string
    quantity?: number
    icon?: ReactNode
}

type TTree = {
    code: string,
    name: string,
    filter?: TFilterTree[],
    icon?: ReactNode
    quantity?: number
}

type TSelectTree = {
    code?: string,
    name?: string,
    filter: TTree[],
    icon?: ReactNode
    quantity?: number
}

type TProps = {
    className?: string
    codeCollapses: string[]
    handleChangeCollapsesCode: React.Dispatch<React.SetStateAction<string[]>>
    idSelected: string
    handleChangeSelectId: React.Dispatch<React.SetStateAction<string>>
    selectTree: TSelectTree
    onClickIcon?: boolean | null
}

const SelectTree = (
    { 
        codeCollapses, 
        handleChangeCollapsesCode, 
        idSelected, 
        handleChangeSelectId, 
        selectTree, 
        className,
        onClickIcon, 
    } : TProps
) => {
    const handleCollapse = (code: string ) => {
        if (codeCollapses.includes(code)) {
            handleChangeCollapsesCode(codeCollapses.filter((item: string) => item !== code));
        } else {
            handleChangeCollapsesCode([...codeCollapses, code]);
        }
    };
    
    useEffect(() => {
        handleChangeCollapsesCode([selectTree.code, ...selectTree.filter.map((item: any) => item.code)]);
    }, []);

    function handleSelected(code: string): void {
        if (idSelected === code) {
            handleChangeSelectId("");
        } else {
            handleChangeSelectId(code);
        }
    }

    return (
        <div className={`tree border border-left-0 ${className}`}>
            {
                selectTree.code &&
                <div
                    onClick={() => handleCollapse(selectTree.code ?? "")}
                    className="d-flex align-items-center ms-4"
                >
                    {!selectTree?.icon && <span>
                        {
                            codeCollapses.includes(selectTree.code ?? "")
                                ? (<i className="cursor-pointer bi bi-caret-down-fill text-black spaces pr-10"></i>)
                                : (<i className="cursor-pointer bi bi-caret-right-fill text-black spaces pr-10"></i>)
                        }
                    </span>}
                    <span className="me-10 fw-bold d-flex truncate-text text-pri">{selectTree?.icon && <span className="spaces pr-10 d-flex align-items-center text-pri">{selectTree?.icon}</span>} {selectTree.name}</span>
                </div>
            }
            {(selectTree.code ? codeCollapses.includes(selectTree.code) : true) && selectTree.filter?.map((item) => (
                <>
                    <div
                        className={`${selectTree.code ? "pl-13 spaces": "fw-bold"} d-flex row-tree fw-bold text-gray`}
                        onClick={() => !onClickIcon && handleCollapse(item.code)}
                    >
                        <span>
                            {
                                // item?.filter && item?.filter?.length > 0 &&
                                <div onClick={() => onClickIcon && handleCollapse(item.code)}>
                                    {codeCollapses.includes(item.code)
                                        ? (<i className="cursor-pointer bi bi-caret-down-fill text-black spaces pr-12"></i>)
                                        : (<i className="cursor-pointer bi bi-caret-right-fill text-black spaces pr-12"></i>)}
                                </div>
                            }
                        </span>
                        <span className="cursor-pointer truncate-text d-flex" onClick={() => handleChangeSelectId(item.code)}>{item?.icon && <span className="spaces pr-10 d-flex align-items-center">{item?.icon}</span>}{item.name}</span>
                    </div>
                    {codeCollapses.includes(item.code) &&
                        item?.filter?.map((i) => (
                            <div
                                className={
                                    idSelected?.includes(i.code)
                                        ? `isFilterSelected ${item?.icon ? "pl-38" : "pl-23"} spaces w-100 truncate-text d-flex align-items-center `
                                        : `${item?.icon ? "pl-38" : "pl-23"} spaces w-90 hover-row truncate-text d-flex align-items-center`
                                }
                                onClick={() => handleSelected(i.code)}
                            >
                                {i.quantity ? <span className="quantity">{i.quantity}</span> : item?.icon && <span className="spaces W-10">{i?.icon}</span>}
                                &nbsp;<span className="truncate-text spaces pl-10 row-tree">{i.name}</span>
                            </div>
                        ))}
                </>
            ))}
        </div>
    )
}

export default SelectTree