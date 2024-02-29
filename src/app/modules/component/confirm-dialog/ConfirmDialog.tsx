import { FC } from 'react'
import { Button, Modal } from 'react-bootstrap'

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
  className?: string
}

const ConfirmDialog: FC<Props> = (props) => {
  const { show, onCloseClick, onYesClick, onCancelClick, title, message, yes, cancel, close, className } = props

  return (
    <Modal
      show={show}
      onHide={onCloseClick}
      centered
      animation
      className={`background__modal dialog-background ${className}`}
    >
      <Modal.Header className="header-modal" closeButton>
        <Modal.Title className='text-white text-uppercase'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-4'>
        <h5 className='m-0'>{message}</h5>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-2 border-top'>
        {cancel && (
          <Button
            className="spaces btn-secondary px-16"
            onClick={onCancelClick}
          >
            {cancel}
          </Button>
        )}
        {yes && (
          <Button className="btn-fill min-w-50px btn btn-primary" onClick={onYesClick}>
            {yes}
          </Button>
        )}
        {close && (
          <Button
            className="btn-outline min-w-80px"
            onClick={onCloseClick}
          >
            {close}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export { ConfirmDialog }