import { FormikHandlers } from 'formik';
import { ElementType, FC } from 'react';
import { Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { OptionType } from '../services/models/IContract';

interface Iprops {
  values: any;
  errors?: string | undefined;
  options?: OptionType[];
  optionsByAPI?: any;
  name: string;
  title: string;
  type: string;
  required?: boolean;
  readOnly?: boolean;
  as?: ElementType<any> | undefined;
  rows?: string;
  handleChange: FormikHandlers['handleChange'];
}
const TextFieldCustom: FC<Iprops> = (props) => {
  const {
    values,
    handleChange,
    errors,
    name,
    options,
    title,
    optionsByAPI,
    type,
    required,
    readOnly,
    as,
    rows
  } = props;

  const intl = useIntl();
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={name}>
          <div className="text-label mb-2">
            <span>{intl.formatMessage({ id: title })}</span>
            {required && <span style={{ color: "red" }}> *</span>}
          </div>
        </Form.Label>
        {type === "select" && (
          <Form.Select
            name={name}
            id={name}
            value={values}
            onChange={handleChange}
            disabled={readOnly}
            isInvalid={!!errors}
          >
            <option hidden></option>
            {options?.map((opt: OptionType) => (
              <option key={opt.id} value={!!opt.value ? opt.value : ""}>
                {intl.formatMessage({ id: opt.title })}
              </option>
            ))}
            {optionsByAPI?.map((opt: any) => (
              <option key={opt.value} value={!!opt.value ? opt.value : ""}>
                {opt.title}
              </option>
            ))}
          </Form.Select>
        )}

        {type === "checkbox" && (
          <Form.Check
            id={name}
            readOnly={readOnly}
            type={type}
            name={name}
            value={values}
            onChange={!readOnly ? handleChange : undefined}
            onClick={readOnly ? (e) => e.preventDefault() : undefined}
            isInvalid={!!errors}
            checked={values}
          />
        )}

        {(type === "text" || type === "date" || type === "number" || type === "file") && (
          <Form.Control
            as={as}
            id={name}
            rows={rows}
            readOnly={readOnly}
            type={type}
            name={name}
            value={values}
            onChange={handleChange}
            isInvalid={!!errors}
          />
        )}

        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};
export { TextFieldCustom };
