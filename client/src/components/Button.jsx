import './Button.css'

function Button({ children, variant = 'ticket', onClick, type = 'button', disabled }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {variant === 'ticket' && <span className="btn-notch left" />}
      <span className="btn-label">{children}</span>
      {variant === 'ticket' && <span className="btn-notch right" />}
    </button>
  )
}

export default Button
