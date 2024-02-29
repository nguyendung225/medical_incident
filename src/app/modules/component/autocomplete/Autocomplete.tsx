import clsx from "clsx";
import { FieldHookConfig, useField } from "formik";
import React, { FC, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Select, { GetOptionLabel, mergeStyles } from "react-select";
import { toast } from "react-toastify";
import { AutoCompletePropsV2 } from "../../models/autocomplete";
import { KEY } from "../../utils/Constant";
import { autocompleteStyle, multiValueRemove } from "../StyleComponent";

const AutocompleteV2: FC<AutoCompletePropsV2> = (props: AutoCompletePropsV2) => {
    const { options, onChange, searchFunction, name } = props;
    const [field, meta] = useField(name as string | FieldHookConfig<any>);
    const [optionList, setOptionList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [isCheckDataSrcoll, setIsCheckDataSrcoll] = useState<boolean>(false);
    let styles = {
        ...props?.styles,
        ...(props?.isReadOnly ? multiValueRemove : {}),
        control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
            const color_bg_selected = "#E6FFFB"
            return {
                ...styles,
                backgroundColor: "white",
                color: '#000',
                margin: "5px",
                width: "calc(100% - 10px)",
                cursor: isDisabled ? 'not-allowed' : 'default',
                borderRadius: "6px",
                position: "relative",
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? color_bg_selected
                        : undefined,
                    color: "#000",
                },
                ':hover': {
                    ...styles[':hover'],
                    backgroundColor: !isDisabled
                        ? color_bg_selected
                        : undefined,
                    color: "#000",
                },
            };
        },
    };
    const combinedStyles = mergeStyles(autocompleteStyle, styles);
    const [keyword, setKeyword] = useState("");

    const convertNameUrl = (value: string, item: any) => {
        const array = value.split(".");
        for (let i = 0; i < array.length; i++) {
            item = item?.[array[i]];
        }
        return item;
    };

    const fetchData = async () => {
        if (options?.length > 0 && !props.searchFunction) {
            setOptionList(options);
        } else if (!isLoading) {
            setIsLoading(true);
            try {
                if (props.searchObject !== undefined && props.searchFunction) {
                    let data = await getData(props.searchObject);
                    setPageIndex(props.searchObject?.pageIndex || 1);
                    setOptionList(data);
                    setIsCheckDataSrcoll(data?.length > 0);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        ((isFocus && optionList?.length === 0) || (props?.isSrcoll && !keyword)) &&
            fetchData();
        return () => {
            setIsLoading(false);
        };
    }, [options, searchFunction, isFocus, props.value, keyword]);

    const getData = async (searchObject: any) => {
        const res = await props.searchFunction?.(searchObject);
        let data = props?.urlData
            ? convertNameUrl(props?.urlData, res)
            : res?.data?.data?.content;
        return data;
    };

    useEffect(() => {
        setOptionList([]);
        setSelectedValue(null);
    }, props?.dependencies || []);

    useEffect(() => {
        getValue();
    }, [props.value, optionList]);

    const handleChange = (selectedOption: any) => {
        setSelectedValue(selectedOption);
        onChange?.(selectedOption);
    };
    const combinedClassName = clsx(
        props?.className ? props.className : "w-100",
        clsx(
            props.className,
            props.errors && props.touched && "ac-is-invalid",
            "autocomplete-custom"
        )
    );

    const getValue = () => {
        if (props?.value) {
            setSelectedValue(props?.value);
        } else {
            setSelectedValue(null);
        }
    };

    const handleScrollToBottom = async () => {
        try {
            if (isCheckDataSrcoll) {
                let searchObject = { ...props.searchObject };
                searchObject.pageIndex = pageIndex + 1;
                if (props?.labelSearch) searchObject[props?.labelSearch] = keyword;

                setIsLoading(true);
                let data = await getData(searchObject);
                setPageIndex(pageIndex + 1);
                setIsCheckDataSrcoll(data?.length > 0);
                setOptionList([...optionList, ...data]);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Xảy ra lỗi, vui lòng thử lại!");
        }
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
        if (KEY.SPACE === event.code && !(event.target as HTMLInputElement).value) {
            event.preventDefault();
            return;
        }
    };

    const handleInputChange = (newValue: string) => {
        setKeyword(newValue?.trim());
    };

    const handeBlur = () => {
        setIsFocus(false);
        setKeyword("");
    };

    useEffect(() => {
        searchOption();
    }, [keyword, selectedValue]);

    const searchOption = async () => {
        try {
            if (props?.isSrcoll && !selectedValue) {
                let searchObject = { ...props.searchObject };
                if (props?.labelSearch) searchObject[props?.labelSearch] = keyword;

                setIsLoading(true);
                let data = await getData(searchObject);
                setPageIndex(props.searchObject?.pageIndex || 1);
                setOptionList(data);
                setIsCheckDataSrcoll(data?.length > 0);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Xảy ra lỗi, vui lòng thử lại!");
        }
    };
    const renderTooltip = (props: any) => (
        ((meta.error && meta.touched) || (props?.errors && props?.touched)) ? <Tooltip id="button-tooltip">
            <div className="text-danger">{meta.error ? meta.error : props?.errors}</div>
        </Tooltip> : <div></div>
    );

    return (
        <>
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(props)}
            >
                <div className="w-100">
                    <Select
                        getOptionLabel={(option: GetOptionLabel<any>) =>
                            props.getOptionLabel ? props.getOptionLabel(option) : option.name
                        }
                        getOptionValue={(option: any) =>
                            props.getOptionValue ? props.getOptionValue(option) : option?.value
                        }
                        backspaceRemovesValue={props?.backspaceRemovesValue}
                        options={optionList}
                        noOptionsMessage={({ inputValue }) =>
                            `Không tìm thấy lựa chọn cho "${inputValue}"`
                        }
                        className={combinedClassName}
                        name={props?.name}
                        value={selectedValue}
                        id={props?.id}
                        key={props?.key}
                        onFocus={() => setIsFocus(true)}
                        onBlur={handeBlur}
                        isDisabled={props?.isDisabled}
                        isLoading={isLoading}
                        styles={combinedStyles}
                        minMenuHeight={props?.minMenuHeight}
                        maxMenuHeight={props?.maxMenuHeight}
                        placeholder={
                            <p className="custom-placeholder spaces m-0">
                                {props?.placeholder || "Chọn..."}
                            </p>
                        }
                        onChange={handleChange}
                        menuPortalTarget={document.getElementById("root")}
                        // menuPortalTarget={props?.menuPortalTarget}
                        isMulti={props?.isMulti}
                        closeMenuOnSelect={props?.closeMenuOnSelect}
                        menuPlacement={props?.menuPlacement ? props?.menuPlacement : "auto"}
                        onMenuScrollToBottom={
                            props?.isSrcoll ? handleScrollToBottom : undefined
                        }
                        onKeyDown={handleKeyDown}
                        onInputChange={handleInputChange}
                        hideSelectedOptions={props?.isReadOnly}
                        menuIsOpen={props?.isReadOnly ? false : undefined}
                        isSearchable={
                            props?.isReadOnly
                                ? false
                                : props?.isSearchable !== undefined
                                    ? props?.isSearchable
                                    : true
                        }
                        isClearable={
                            props?.isReadOnly
                                ? false
                                : props?.isClearable !== undefined
                                    ? props?.isClearable
                                    : true
                        }
                    />
                </div>
            </OverlayTrigger>
            {props.touched && props.errors && (
                <div className="invalid-feedback">{props.errors}</div>
            )}
        </>
    );
};
export default AutocompleteV2;
