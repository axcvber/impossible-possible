import React from 'react'
import styled from 'styled-components'
import { Container, HeadingTitle, P, Section } from '../styles'
import Svg from '../components/Svg'
import RSLink from '../components/RSLink'
const StyledAboutUs = styled(Section)`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    overflow: hidden;
    flex-direction: column;
  }
`

const AboutUsContent = styled.div`
  position: relative;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette?.bg.secondary};
  transition: background ${({ theme }) => theme.transition};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    max-width: 400px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    align-self: flex-end;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    max-width: 100%;
    align-self: center;
  }
`

const AboutUsImage = styled.div`
  width: 100%;
  max-width: 450px;
  margin-right: 80px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    max-width: 400px;
    margin-right: 60px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    max-width: 350px;
    margin-right: 0px;
    margin-bottom: 80px;
    align-self: flex-start;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`

const AboutUsText = styled(P)`
  color: ${({ theme }) => theme.palette?.text.primary};
  a {
    color: ${({ theme }) => theme.palette?.primary};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

const AboutUsBlob = styled.div`
  width: 700px;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  z-index: -1;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    width: 600px;
    top: 55%;
    left: 50%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    width: 500px;
    top: 55%;
    left: 50%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    display: none;
  }
`

const AboutUs = () => {
  return (
    <Container>
      <StyledAboutUs id='aboutUs'>
        <AboutUsImage>
          <Svg type='aboutUs' />
        </AboutUsImage>
        <AboutUsContent>
          <AboutUsBlob>
            <Svg type='blobAboutUs' />
          </AboutUsBlob>
          <HeadingTitle>О нас</HeadingTitle>
          <AboutUsText>
            <strong>&#34;Impossible - Possible&#34;</strong> - это сервис предоставляющий ряд услуг, которые помогут
            решить ваши задачи. Если у вас есть какие-нибудь вопросы Вы можете найти ответ в разделе{' '}
            <RSLink to='faq'>F.A.Q.</RSLink> или написать нам сообщение с помощью формы. Мы даем гарантию на товар, и в
            случае необходимости вернём вам деньги, больше услуг вы можете найти на нашем втором{' '}
            <a href='https://qavservice.com/' target='_blank' rel='noopener noreferrer'>
              сайте
            </a>
          </AboutUsText>
        </AboutUsContent>
      </StyledAboutUs>
    </Container>
  )
}

export default AboutUs
