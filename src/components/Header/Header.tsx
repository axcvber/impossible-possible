import React from 'react'
import styled, { css } from 'styled-components'
import { Button, Container } from '../../styles'
import Toggle from './Toggle'
import Logo from './Logo'
import { useMediaQuery } from 'react-responsive'
import MobileDrawer from './MobileDrawer'
import RSLink from '../RSLink'

const navData = [
  {
    title: 'Главная',
    path: 'home',
  },
  {
    title: 'О нас',
    path: 'aboutUs',
  },
  {
    title: 'Услуги',
    path: 'services',
  },
  {
    title: 'Отзывы',
    path: 'reviews',
  },
  {
    title: 'F.A.Q.',
    path: 'faq',
  },
]

const StyledHeader = styled.header<{ stickyNav: boolean }>`
  width: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 65px;
  margin-top: -65px;
  position: sticky;
  top: 0;
  z-index: 10;
  ${({ stickyNav }) =>
    stickyNav &&
    css`
      background-color: ${({ theme }) => theme.palette?.bg.secondary};
      box-shadow: 0px 6px 6px -2px rgba(0, 0, 0, 0.1);
    `}
  transition: all ${({ theme }) => theme.transition};
`

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    position: static;
    transform: translateX(0);
  }
`
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 20px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    align-items: flex-start;
    flex-direction: column;
    margin-right: 0;
  }
`

const NavItem = styled.li`
  user-select: none;
  margin-right: 5px;
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.palette?.text.secondary};
    padding: 5px 15px;
    transition: all ${({ theme }) => theme.transition};
    &:hover {
      color: ${({ theme }) => theme.palette?.primary};
    }
    &.active {
      border-radius: 5px;
      background-color: ${({ theme }) => theme.palette?.primary};
      color: #fff;
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    margin: 15px 0;
    &:last-child {
      margin-bottom: 20px;
    }
  }
  &:last-child {
    margin-right: 0;
  }
`

export const Header = () => {
  const [stickyNav, setStickyNav] = React.useState<boolean>(false)
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false)
  const isMatch = useMediaQuery({ maxWidth: '992px' })

  const onToggleMenu = () => {
    setOpenMenu((prev) => !prev)
  }

  const scrollHandler = () => {
    if (window.pageYOffset > 0) {
      setStickyNav(true)
    } else {
      setStickyNav(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <StyledHeader stickyNav={stickyNav}>
      <NavContainer>
        <Logo />
        <Nav>
          {!isMatch && (
            <NavMenu>
              {navData.map((item, inx) => (
                <NavItem key={`nav-item${inx}`}>
                  <RSLink to={item.path} activeClass='active'>
                    {item.title}
                  </RSLink>
                </NavItem>
              ))}
            </NavMenu>
          )}
          <Toggle />
          {isMatch && (
            <MobileDrawer open={isOpenMenu} toggleHandler={onToggleMenu}>
              <>
                <NavMenu>
                  {navData.map((item, inx) => (
                    <NavItem key={`nav-item${inx}`}>
                      <RSLink onClick={onToggleMenu} to={item.path} activeClass='active'>
                        {item.title}
                      </RSLink>
                    </NavItem>
                  ))}
                </NavMenu>
                <RSLink to='form'>
                  <Button variant='contained' onClick={onToggleMenu}>
                    Заказать услугу
                  </Button>
                </RSLink>
              </>
            </MobileDrawer>
          )}
        </Nav>
        {!isMatch && (
          <RSLink to='form'>
            <Button variant='outlined'>Заказать услугу</Button>
          </RSLink>
        )}
      </NavContainer>
    </StyledHeader>
  )
}
