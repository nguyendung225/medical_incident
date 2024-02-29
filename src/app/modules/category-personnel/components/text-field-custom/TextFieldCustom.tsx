import {FormikHandlers} from 'formik'
import {FC} from 'react'
import {Form} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {OptionType, TeamData} from '../../model/PersonnelModel'

interface Iprops {
  values: string | undefined | number
  errors: string | undefined
  options?: OptionType[]
  optionsTeam?: TeamData[]
  name: string
  title: string
  type: string
  required?: boolean
  disabled?: boolean

  handleChange: FormikHandlers['handleChange']
}
const TextFieldCustom: FC<Iprops> = (props) => {
  const {
    values,
    handleChange,
    errors,
    name,
    options,
    title,
    optionsTeam,
    type,
    required,
    disabled,
  } = props

  const intl = useIntl()
  return (
    <>
      <Form.Group controlId='validationFormik'>
        <Form.Label>
          {intl.formatMessage({id: title})}
          {!required && <span className='text-danger'> * </span>}
        </Form.Label>
        {type === 'select' ? (
          <Form.Select
            name={name}
            value={values}
            onChange={handleChange}
            disabled={disabled}
            isInvalid={!!errors}
          >
            <option hidden></option>
            {options?.map((opt: OptionType) => (
              <option key={opt.id} value={opt.value}>
                {intl.formatMessage({id: opt.title})}
              </option>
            ))}
            {optionsTeam?.map((opt: TeamData) => (
              <option key={opt.id} value={opt.id}>
                {intl.formatMessage({id: opt.name})}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            disabled={disabled}
            type={type}
            name={name}
            value={values}
            onChange={handleChange}
            isInvalid={!!errors}
          />
        )}

        <Form.Control.Feedback type='invalid'>{errors}</Form.Control.Feedback>
      </Form.Group>
    </>
  )
}
export {TextFieldCustom}
