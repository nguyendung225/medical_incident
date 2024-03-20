import { Dropdown } from "react-bootstrap";

type TDropdownItem = {
    title: string,
    handleClick: () => void,
}

type TProps = {
    title: string,
    dropdownItems: TDropdownItem[],
}

const DropdownButton = ({title, dropdownItems} : TProps) => {
    return (
        <Dropdown drop='down'>
            <Dropdown.Toggle
                className='button-primary'
                id='dropdown-autoclose-true'
                size='sm'
            >
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dropdownItems?.map((dropdownItem) => (
                    <Dropdown.Item
                        onClick={() => dropdownItem.handleClick()}
                    >
                        {dropdownItem.title}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownButton