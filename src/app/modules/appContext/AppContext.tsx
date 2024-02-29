import React, { FC, createContext, useState } from "react";
import { ItemBreakCrumb, menu, tabs } from "./AppContextModel";
import { WithChildren } from "../../../_metronic/helpers";
import ScreenLoader from "../component/loading/ScreenLoader";

type AppContextProps = {
    breakCrumb: ItemBreakCrumb[];
    DSMenu: menu[];
    DSTabs: tabs[];
    eventKey?: string;
    currentTab?: string;
    currentTabChildren?: string;
    isLoading?: boolean;
    thongTinBenhNhan?: any
    setBreakCrumb: (breakCrumb: ItemBreakCrumb[]) => void;
    setDSMenu: (DSMenu: menu[]) => void;
    setDSTabs: (DSTabs: tabs[]) => void;
    setEventKey: (eventKey: string | undefined) => void;
    setCurrentTab: (eventKey: string | undefined) => void;
    setCurrentTabChildren: (eventKey: string | undefined) => void;
    setIsLoading: (isLoading: boolean) => void;
    setInfoBenhNhanContext: (thongTinBenhNhan: any) => void;
}

const initAppContextPropsState = {
    breakCrumb: [],
    DSMenu: [],
    DSTabs: [],
    eventKey: undefined as string | undefined,
    currentTab: undefined as string | undefined,
    isLoading: false,
    thongTinBenhNhan: {},
    setInfoBenhNhanContext: () => {},
    setDSMenu: () => { },
    setBreakCrumb: () => { },
    setDSTabs: () => { },
    setEventKey: () => { },
    setCurrentTab: () => { },
    setCurrentTabChildren: () => { },
    setIsLoading: () => {},
}

export const AppContext = createContext<AppContextProps>(initAppContextPropsState)

const AppContextProvider: FC<WithChildren> = ({ children }) => {
    const [eventKey, setEventKey] = useState<string | undefined>();
    const [currentTab, setCurrentTab] = useState<string | undefined>();
    const [currentTabChildren, setCurrentTabChildren] = useState<string | undefined>();
    const [breakCrumb, setBreakCrumb] = useState<ItemBreakCrumb[]>([]);
    const [DSMenu, setDSMenu] = useState<menu[]>([]);
    const [DSTabs, setDSTabs] = useState<tabs[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [thongTinBenhNhan, setInfoBenhNhanContext] = useState<any>();

    return (
        <AppContext.Provider
            value={{
                breakCrumb, setBreakCrumb,
                DSMenu, setDSMenu,
                DSTabs, setDSTabs,
                eventKey, setEventKey,
                currentTab, setCurrentTab,
                isLoading, setIsLoading,
                thongTinBenhNhan, setInfoBenhNhanContext,
                currentTabChildren, setCurrentTabChildren
            }}
        >
            {isLoading && <ScreenLoader />}
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
