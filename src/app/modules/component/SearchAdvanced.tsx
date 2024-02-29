import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Autocomplete from './input-field/Autocomplete';

type ISearch = {
    pin?: string;
    status?: string;
}

type Props = {
    handleSearch: (objSearch: any) => void;
    statusOption?: any[];
}

export const SearchAdvanced:React.FC<Props> = ({handleSearch, statusOption}) => {
    const [searchParams, setSearchParams] = useState<ISearch>({})

    const handleChange = (e: any) => {
        setSearchParams({...searchParams, [e.target.name]: e.target.value})
    }

    const handleChangeStatus = (selectedOption: any) => {
        setSearchParams({...searchParams, status: selectedOption?.value})
    }

    return (
      <div className='search__advance'>
        <Row className='pb-2'>
          <Col sm='4'>
            <div className='d-flex flex-column h-100 justify-content-between gap-2'>
              <p className='w-100px m-0 pr-5'>Từ ngày</p>
              <input
                className='form-control customs-input'
                name='tuNngay'
                type='date'
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col sm='5'>
            <div className='d-flex flex-column h-100 justify-content-between gap-2'>
              <p className='w-100px m-0 pr-5'>Đến ngày</p>
              <input
                className='form-control customs-input'
                name='denNngay'
                type='date'
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col
            sm='3'
            className='d-flex flex-column justify-content-end w-100px'
          >
            <Button
              className='btn-navy btn-small min-w-100px'
              onClick={() => handleSearch(searchParams)}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
        <Row className='pb-2'>
          <Col sm='4'>
            <div className='d-flex flex-column h-100 justify-content-between gap-2'>
              <p className='w-100px m-0 pr-5'>Mã bệnh nhân</p>
              <input
                className='form-control customs-input'
                name='pin'
                type='text'
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col sm='5'>
            <div className='d-flex flex-column h-100 justify-content-between gap-2'>
              <p className='w-100px m-0 pr-5'>Trạng thái</p>
              <Autocomplete
                name='status'
                onChange={handleChangeStatus}
                className='customs-input'
                options={statusOption || []}
              />
            </div>
          </Col>
          <Col
            sm='3'
            className='d-flex flex-column justify-content-end w-100px'
          >
            <Button className='btn-navy btn-small white mb-1px min-w-100px text-dark'>
              Xuất excel
            </Button>
          </Col>
        </Row>
      </div>
    );
}

export default SearchAdvanced