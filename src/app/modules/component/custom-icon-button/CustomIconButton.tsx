import "./CustomIconButton.scss"

type Props = {
  children: JSX.Element
  onClick: () => void
  variant: "delete" | "edit"
}

const CustomIconButton = ({children, onClick, variant}: Props) => {
  return (
    <div className={variant} onClick={onClick}>
      {children}
    </div>
  )
}

export default CustomIconButton
