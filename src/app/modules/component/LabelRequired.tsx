import { FC } from "react";

type Props = {
    label: string;
    isRequired?: boolean
    className?: string
}

const LabelRequired: FC<Props> = ({ label, isRequired, className }) => {
    return (
        <span className={`text-lable-input ${className ? className : ""}`}>
            {label}
            {isRequired && <span className="color-red"> (*)</span>}
        </span>
    )
};

export default LabelRequired
