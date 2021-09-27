import React from 'react'
import styled, { css } from 'styled-components'
import { useOnClickOutside } from '../hooks/useClickOutside'
import UserAvatar from '../../public/user.svg'
import { Button } from '../styles'

interface IUserWidger {
  username: string | null
  email: string | null
  logout: () => void
}

const UserWidger: React.FC<IUserWidger> = ({ username, email, logout }) => {
  const [isOpen, setOpen] = React.useState(false)
  const selectRef = React.useRef(null)
  useOnClickOutside(selectRef, () => setOpen(false))
  return (
    <Widget ref={selectRef} onClick={() => setOpen((prev: boolean) => !prev)}>
      <UserAvatar />
      <WidgetDropdown isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <WidgetItem>{email}</WidgetItem>
        <WidgetItem>{username}</WidgetItem>
        <Button float='right' style={{ marginTop: '20px' }} variant='contained' onClick={logout}>
          Выйти
        </Button>
      </WidgetDropdown>
    </Widget>
  )
}

const Widget = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  box-shadow: 0px 0px 11px 6px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  svg {
    width: 100%;
    height: 100%;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`

const WidgetDropdown = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  bottom: 100%;
  opacity: 0;
  visibility: hidden;
  padding: 12px 10px;
  border: 1px solid ${({ theme }) => theme.palette?.primary};
  ${({ isOpen }) =>
    isOpen &&
    css`
      visibility: visible;
      margin-bottom: 10px;
      opacity: 1;
    `}
  right: 0;
  background-color: ${({ theme }) => theme.palette?.bg.secondary};
  transition: all ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadow} rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`
const WidgetItem = styled.li`
  color: ${({ theme }) => theme.palette?.text.primary};
  padding: 15px 5px;
  transition: all ${({ theme }) => theme.transition};
`

export default UserWidger
