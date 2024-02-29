import { ChangeEvent, FC } from 'react';
import { Form, FormControl } from 'react-bootstrap';

type Props = {
    value?: string
    name?: string
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleSearch?: () => void;
    placeholder?: string;
    type?: string;
    className?: string;
}

const InputSearch: FC<Props> = ({ ...props }) => {
    let { value, name, handleChange, handleKeyDown, handleSearch, type, className, placeholder } = props
    return (
        <Form.Group className='position-relative'>
            <FormControl
                className={`form-control customs-input ${className ? className : ""}`}
                value={value}
                name={name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder ? placeholder : ""}
                type={type ? type : "text"}
            />
            <div className="searchTextField" onClick={handleSearch}>
                <i className="bi bi-search"></i>
            </div>
        </Form.Group>
    );
};

export default InputSearch