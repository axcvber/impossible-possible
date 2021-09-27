import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints?.xl};
  margin: 0 auto;
  padding: 0 15px;
  @media (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    max-width: 960px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    max-width: 720px;
  }
  @media (max-width: (max-width: ${({ theme }) => theme.breakpoints?.md})) {
    max-width: 540px;
  }
  @media (max-width: (max-width: ${({ theme }) => theme.breakpoints?.sm})) {
    max-width: 100%;
  }
`

export const Section = styled.section`
  width: 100%;
  min-height: calc(100vh - 65px);
  padding: 70px 0;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    min-height: auto;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    padding: 40px 0;
  }
`

export const Button = styled.button<{ variant: 'outlined' | 'contained'; float?: 'right' }>`
  font-family: ${({ theme }) => theme.fonts?.primary};
  outline: none;
  float: ${({ float }) => float === 'right' && 'right'};
  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.palette?.primary};
      color: ${({ theme }) => theme.palette?.primary};
      &:hover {
        background-color: ${({ theme }) => theme.palette?.primary};
        color: #fff;
      }
    `};

  ${({ variant }) =>
    variant === 'contained' &&
    css`
      border: 2px solid transparent;
      background-color: ${({ theme }) => theme.palette?.primary};
      color: #fff;
      &:hover {
        background-color: transparent;
        color: ${({ theme }) => theme.palette?.primary};
        border-color: ${({ theme }) => theme.palette?.primary};
      }
    `};
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 18px;
  cursor: pointer;
  border-radius: 50px;
  transition: all ${({ theme }) => theme.transition};
  &:disabled {
    opacity: 0.6;
  }
`

export const H3 = styled.h3<{ fz?: number; margin?: string; padding?: string }>`
  color: ${({ theme }) => theme.palette?.text.primary};
  line-height: 1.2;
  font-size: 18px;
  font-size: ${({ fz }) => fz + 'px'};
  text-transform: uppercase;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`

export const P = styled.p<{ fz?: number; margin?: string; padding?: string }>`
  font-size: ${({ fz }) => fz + 'px'};
  line-height: 1.5;
  color: ${({ theme }) => theme.palette?.text.secondary};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`

export const HeadingTitle = styled.h1<{ mb?: string; size?: 'lg' }>`
  display: inline-block;
  line-height: 1.4;
  color: ${({ theme }) => theme.palette?.text.primary};
  font-size: 42px;
  @media screen and (max-width: ${(props) => props.theme.breakpoints?.sm}) {
    font-size: 32px;
  }
  ${({ size }) =>
    size === 'lg' &&
    css`
      font-size: 52px;
      @media screen and (max-width: ${(props) => props.theme.breakpoints?.lg}) {
        font-size: 42px;
      }
      @media screen and (max-width: ${(props) => props.theme.breakpoints?.sm}) {
        font-size: 32px;
      }
    `}
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts?.primary};
  font-weight: 700;
  margin-bottom: ${({ mb }) => mb + 'px'};
`
export const Error = styled.span`
  color: ${({ theme }) => theme.palette?.error};
  display: block;
  font-size: 12px;
  margin-top: 10px;
  margin-left: 5px;
`
export const Arrow = styled.div<{ isOpen: boolean }>`
  position: relative;
  height: 10px;
  width: 10px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1.5px;
    height: 100%;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
  }
  &::before {
    left: -3.2px;
    transform: rotate(-45deg);
    background-color: ${({ theme }) => theme.palette?.text.primary};
    ${({ isOpen }) =>
      isOpen &&
      css`
        left: -3.2px;
        transform: rotate(45deg);
      `}
  }
  &::after {
    left: 3.2px;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.palette?.text.primary};
    ${({ isOpen }) =>
      isOpen &&
      css`
        left: 3.2px;
        transform: rotate(-45deg);
      `}
  }
`
