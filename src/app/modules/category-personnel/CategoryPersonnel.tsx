import {FC, useEffect, useState} from 'react'
import {Button, Col, Container, OverlayTrigger, Row, Badge} from 'react-bootstrap'
import Tooltip from 'react-bootstrap/Tooltip'
import {useIntl} from 'react-intl'
import 'react-toastify/dist/ReactToastify.css'
import BreadcrumbsWidget from '../../../_metronic/partials/widgets/breadCrumbs/BreadCrumbsWidget'
import './category-personnel.scss'
import {CategoryMemberDialog} from './components/category-personnel-dialog/CategoryMemberDialog'
import {CategoryTeamDialog} from './components/category-personnel-dialog/CategoryTeamDialog'
import {ChangeTeamMemberDialog} from './components/category-personnel-dialog/ChangeTeamMemberDialog'
import {TeamTransferHistoryDialog} from './components/category-personnel-dialog/TeamTransferHistoryDialog'
import {TableCustom} from './components/table-custom/TableCustom'
import {ColumnsMemberTable} from './components/table-custom/columns/ColumnsMemberTable'
import {ColumnsTeamTable} from './components/table-custom/columns/ColumnsTeamTable'
import {PaginationCustom} from './components/table-custom/pagination/Pagination'
import {CategoryPersonnelContext} from './CategoryPersonnelContext'
import {handleChangeURLParams} from '../utils/ParamsUtils'
import {
  BreadcrumbItems,
  MemberData,
  PaginationType,
  TeamData,
  TotalPages,
} from './model/PersonnelModel'
import {getListMember, getListTeam} from './services/PategoryPersonnelServices'
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE} from './const/PersonnelConst'

