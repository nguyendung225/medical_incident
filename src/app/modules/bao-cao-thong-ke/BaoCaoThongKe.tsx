import { useState } from "react"
import SearchFilter from "./components/SearchFilter";
import { ISearchObj } from "./models/BaoCaoThongKeModels";
import { INIT_SEARCH_OBJECT, TYPE_OF_REPORT_CODE } from "./constants/constants";
import TabMenu from "../component/tabs/TabMenu";
import BaoCaoTheoDoiTuongXayRa from "./components/BaoCaoTheoDoiTuongXayRa";
import SoTheoDoiSCYK from "./components/SoTheoDoiSCYK";

const BaoCaoThongKe = () => {
    const [searchObj, setSearchObj] = useState<ISearchObj>(INIT_SEARCH_OBJECT)

    const tabList = [
        {
            eventKey: TYPE_OF_REPORT_CODE.BY_OBJECT_OCCURS,
            title: "Báo cáo scyk theo đối tượng xảy ra",
            component: <BaoCaoTheoDoiTuongXayRa searchObj={searchObj} />
        },
        {
            eventKey: TYPE_OF_REPORT_CODE.MEDICAL_INCIDENT_MONITORING_BOOK,
            title: "Sổ theo dõi sự cố y khoa",
            component: <SoTheoDoiSCYK searchObj={searchObj} />
        }
    ]

    return (
        <>
            <SearchFilter 
                handleChangeSearchObj={setSearchObj}
            />

            <div>
                <TabMenu danhsachTabs={tabList} />
            </div>
        </>
    )
}

export default BaoCaoThongKe