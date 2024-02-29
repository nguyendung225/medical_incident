import { FC, useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext/AppContext";
import { Tab, Tabs } from "react-bootstrap";
import { tab } from "../appContext/AppContextModel";
import { localStorageItem } from "../utils/LocalStorage";

export type TabMenuProps = {
    danhsachTabs: tab[];
    keyDanhSachTabs?: string;
    setIsDataTab?: (value: boolean) => void;
    isCloseTab?: boolean;
    listDisabledTab?: string[];
    className?: string;
    onTabChange?: (activeTab: string | null) => void;
    activeTab?: string | null;
    childrenTab?: boolean | null;
    classNameTabContent?: string;
}

export const CustomTabMenu: FC<TabMenuProps> = (props) => {
    const { danhsachTabs, keyDanhSachTabs, isCloseTab, listDisabledTab, childrenTab, classNameTabContent } = props;
    let data = localStorageItem.get(keyDanhSachTabs) || [];
    const { setEventKey, currentTab, setCurrentTab, setCurrentTabChildren, currentTabChildren } = useContext(AppContext);

    const [activeTab, setActiveTab] = useState<string | undefined>(data[0] || "0");
    const [activeTabNow, setActiveTabNow] = useState<string | undefined>(data[0] || "0");
    const [tabs, setTabs] = useState<tab[]>([]);

    useEffect(() => {
        setEventKey('')
        let data = localStorageItem.get(keyDanhSachTabs) || [];
        if (!(data.length > 0)) {
            data.push("0");
            localStorageItem.set(keyDanhSachTabs, data);
        }
    }, []);

    useEffect(() => {
        setActiveTab((childrenTab ? currentTabChildren : currentTab) || "");
        saveActive((childrenTab ? currentTabChildren : currentTab) || "");
    }, [currentTab, currentTabChildren]);

    useEffect(() => {
        if (tabs.length > 0) {
            handleActive(activeTabNow)
        }
    }, [tabs.length])

    useEffect(() => {
        setTabs(danhsachTabs);
    }, [])

    const saveActive = (eventKey: string | undefined) => {
        let data = localStorageItem.get(keyDanhSachTabs) || [];
        const index = data.indexOf(eventKey);
        if (index !== -1) {
            data.splice(index, 1);
            data.unshift(eventKey);
            localStorageItem.set(keyDanhSachTabs, data);
        }
    };

    const handleActive = (eventKey: string | undefined) => {
        setActiveTab(eventKey);
        saveActive(eventKey);
        childrenTab ? setCurrentTabChildren(eventKey) : setCurrentTab?.(eventKey);
    }

    const handleTabSelect: (eventKey: string | null) => void = (eventKey) => {
        if (eventKey) {
            handleActive(eventKey);
        }
    };

    return (
        <Tabs className={`customs-tabs ${props?.className}`} activeKey={activeTab} onSelect={handleTabSelect}>
            {tabs.map((item, index) => {
                let isDisabled = listDisabledTab?.some((tabItem: string) => index === +tabItem);
                return (
                    <Tab className={`tab ${classNameTabContent}`}
                        eventKey={index}
                        key={index}
                        title={
                            <div className={`${isCloseTab ? "spaces pr-10" : ""} label ${isDisabled ? "disabled-tab" : ""}`}>
                                <span>{item?.title}</span>
                            </div>
                        }
                        disabled={isDisabled}
                    >
                        {item.component}
                    </Tab>
                )
            })}
        </Tabs>
    )
}

export default CustomTabMenu;
