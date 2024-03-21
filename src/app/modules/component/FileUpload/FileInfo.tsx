import clsx from "clsx";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type Props = {
	numberFile: number;
	handleOpenDialogUpload: () => void;
	error?: any;
};

const renderTooltip = (props: Props) => {
    return <>
        {
            props.error && (
                <Tooltip id="button-tooltip">
                    <div className="text-danger">{props.error}</div>
                </Tooltip>
            )
        }
    </>
}

export default function FileInfo(props: Props) {
	const { numberFile, handleOpenDialogUpload } = props;

	return (
		<OverlayTrigger
			placement="top"
			delay={{ show: 250, hide: 400 }}
			overlay={renderTooltip(props)}
		>
			<div
				className={clsx(
					"form-control customs-input spaces gap-10 h-25 width-100 d-flex align-items-center",
					{ error: props.error }
				)}
			>
				{numberFile} Tệp
				<i className="fa fa-cloud-upload text-primary me-1" />
				<div
					className="text-primary cursor-pointer"
					onClick={handleOpenDialogUpload}
				>
					Chi tiết
				</div>
			</div>
		</OverlayTrigger>
	);
}
