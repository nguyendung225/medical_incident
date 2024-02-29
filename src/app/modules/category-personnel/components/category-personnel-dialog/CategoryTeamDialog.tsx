import {Formik} from 'formik'
import {FC} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {TeamData} from '../../model/PersonnelModel'
import {createTeam, updateTeam} from '../../services/PategoryPersonnelServices'
import {TextFieldCustom} from '../text-field-custom/TextFieldCustom'
import {RESPONSE_CODE_SUCCESS} from '../../const/PersonnelConst'
interface Iprops {
  handleClose: () => void
  getListTeamData: () => Promise<void>
  teamData: TeamData
}
const CategoryTeamDialog: FC<Iprops> = ({handleClose, teamData, getListTeamData}) => {
  const intl = useIntl()
  const initialValues: TeamData = {
    name: teamData.name || '',
    code: teamData.code || '',
    description: teamData.description || '',
  }
  return (
    <>
      <Modal show={true} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-pri '>
            {!teamData.code
              ? intl.formatMessage({id: 'DIALOG.CATEGORY.TEAM.TITLE'})
              : intl.formatMessage({id: 'MENU.CATEGORY.PERSONNEL.EDITTEAM'})}
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
            description: Yup.string().max(255, intl.formatMessage({id: 'VALIDATION.MAX'})),
          })}
          onSubmit={async (values) => {
            const res = teamData.code
              ? await updateTeam(values, teamData.id)
              : await createTeam(values)
            res.data.code === RESPONSE_CODE_SUCCESS
              ? toast.success(
                  teamData.code
                    ? intl.formatMessage({id: 'TOAST.EDIT.SUCCESS'})
                    : intl.formatMessage({id: 'TOAST.CREATE.SUCCESS'})
                )
              : toast.error(`${res.data.message}`)
            if (res.data.code === RESPONSE_CODE_SUCCESS) {
              await getListTeamData()
              handleClose()
            }
          }}
        >
          {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors}) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Row className='gap-2'>
                  <Col xs={12}>
                    <TextFieldCustom
                      name='name'
                      title='MENU.CATEGORY.PERSONNEL.TEAM.NAME'
                      type='text'
                      values={values.name}
                      errors={errors.name}
                      handleChange={handleChange}
                    />
                  </Col>
                  <Col xs={12}>
                    <TextFieldCustom
                      name='code'
                      title='MENU.CATEGORY.PERSONNEL.TEAM.CODE'
                      type='text'
                      values={values.code}
                      errors={errors.code}
                      handleChange={handleChange}
                    />
                  </Col>
                  <Col xs={12}>
                    <TextFieldCustom
                      name='description'
                      title='MENU.CATEGORY.PERSONNEL.DESCRIPTION'
                      type='text'
                      values={values.description}
                      errors={errors.description}
                      handleChange={handleChange}
                      required={true}
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
export {CategoryTeamDialog}
