import React, { FC, FormEventHandler, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { tab } from "../../models/tabModels";
import "./tabs.scss";
import { TAB_PHAN_TICH_SCYK_DIALOG } from "../../phan-tich-scyk/constants/constants";

type TabMenuProps = {
    danhsachTabs: tab[];
    keyDanhSachTabs?: string;
    className?: string;
    defaultActiveKey?: string;
    setCurrentTab?: (key: string) => void;
}

export const TabMenu: FC<TabMenuProps> = (props) => {
    const { danhsachTabs, setCurrentTab } = props;
    const [activeTab, setActiveTab] = useState<string>(props?.defaultActiveKey || TAB_PHAN_TICH_SCYK_DIALOG.TAB_NHAN_VIEN_CHUYEN_TRACH);
    const [tabs, setTabs] = useState<tab[]>([]);

    useEffect(() => {
      setActiveTab(props?.defaultActiveKey || TAB_PHAN_TICH_SCYK_DIALOG.TAB_NHAN_VIEN_CHUYEN_TRACH);
    }, [props?.defaultActiveKey]);

    useEffect(() => { 
        setTabs(danhsachTabs);
    }, [danhsachTabs])

    const handleTabSelect: (eventKey: string | null) => void = (eventKey) => {
        if (eventKey) {
          setActiveTab(eventKey);
          setCurrentTab?.(eventKey);
        }
    };

    return (
      <Tabs
        className={`tabs nav nav-tabs customs-tabs ${props.className}`}
        activeKey={activeTab}
        onSelect={handleTabSelect}
      >
        {tabs.map((item, index) => {
          return (
            <Tab
              className="tab"
              eventKey={index}
              key={item.eventKey}
              title={
                <div className="label">
                  <span>{item?.title}</span>
                </div>
              }
            >
              {item.component}
            </Tab>
          );
        })}
      </Tabs>
    );
}

export default TabMenu;
