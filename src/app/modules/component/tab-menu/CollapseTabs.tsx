import { Tab, Nav, Col, Row, Collapse } from "react-bootstrap";
import { TabMenuProps } from "../CustomTabMenu";
import { tab, tabs } from "../../appContext/AppContextModel";
import "../style.scss"
import React, { useState } from "react";
import Autocomplete from "../input-field/Autocomplete";

type TCollapseName = "danhMuc" | "danhSach" | "phieuKho" | "baoCao";

type TCollapseTabs = {
    title: string;
    name: TCollapseName;
    collapseList: tab[];
}

type TProps = {
    danhsachTabs?: tab[];
    keyDanhSachTabs?: string;
    setIsDataTab?: (value: boolean) => void;
    isCloseTab?: boolean;
    listDisabledTab?: string[];
    className?: string;
    onTabChange?: (activeTab: string | null) => void;
    activeTab?: string | null;
    collapseTabs: TCollapseTabs[];
    dsKhoThuoc: {}[]
}

function CollapseTabs(props: TProps) {
    const { collapseTabs, className, activeTab, onTabChange, dsKhoThuoc } = props;
    const [isOpenCollapseTabs, setIsOpenCollapseTabs] = useState({
        danhMuc: true,
        danhSach: true,
        phieuKho: true,
        baoCao: true,
    });

    const handleTabChange = (eventKey: string | null) => {
        if (eventKey) {
            onTabChange?.(eventKey)
        }
    }

    const handleOpenCollapseTabs = (collapseName: TCollapseName) => {
        setIsOpenCollapseTabs({ ...isOpenCollapseTabs, [collapseName]: !isOpenCollapseTabs[collapseName] })
    }

    return (
        <div className={`${className ? className : ""} verticalTabs`}>
            <Tab.Container
                id="vertical-tabs-example"
                defaultActiveKey={collapseTabs[0].collapseList[0].eventKey}
                onSelect={(key) => handleTabChange(key)}
            >
                <Row className="h-100">
                    <Col md={2} sx={2} className="p-0">
                        <div className="titleTab">
                            <div className="selectCollapse">
                                <Autocomplete
                                    options={dsKhoThuoc}
                                    name="ward"
                                    placeholder="Chọn kho thuốc..."
                                    // onChange={(selectedOption) => {
                                    //     handleChangeSelect(selectedOption, "ward", setFieldValue);
                                    // }}
                                    // touched={touched?.ward}
                                    // errors={errors?.ward}
                                    // searchFunction={getListCommuneByDistrictId}
                                    // searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, districtId: values?.district?.id }}
                                    // dependencies={[values?.province, values?.district]}
                                    getOptionLabel={option => `${option.code} - ${option.name}`}
                                />
                            </div>
                            {collapseTabs.map(collapseTab => (
                                <>
                                    <div className="collapseTitle" onClick={() => handleOpenCollapseTabs(collapseTab.name)}>
                                        {
                                            isOpenCollapseTabs[`${collapseTab.name}`]
                                                ? <i className="bi bi-caret-down-fill me-2" />
                                                : <i className="bi bi-caret-right-fill me-2" />
                                        }
                                        {collapseTab.title}
                                    </div>
                                    <Collapse className="collapseWrapper" in={isOpenCollapseTabs[collapseTab.name]}>
                                        <div >
                                            <Nav variant="pills" className="flex-column">
                                                {collapseTab.collapseList.map((tab: tab) => (
                                                    <Nav.Item key={tab?.eventKey} className="m-0">
                                                        <Nav.Link eventKey={tab?.eventKey}>{tab?.title}</Nav.Link>
                                                    </Nav.Item>
                                                ))}
                                            </Nav>
                                        </div>
                                    </Collapse>
                                </>
                            ))}
                        </div>
                    </Col>
                    <Col md={10} sx={10}>
                        <div className="contentTab">
                            <Tab.Content>
                                {collapseTabs.map(collapseTab => (
                                    <>
                                        {collapseTab.collapseList.map((tab: tab) => (
                                            <Tab.Pane key={tab?.eventKey} eventKey={tab?.eventKey}>
                                                {React.cloneElement(tab?.component as React.ReactElement, { activeTab: activeTab, onTabChange: onTabChange })}
                                            </Tab.Pane>
                                        ))}
                                    </>
                                ))}
                            </Tab.Content>
                        </div>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default CollapseTabs;
