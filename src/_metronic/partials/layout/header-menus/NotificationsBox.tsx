import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SearchObject } from '../../../../app/modules/bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels';
import { getDSTiepNhan } from '../../../../app/modules/bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices';
import { KTSVG } from '../../../helpers';
import { usePageData } from '../../../layout/core';
import './custom.scss';
import { useNavigate } from 'react-router-dom';

export default function NotificationsBox() {
    const navigate = useNavigate()
    const { updateDataTiepNhan, setUpdateDataTiepNhan } = usePageData()
    const popupRef = useRef<HTMLDivElement>(null);
    const [openPopUp, setOpenPopup] = useState(false)
    const [dsTiepNhan, setDsTiepNhan] = useState<any>([])

    const closeIfOutside = (event: MouseEvent) => {
        if (openPopUp && !popupRef.current?.contains(event.target as Node)) {
            setOpenPopup(false);
        }
    };

    const uploadData = async () => {
        try {
            const res = await getDSTiepNhan({pageSize: 100} as SearchObject)
            setDsTiepNhan(res?.data?.data?.data)
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại")
        }
    }

    useEffect(() => {
        uploadData()
        document.addEventListener('click', closeIfOutside);
        return () => {
            document.removeEventListener('click', closeIfOutside);
        };
    }, [updateDataTiepNhan]);


    return (
        <>
            <div className='noti-container' ref={popupRef}>
                <button type="button" className="btn p-0 position-relative" onClick={() => setOpenPopup(prev => !prev)}>
                    <KTSVG path={'/media/icons/notification.svg'} className={`flex mx-0 p-1`} />
                    {dsTiepNhan.length > 0 &&
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {dsTiepNhan?.length}
                        </span>
                    }

                </button>
                {
                    openPopUp && <div className="noti-popup">
                        {
                            dsTiepNhan.length > 0 ?
                                dsTiepNhan.map((item: any) => (<>
                                    <div className='spaces p-10 border' onClick={() => {
                                        setOpenPopup(prev => !prev);
                                        setUpdateDataTiepNhan(item);
                                        navigate("/ds-bao-cao-scyk");
                                    }}>
                                        <span className='text-primary fw-700 me-1' >
                                            {item.tenDonViBaoCao ? item.tenDonViBaoCao : "Người báo cáo"}
                                        </span>
                                        Đã gửi một báo cáo SCYK đang chờ tiếp nhận
                                        <div>{moment(item.ngayBaoCao).format('DD-MM-YYYY')}</div>
                                    </div>

                                </>))
                                : <div className='text-primary fw-700 d-flex justify-content-center p-4'>Không có thông báo</div>

                        }

                    </div>

                }
            </div>


        </>
    )
}