import {useLocation, useNavigate} from 'react-router-dom'
const CategoryPersonnel: FC = () => {
  const intl = useIntl()
  const {search, pathname} = useLocation()
  const params = new URLSearchParams(search)
  const navigate = useNavigate()
  const [showTeamDialog, setShowTeamDialog] = useState<boolean>(false)
  const [showMemberDialog, setShowMemberDialog] = useState<boolean>(false)
  const [showTeamTransferHistory, setShowTeamTransferHistory] = useState<boolean>(false)
  const [showEditTeamMemberDialog, setShowEditTeamMemberDialog] = useState<boolean>(false)
  const items: BreadcrumbItems[] = [
    {text: intl.formatMessage({id: 'MENU.CATEGORY'}), url: '/category/personnel'},
    {text: intl.formatMessage({id: 'MENU.CATEGORY.PERSONNEL'}), url: '/category/personnel'},
  ]
  const [teamData, setTeamData] = useState<TeamData>({
    code: '',
    name: '',
    description: '',
  })
  const [memberData, setMemberData] = useState<MemberData>({
    name: '',
    code: '',
    dateJoin: '',
    status: '',
    team: {id: '', description: '', code: '', name: ''},
    email: '',
    level: '',
    gender: '',
    type: '',
    position: '',
  })
  const [listTeam, setlistTeam] = useState<TeamData[]>([])
  const [listMemberByTeamId, setListMemberByTeamId] = useState<MemberData[]>([])
  const [idTeam, setIdTeam] = useState<string | undefined>('')
  const [totalPages, setTotalPages] = useState<TotalPages>({
    team: 0,
    member: 0,
  })
  const [pagination, setPagination] = useState<PaginationType>({
    team: {pageIndex: DEFAULT_PAGE_INDEX, pageSize: DEFAULT_PAGE_SIZE},
    member: {pageIndex: 1, pageSize: DEFAULT_PAGE_SIZE},
  })
  const [teamSelected, setTeamSelected] = useState<string | undefined>('')
  const handleEditTeam = (data: TeamData): void => {
    setShowTeamDialog(true)
    setTeamData(data)
  }
  const handleEditMember = (data: MemberData, method: string): void => {
    if (method === 'all') setShowMemberDialog(true)
    if (method === 'team') setShowEditTeamMemberDialog(true)
    if (method === 'history') setShowTeamTransferHistory(true)
    setMemberData(data)
  }
  const handleClose = (): void => {
    setShowTeamDialog(false)
    setShowMemberDialog(false)
    setShowTeamTransferHistory(false)
    setShowEditTeamMemberDialog(false)
    setTeamData({code: '', name: '', description: ''})
    setMemberData({
      name: '',
      code: '',
      dateJoin: '',
      status: '',
      team: {code: '', name: '', description: ''},
      email: '',
      level: '',
      gender: '',
      type: '',
      position: '',
    })
  }

  const handleChangePageSize = (size: number, method: keyof PaginationType) => {
    setPagination({...pagination, [method]: {...pagination[method], pageSize: size, pageIndex: 1}})
  }
  const handleChangePageIndex = (index: number, method: keyof PaginationType) => {
    setPagination({...pagination, [method]: {...pagination[method], pageIndex: index}})
  }
  const getListTeamData = async () => {
    const res = await getListTeam(pagination.team.pageIndex, pagination.team.pageSize)
    const data = res.data.data
    setlistTeam(data.content)
    setTotalPages({...totalPages, team: data.totalPages})
  }
  function getTeamNameById(teams: TeamData[], id: string | undefined): string | undefined {
    const team = teams.find((team) => team.id === id)
    return team?.name
  }
  const getListMemberByTeamId = async (id: string | undefined) => {
    const res = await getListMember(id, pagination.member.pageIndex, pagination.member.pageSize)
    const data = res.data.data
    setListMemberByTeamId(data.content)
    const teamName = getTeamNameById(allTeam, id)
    handleChangeURLParams([{name: 'teamName', value: teamName}], navigate, params, pathname)
    setTeamSelected(teamName)
    setIdTeam(id)
    setTotalPages({...totalPages, member: data.totalPages})
  }
  const [allTeam, setAllTeam] = useState<TeamData[]>([])
  const getAllTeam = async () => {
    const res = await getListTeam(DEFAULT_PAGE_INDEX, MAX_PAGE_SIZE)
    setAllTeam(res.data.data.content)
  }

  useEffect(() => {
    getAllTeam()
  }, [listTeam])
  useEffect(() => {
    getListTeamData()
  }, [pagination.team])
  useEffect(() => {
    if (listTeam.length > 0) {
      getListMemberByTeamId(listTeam[0].id)
      setTeamSelected(listTeam[0].name)
    }
  }, [listTeam])
  useEffect(() => {
    getListMemberByTeamId(idTeam)
  }, [pagination.member])
  useEffect(() => {
    handleChangeURLParams(
      [
        {name: 'teamPageSize', value: pagination.team.pageSize},
        {name: 'teamPageIndex', value: pagination.team.pageIndex},
        {name: 'memberPageIndex', value: pagination.member.pageIndex},
        {name: 'memberPageSize', value: pagination.member.pageSize},
      ],
      navigate,
      params,
      pathname
    )
  }, [pagination])

  return (
    <>
      <CategoryPersonnelContext.Provider
        value={{handleEditTeam, handleEditMember, getListMemberByTeamId}}
      >
        <Container>
          <Row>
            <Col className='col-12 '>
              <BreadcrumbsWidget items={items} />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col className='col-lg-4 col-sm-12'>
              <Row xs='auto'>
                <Col className='d-flex align-items-center gap-4  '>
                  <strong className='fs-3'>
                    {intl.formatMessage({id: 'MENU.CATEGORY.PERSONNEL.TEAM'})}
                  </strong>

                  <OverlayTrigger
                    key='right'
                    placement='right'
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        {' '}
                        {intl.formatMessage({id: 'DIALOG.CATEGORY.TEAM.TITLE'})}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant='light'
                      size='sm'
                      className='p-0'
                      onClick={() => {
                        setShowTeamDialog(true)
                      }}
                    >
                      <i className='bi bi-plus-circle-fill text-pri fs-2'></i>
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TableCustom<TeamData> data={listTeam} columns={ColumnsTeamTable} />
                  <PaginationCustom
                    totalPages={totalPages.team}
                    pageInfo={pagination.team}
                    handleChangePageIndex={handleChangePageIndex}
                    handleChangePageSize={handleChangePageSize}
                    method='team'
                  />
                </Col>
              </Row>
            </Col>
            <Col className='col-lg-8 col-sm-12'>
              <Row xs='auto'>
                <Col className='d-flex align-items-center gap-4  '>
                  <strong className='fs-3'>
                    {intl.formatMessage({id: 'MENU.CATEGORY.PERSONNEL.MEMBER'})}
                  </strong>
                  <Badge>{teamSelected}</Badge>
                  <OverlayTrigger
                    key='right'
                    placement='right'
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        {' '}
                        {intl.formatMessage({id: 'DIALOG.CATEGORY.MEMBER.TITLE'})}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant='light'
                      size='sm'
                      className='p-0'
                      onClick={() => {
                        setShowMemberDialog(true)
                      }}
                    >
                      <i className='bi bi-plus-circle-fill text-pri fs-2'></i>
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>

              <Row>
                <Col>
                  <TableCustom<MemberData> data={listMemberByTeamId} columns={ColumnsMemberTable} />
                  <PaginationCustom
                    totalPages={totalPages.member}
                    pageInfo={pagination.member}
                    handleChangePageIndex={handleChangePageIndex}
                    handleChangePageSize={handleChangePageSize}
                    method='member'
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </CategoryPersonnelContext.Provider>
      {showTeamDialog && (
        <CategoryTeamDialog
          handleClose={handleClose}
          teamData={teamData}
          getListTeamData={getListTeamData}
        />
      )}
      {showMemberDialog && (
        <CategoryMemberDialog
          getListMemberByTeamId={getListMemberByTeamId}
          handleClose={handleClose}
          memberData={memberData}
          listTeam={allTeam}
        />
      )}
      {showEditTeamMemberDialog && (
        <ChangeTeamMemberDialog
          getListMemberByTeamId={getListMemberByTeamId}
          handleClose={handleClose}
          listTeam={allTeam}
          memberData={memberData}
        />
      )}
      {showTeamTransferHistory && (
        <TeamTransferHistoryDialog memberData={memberData} handleClose={handleClose} />
      )}
    </>
  )
}
export {CategoryPersonnel}
