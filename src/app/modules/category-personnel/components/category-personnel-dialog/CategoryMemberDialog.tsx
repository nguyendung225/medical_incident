import {Formik} from 'formik'
import {FC} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {MemberData, TeamData} from '../../model/PersonnelModel'
import {createMember, updateMember} from '../../services/PategoryPersonnelServices'
import {TextFieldCustom} from '../text-field-custom/TextFieldCustom'

import {
  MEMBER_POSITIONS,
  MEMBER_GENDERS,
  MEMBER_LEVELS,
  MEMBER_STATUS,
  MEMBER_TYPES,
} from '../../const/PersonnelConst'
import {RESPONSE_CODE_SUCCESS} from '../../const/PersonnelConst'
import './dialog.scss'
interface Iprops {
  handleClose: () => void
  memberData: MemberData
  listTeam: TeamData[]
  getListMemberByTeamId: (id: string | undefined) => Promise<void>
}

const CategoryMemberDialog: FC<Iprops> = (props) => {
  const {handleClose, memberData, listTeam, getListMemberByTeamId} = props

  const intl = useIntl()
  const initialValues: MemberData = {
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
      <Modal show={true} centered onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton>
          <Modal.Title className='text-pri '>
            {!memberData.code
              ? intl.formatMessage({id: 'DIALOG.CATEGORY.MEMBER.TITLE'})
              : intl.formatMessage({id: 'MENU.CATEGORY.PERSONNEL.EDITMEMBER'})}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required(intl.formatMessage({id: 'VALIDATION.REQUIRE'}))
              .max(255, intl.formatMessage({id: 'VALIDATION.MAX'})),
            code: Yup.string()
              .required(intl.formatMessage({id: 'VALIDATION.REQUIRE'}))
              .max(255, intl.formatMessage({id: 'VALIDATION.MAX'})),
            dateJoin: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRE'})),
            email: Yup.string()
              .required(intl.formatMessage({id: 'VALIDATION.REQUIRE'}))
              .max(255, intl.formatMessage({id: 'VALIDATION.MAX'}))
              .email(intl.formatMessage({id: 'VALIDATION.EMAILINVALID'})),
            level: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRESELECT'})),
            gender: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRESELECT'})),
            type: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRESELECT'})),
            position: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRESELECT'})),
            status: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRESELECT'})),
            team: Yup.object().shape({
              id: Yup.string().required(intl.formatMessage({id: 'VALIDATION.REQUIRESELECT'})),
            }),
          })}
          onSubmit={async (values) => {
            const res = memberData.id
              ? await updateMember(values, memberData.id)
              : await createMember(values)
            res.data.code === RESPONSE_CODE_SUCCESS
              ? toast.success(
                  memberData.id
                    ? intl.formatMessage({id: 'TOAST.EDIT.SUCCESS'})
                    : intl.formatMessage({id: 'TOAST.CREATE.SUCCESS'})
                )
              : toast.error(`${res.data.message}`)
            if (res.data.code === RESPONSE_CODE_SUCCESS) {
              await getListMemberByTeamId(values.team.id)
              handleClose()
            }
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
                  <Col xs={6}>
                    <TextFieldCustom
                      name='name'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.NAME'
                      type='text'
                      values={values.name}
                      errors={errors.name}
                      handleChange={handleChange}
                    />
                  </Col>
                  <Col xs={6}>
                    <TextFieldCustom
                      type='select'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.GENDER'
                      name='gender'
                      values={values.gender}
                      errors={errors.gender}
                      handleChange={handleChange}
                      options={MEMBER_GENDERS}
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6}>
                    <TextFieldCustom
                      name='dateJoin'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.DATEJOIN'
                      type='date'
                      values={values.dateJoin}
                      errors={errors.dateJoin}
                      handleChange={handleChange}
                      disabled={!!memberData.id}
                    />
                  </Col>
                  <Col xs={6}>
                    <TextFieldCustom
                      type='select'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.TYPE'
                      name='type'
                      values={values.type}
                      errors={errors.type}
                      handleChange={handleChange}
                      options={MEMBER_TYPES}
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6}>
                    <TextFieldCustom
                      name='code'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.CODE'
                      type='text'
                      values={values.code}
                      errors={errors.code}
                      handleChange={handleChange}
                      disabled={!!memberData.id}
                    />
                  </Col>
                  <Col xs={6}>
                    <TextFieldCustom
                      type='select'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.STATUS'
                      name='status'
                      values={values.status}
                      errors={errors.status}
                      handleChange={handleChange}
                      options={MEMBER_STATUS}
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6}>
                    <TextFieldCustom
                      name='email'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.EMAIL'
                      type='text'
                      values={values.email}
                      errors={errors.email}
                      handleChange={handleChange}
                    />
                  </Col>
                  <Col xs={6}>
                    <TextFieldCustom
                      type='select'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.TEAM'
                      name='team'
                      values={values.team.id}
                      errors={errors.team?.id}
                      handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('team', {id: event.target.value})
                      }}
                      disabled={!!memberData.id}
                      optionsTeam={listTeam}
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6}>
                    <TextFieldCustom
                      type='select'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.POSITION'
                      name='position'
                      values={values.position}
                      errors={errors.position}
                      handleChange={handleChange}
                      options={MEMBER_POSITIONS}
                    />
                  </Col>
                  <Col xs={6}>
                    <TextFieldCustom
                      type='select'
                      title='MENU.CATEGORY.PERSONNEL.MEMBER.LEVEL'
                      name='level'
                      values={values.level}
                      errors={errors.level}
                      handleChange={handleChange}
                      options={MEMBER_LEVELS}
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button type='submit' className='bg-pri'>
                  {intl.formatMessage({id: 'DIALOG.ACTION.SAVE'})}
                </Button>
                <Button variant='secondary' onClick={handleClose}>
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
export {CategoryMemberDialog}
