import {Formik} from 'formik'
import {FC} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {MemberData, TeamData} from '../../model/PersonnelModel'
import {transferTeamMember} from '../../services/PategoryPersonnelServices'
import {TextFieldCustom} from '../text-field-custom/TextFieldCustom'
import './dialog.scss'
import {RESPONSE_CODE_SUCCESS} from '../../const/PersonnelConst'
interface Iprops {
  handleClose: () => void
  memberData: MemberData
  listTeam: TeamData[]
  getListMemberByTeamId: (id: string | undefined) => Promise<void>
}

const ChangeTeamMemberDialog: FC<Iprops> = (props) => {
  const {handleClose, memberData, listTeam, getListMemberByTeamId} = props
  const intl = useIntl()
  const initialValues = {
    name: memberData.name || '',
    code: memberData.code || '',
    dateJoin: memberData.dateJoin || '',
    status: memberData.status || '',
    team: memberData.team,
    email: memberData.email || '',
    level: memberData.level || '',
    gender: memberData.gender || '',
    type: memberData.type || '',
    position: memberData.position || '',
  }
  return (
    <>
      <Modal show={true} centered onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title className='text-pri '>
            {intl.formatMessage({id: 'MENU.CATEGORY.PERSONNEL.CHANGETEAM'})}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            team: Yup.object().shape({
              id: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRESELECT'})),
            }),
          })}
          onSubmit={async (values) => {
            const res = await transferTeamMember(values, memberData.id)
            res.data.code === RESPONSE_CODE_SUCCESS
              ? toast.success(intl.formatMessage({id: 'TOAST.TRANSFERTEAM.SUCCESS'}))
              : toast.error(res.data.message)
            await getListMemberByTeamId(values.team.id)
            handleClose()
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Row>
                  <Col xs={12}>
                    <TextFieldCustom
                      type='select'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.TEAM'
                      name='team'
                      values={values.team.id}
                      errors={errors.team?.id}
                      handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('team', {id: event.target.value})
                      }}
                      optionsTeam={listTeam}
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button type='submit' className=' btn-outline-primary btn-active-light-primary'>
                  {intl.formatMessage({id: 'DIALOG.ACTION.SAVE'})}
                </Button>
                <Button
                  className='btn btn-outline btn-outline-primary btn-active-light-primary'
                  onClick={handleClose}
                >
                  {intl.formatMessage({id: 'DIALOG.ACTION.CLOSE'})}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}
export {ChangeTeamMemberDialog}
