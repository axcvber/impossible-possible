import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Container, HeadingTitle, Section } from '../styles'
import DownArrowIcon from '../../public/down-arrow.svg'
import Svg from '../components/Svg'
import RSLink from '../components/RSLink'

const StyledHero = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    min-height: auto;
    flex-direction: column-reverse;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    padding-top: 70px;
  }
`
const HeroBlock = styled.div`
  max-width: 500px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    max-width: 100%;
  }
`
const HeroControl = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -15px;
`
const HeroButton = styled(Button)`
  margin-top: 15px;
  padding: 20px 30px;
  margin-right: 40px;
  text-transform: uppercase;
  border-radius: 5px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    padding: 10px 20px;
    margin-right: 20px;
  }
`
const HeroLinkWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.palette?.primary};
    position: relative;
    padding-bottom: 2px;
    &:after {
      content: '';
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.palette?.primary};
      position: absolute;
      bottom: -5px;
      left: 0;
      opacity: 0;
      transition: all ${({ theme }) => theme.transition};
      z-index: -1;
    }
    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
`
const ArrowLink = styled.div`
  position: relative;
  width: 30px;
  margin-left: 15px;
  div {
    position: absolute;
    width: 35px;
    height: 2px;
    background-color: ${({ theme }) => theme.palette?.primary};
    left: 0;
    display: block;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
      width: 20px;
    }
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 12px;
      height: 2px;
      background-color: ${({ theme }) => theme.palette?.primary};
    }
    &:after {
      top: -4px;
      right: -3px;
      transform: rotate(45deg);
      @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
        width: 10px;
        top: -3px;
        right: -3.5px;
      }
    }
    &:before {
      top: 4px;
      right: -3px;
      transform: rotate(-45deg);
      @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
        width: 10px;
        top: 3px;
        right: -3.5px;
      }
    }
  }
`
const HeroImage = styled.div`
  width: 100%;
  min-width: 500px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    min-width: 100%;
    margin-bottom: 20px;
  }
`
const animateDropDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(0);
  }
`
const DownArrow = styled.div`
  animation: ${animateDropDown} 2.5s linear infinite;
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  svg {
    fill: ${({ theme }) => theme.palette?.primary};
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    display: none;
  }
`

const Hero = () => {
  return (
    <Container id='home'>
      <StyledHero>
        <HeroBlock>
          <HeadingTitle mb='20' size='lg'>
            ПРИЕМ РАЗНЫХ СРЕДСТВ С ВАШИМ ДОСТУПОМ
          </HeadingTitle>
          <HeroControl>
            <HeroButton variant='contained'>
              <RSLink to='aboutUs'>Подробнее</RSLink>
            </HeroButton>
            <HeroLinkWrap>
              <RSLink to='services'>Смотреть все услуги</RSLink>
              <ArrowLink>
                <div />
              </ArrowLink>
            </HeroLinkWrap>
          </HeroControl>
        </HeroBlock>
        <HeroImage>
          <Svg type='hero' />
        </HeroImage>
        <DownArrow>
          <DownArrowIcon />
        </DownArrow>
      </StyledHero>
    </Container>
  )
}

export default Hero
