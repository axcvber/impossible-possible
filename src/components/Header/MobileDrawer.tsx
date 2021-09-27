import React, { ReactChild } from 'react'
import Drawer from 'rc-drawer'
import styled from 'styled-components'
import BurgerIcon from '../../../public/menu.svg'
import CloseIcon from '../../../public/close.svg'

const StyledDrawer = styled(Drawer)`
  outline: none;
  .drawer-content-wrapper {
    background-color: ${({ theme }) => theme.palette?.bg.secondary};
  }
  .drawer-content {
    padding: 20px;
  }
`

const CloseMenu = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  svg {
    fill: ${({ theme }) => theme.palette?.primary};
    width: 20px;
    height: 20px;
  }
`

const BurgerMenu = styled.div`
  margin-left: 20px;
  svg {
    fill: ${({ theme }) => theme.palette?.primary};
    width: 35px;
    height: 35px;
  }
`

interface IMobileDrawer {
  toggleHandler: () => void
  open: boolean
  children: ReactChild
}

const MobileDrawer: React.FC<IMobileDrawer> = ({ toggleHandler, open, children }) => {
  return (
    <>
      <StyledDrawer open={open} onClose={toggleHandler} width='220px' handler={false} duration={'0.3s'}>
        <CloseMenu onClick={toggleHandler}>
          <CloseIcon />
        </CloseMenu>
        {children}
      </StyledDrawer>
      <BurgerMenu onClick={toggleHandler}>
        <BurgerIcon />
      </BurgerMenu>
    </>
  )
}

export default MobileDrawer
