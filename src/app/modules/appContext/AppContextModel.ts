export interface AppContextModel {
    breakCrumb: ItemBreakCrumb[];
    DSMenu: menu[];
    DSTabs: tabs[];
}

export interface ItemBreakCrumb {
    text: string;
    url: string;
}

export interface tab {
    eventKey?: string;
    title: string;
    component: React.ReactNode;
}

export interface tabs {
    tabs: tab[];
}

export interface menu {
    id?: string;
    key?: string;
    title: string;
    to: string;
    fontIcon?: string;
    children?: menu[];
}