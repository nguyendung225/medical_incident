import { Tab, Nav, Col, Row } from "react-bootstrap";
import { TabMenuProps } from "../CustomTabMenu";
import { tab } from "../../appContext/AppContextModel";
import "../style.scss"
import React from "react";

function VerticalTabs(props: TabMenuProps) {
    const { danhsachTabs, className, activeTab, onTabChange } = props;

    const handleTabChange = (eventKey: string | null) => {
        if (eventKey) {
            onTabChange?.(eventKey)
        }
    }

    return (
        <div className={`${className ? className : ""} verticalTabs`}>
            <Tab.Container
                id="vertical-tabs-example"
                defaultActiveKey={danhsachTabs[0].eventKey}
                onSelect={(key) => handleTabChange(key)}
            >
                <Row className="h-100">
                    <Col md={2} sx={2} className="p-0">
                        <div className="titleTab">
                            <Nav variant="pills" className="flex-column">
                                {danhsachTabs.map((tab: tab) => (
                                    <Nav.Item key={tab?.eventKey} className="m-0">
                                        <Nav.Link eventKey={tab?.eventKey}>{tab?.title}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </div>
                    </Col>
                    <Col md={10} sx={10}>
                        <div className="contentTab">
                            <Tab.Content>
                                {danhsachTabs.map((tab: tab) => (
                                    <Tab.Pane key={tab?.eventKey} eventKey={tab?.eventKey}>
                                        {React.cloneElement(tab?.component as React.ReactElement, { activeTab: activeTab, onTabChange: onTabChange })}
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </div>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default VerticalTabs;
