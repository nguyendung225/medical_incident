import { Card } from 'antd';
import "../ThongKeSCYK.scss";
import { Col, Row } from 'react-bootstrap';
import { ITongQuanBaoCao } from '../models/ThongKeModels';

interface ITongQuanBCSuCoProps {
    tongQuanBCSuCo: ITongQuanBaoCao;
}

const ThongKeTongQuanBCSuCo = (props: ITongQuanBCSuCoProps) => {
    const { tongQuanBCSuCo } = props;

    return (
        <Card
            title='Tổng số báo cáo sự cố y khoa'
            className='flex flex-column flex-row-fluid flex-equal flex-grow-1'
            classNames={
                {
                    header: 'spaces p-16 color-title-card',
                    body: 'spaces d-flex flex-wrap p-1 height-100',
                    title: 'text-cyan fw-800 fs-16',
                }
            }
        >
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Tổng số SCYK</div>
                    <div className="spaces value_red fs-20 fw-700 lh-20">{tongQuanBCSuCo.tongSoBaoCao}</div>
                </div>
            </Col>
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Mới tạo</div>
                    <div className="value">{tongQuanBCSuCo.moiTao}</div>
                </div>
            </Col>
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Chờ tiếp nhận</div>
                    <div className="value">{tongQuanBCSuCo.choTiepNhan}</div>
                </div>
            </Col>
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Đã tiếp nhận</div>
                    <div className="value">{tongQuanBCSuCo.daTiepNhan}</div>
                </div>
            </Col>
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Đã xác minh</div>
                    <div className="value">{tongQuanBCSuCo.daXacMinh}</div>
                </div>
            </Col>
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Đã phân tích SCYK</div>
                    <div className="value">{tongQuanBCSuCo.daPhanTich}</div>
                </div>
            </Col>
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Biên bản họp</div>
                    <div className="value">{tongQuanBCSuCo.bienBanHop}</div>
                </div>
            </Col>
            <Col xs={6}>
                <div className='itemTongSo'>
                    <div className="title">Kết luận</div>
                    <div className="value">{tongQuanBCSuCo.ketLuan}</div>
                </div>
            </Col>
        </Card>
    );
};

export default ThongKeTongQuanBCSuCo;