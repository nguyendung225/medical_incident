import { Form, FormControl } from 'react-bootstrap';
import { TYPE } from './input-component/utils/const';

const TextValidator = ({ ...props }) => {
    return (
      <Form.Group className={`position-relative flex-grow-1`}>
        <FormControl
          {...props}
          className={`
                    ${props.errors && props.touched ? "is-invalid" : ""}
                    ${props?.isSearch ? "background-image-none" : ""}
                    form-control customs-input

                    ${props?.className ? props?.className : ""}
                    ${props?.as === TYPE.textarea ? "resize-none" : ""}
                `}
        />
        {props?.isSearch && (
          <div className="searchTextField" onClick={props?.isSearch && props?.handleSearch}>
            <i className="bi bi-search"></i>
          </div>
        )}

        {props?.icon && (
          <div className="searchTextField" onClick={props?.icon && props?.handleIcon}>
            <i className={props?.icon}></i>
          </div>
        )}

        {props.touched && props.errors && <div className="invalid-feedback">{props.errors}</div>}
      </Form.Group>
    );
};

export default TextValidator
