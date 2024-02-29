import {FC} from 'react'
import {Button, Modal} from 'react-bootstrap'

interface Props {
  show: boolean
  onCloseClick?: () => void
  onYesClick?: () => void
  onCancelClick?: () => void
  title?: string
  message?: string
  yes?: string
  cancel?: string
  close?: string
}

const ConfirmDialog: FC<Props> = (props) => {
  const {show, onCloseClick, onYesClick, onCancelClick, title, message, yes, cancel, close} = props

  return (
    <Modal
      show={show}
      onHide={onCloseClick}
      centered
      animation
      className='custom-modal'
    >
      <Modal.Header className="bg-pri p-3">
        <Modal.Title className="text-white text-uppercase">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center p-4">
        <h4 className='spaces m-0'>{message}</h4>
      </Modal.Body>
      <Modal.Footer className="p-3 center ">
        {yes && (
          <Button className="btn btn-primary  btn-sm" onClick={onYesClick}>
            {yes}
          </Button>
        )}
        {cancel && (
          <Button className="btn btn-secondary btn-sm" onClick={onCancelClick}>
            {cancel}
          </Button>
        )}
        {close && (
          <Button className="btn btn-primary btn-sm" onClick={onCloseClick}>
            {close}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export {ConfirmDialog}
