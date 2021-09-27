import React, { ReactChild } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import CloseIcon from '../../public/close.svg'
import { H3 } from '../styles'
interface ModalProps {
  active: boolean
  children: ReactChild
  title?: string
  onClose?: () => void
}

const Modal: React.FC<ModalProps> = ({ active, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = React.useState(false)

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  const modalContent = (
    <CSSTransition in={active} unmountOnExit timeout={300} classNames='overlay'>
      <Overlay onClick={onClose}>
        <Popup onClick={(e) => e.stopPropagation()}>
          <PopupHeader>
            {title && <H3>{title}</H3>}
            <CloseIcon onClick={onClose} />
          </PopupHeader>
          <PopupBody>{children}</PopupBody>
        </Popup>
      </Overlay>
    </CSSTransition>
  )

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as Element)
  } else {
    return null
  }
}

const PopupBody = styled.div`
  padding-top: 10px;
`

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    text-transform: capitalize;
    font-size: 25px;
  }
  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.palette?.primary};
    cursor: pointer;
  }
`

const Popup = styled.div`
  position: relative;
  padding: 30px;
  width: 100%;
  max-width: 350px;
  display: block;
  border-radius: 10px;
  margin: auto;
  background: ${({ theme }) => theme.palette?.bg.secondary};
  transition: all 0.3s ease-in-out;
  z-index: 99999;
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  z-index: 99999;
  transition: all 0.3s ease-in-out;
  &.overlay-enter {
    opacity: 0;
    ${Popup} {
      opacity: 0;
      transform: translateY(-20%);
    }
  }
  &.overlay-enter-active {
    opacity: 1;
    ${Popup} {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &.overlay-exit {
    opacity: 1;
  }
  &.overlay-exit-active {
    opacity: 0;
    ${Popup} {
      opacity: 0;
      transform: translateY(-20%);
    }
  }
`

export default Modal
