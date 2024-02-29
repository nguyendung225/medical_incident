import {FC} from 'react'
import {Form, Pagination, ButtonToolbar, Tooltip, OverlayTrigger} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {PaginationType, PageType} from '../../../model/PersonnelModel'

import './pagination.scss'
import {ROWPERPAGE} from '../../../const/PersonnelConst'

interface Props {
  handleChangePageSize: (size: number, method: keyof PaginationType) => void
  handleChangePageIndex: (index: number, method: keyof PaginationType) => void
  method: keyof PaginationType
  pageInfo: PageType
  totalPages: number
}

const PaginationCustom: FC<Props> = ({
  handleChangePageSize,
  method,
  handleChangePageIndex,
  pageInfo,
  totalPages,
}) => {
  const intl = useIntl()
  return (
    <div className='pagination-custom border'>
      <div className='number-row-box'>
        <div> {intl.formatMessage({id: 'ROWSPERPAGE'})}</div>

        <Form.Select
          size='sm'
          className='number-row'
          value={pageInfo.pageSize}
          onChange={(event) => {
            handleChangePageSize(+event.target.value, method)
          }}
        >
          {ROWPERPAGE.map((row) => (
            <option key={row} value={row}>
              {row}
            </option>
          ))}
        </Form.Select>
      </div>
      <ButtonToolbar>
        <Pagination className='pagination'>
          <OverlayTrigger
            placement='bottom'
            delay={150}
            overlay={
              <Tooltip id='tooltip' className='in'>
                <b>{intl.formatMessage({id: 'TABLE.PAGINATION.FIRST'})}</b>
              </Tooltip>
            }
          >
            <Pagination.First
              disabled={pageInfo.pageIndex === 1}
              onClick={() => {
                handleChangePageIndex(1, method)
              }}
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement='bottom'
            delay={150}
            overlay={
              <Tooltip id='tooltip' className='in'>
                <b>{intl.formatMessage({id: 'TABLE.PAGINATION.PREVIOUS'})}</b>
              </Tooltip>
            }
          >
            <Pagination.Prev
              disabled={pageInfo.pageIndex === 1}
              onClick={() => {
                handleChangePageIndex(pageInfo.pageIndex - 1, method)
              }}
            />
          </OverlayTrigger>
          <div>{pageInfo.pageIndex + ' / ' + totalPages}</div>
          <OverlayTrigger
            placement='bottom'
            delay={150}
            overlay={
              <Tooltip id='tooltip' className='in'>
                <b>{intl.formatMessage({id: 'TABLE.PAGINATION.NEXT'})}</b>
              </Tooltip>
            }
          >
            <Pagination.Next
              disabled={pageInfo.pageIndex === totalPages}
              onClick={() => {
                handleChangePageIndex(pageInfo.pageIndex + 1, method)
              }}
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement='bottom'
            delay={150}
            overlay={
              <Tooltip id='tooltip' className='in'>
                <b>{intl.formatMessage({id: 'TABLE.PAGINATION.LAST'})}</b>
              </Tooltip>
            }
          >
            <Pagination.Last
              disabled={pageInfo.pageIndex === totalPages}
              onClick={() => {
                handleChangePageIndex(totalPages, method)
              }}
            />
          </OverlayTrigger>
        </Pagination>
      </ButtonToolbar>
    </div>
  )
}

export {PaginationCustom}
