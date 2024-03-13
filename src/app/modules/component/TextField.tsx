import { useField } from 'formik';
import { Form, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TYPE } from './input-component/utils/const';

const TextField = ({ ...props }) => {
    const [field, meta] = useField(props?.name);
    const renderTooltip = (props: any) => (
        ((meta.error && meta.touched)) ? <Tooltip id="button-tooltip">
            <div className="text-danger">{meta?.error}</div>
        </Tooltip>:<div></div>
      );
    return (
        <div className={`text-field-v2 ${props?.className}`}>
            <span>
                {props?.label && <span className={`text-lable-input max-content-width ${props?.labelClassName ? props?.labelClassName : "me-2"}`}>
                    {props?.label}
                </span>}
            </span>
            <Form.Group className='position-relative w-100'>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(props)}
                >
                    <FormControl
                    {...field}
                    {...props}
                    className={`
                    spaces px-4
                    ${((meta.error && meta.touched) || (props?.errors && props?.touched)) ? "is-invalid" : ""}
                    form-control customs-input
                    ${props?.className ? props?.className : ""}
                        ${props?.as === TYPE.textarea ? "resize-none" : ""}
                    `}
                    />
                </OverlayTrigger>
            </Form.Group>
        </div>
    )
}

export default TextField