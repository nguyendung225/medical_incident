import React from 'react'
import { DS_TAB_PEPORT } from './consts/NursingReportConsts'
import "./styles/NursingReport.scss"
import TabMenu from '../component/tabs/TabMenu'

function NursingReport() {
    return (
       <div className='nursing-report'>
            <TabMenu
                danhsachTabs={DS_TAB_PEPORT}
            />
       </div>
    )
}

export default NursingReport