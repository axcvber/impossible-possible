import React from 'react'
import styled from 'styled-components'
import { Button, Container, H3, HeadingTitle, P, Section } from '../styles'
import MoneyIcon from '../../public/bank.svg'
import CodeIcon from '../../public/code.svg'
import CreditIcon from '../../public/credit.svg'
import PaintingIcon from '../../public/photoshop.svg'
import StatsIcon from '../../public/stats.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from 'swiper'
import RSLink from '../components/RSLink'
SwiperCore.use([EffectCoverflow, Pagination, Navigation])

const servicesData = [
  {
    icon: <CreditIcon />,
    title: 'МЕРЧАНТ ПОД ЛЮБЫЕ ВБИВЫ',
    text: 'Подберем для вас различные варианты и методы вбития CVV and VBV. [ Без верификации карты ] [ Любые страны ]',
  },
  {
    icon: <MoneyIcon />,
    title: 'ПРИЕМ / ОБНАЛ / РАЗНЫХ СРЕДСТВ С ВАШИМ ДОСТУПОМ',
    text: 'Наша услуга выглядит следующим образом, вы у нас берете аккаунт ( для приема $ ) в аренду ( с полной привязкой ) ЛИЧНЫЕ КАБИНЕТЫ БАНКОВ СТРАН СНГ',
  },
  {
    icon: <CodeIcon />,
    title: 'РАЗРАБОТКА САЙТОВ / СОФТА / БОТОВ',
    text: 'Создадим сайт любой сложности, используя современные технологии, проведем настройку SEO и выведем Ваш сайт в топ / Разрабатывем индивидуальный софт и ботов',
  },
  {
    icon: <PaintingIcon />,
    title: 'ФОТОШОП ( ВЫПИСКИ, СПРАВКИ, ЛОГО )',
    text: 'Cделаем любой подобный матириал для получения средств / Создадим уникальный логотип и многое другое что связано с PS',
  },
  {
    icon: <StatsIcon />,
    title: 'СОЗДАНИЕ МАГАЗИНА + ЛИЧНЫЙ HR-МЕНЕДЖЕР',
    text: 'Предоставим готовый сайт / бота на котором вы сразу же можете работать, по мимо этого наш специалист HR - менеджер будет предоставлять вам сотрудников и помогать вам по другим вопросам',
  },
]

const StyledServices = styled(Section)`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
  }
`
const ServicesContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledSwiper = styled(Swiper)`
  width: 100%;
  position: relative;
  padding: 60px 40px 80px 40px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    padding: 60px 0 80px 0;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    max-width: 350px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    padding: 30px 0 60px 0;
  }
  .servicesSlide {
    height: auto;
  }
  .swiper-pagination {
    .swiper-pagination-bullet {
      width: 40px;
      height: 5px;
      margin: 0 10px;
      border-radius: 0;
      background: gray;
    }
    .swiper-pagination-bullet-active {
      background: ${({ theme }) => theme.palette?.primary};
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.palette?.primary};
    @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
      display: none;
    }
  }
`

const CartButton = styled(Button)`
  margin-top: 20px;
  padding: 12px 30px;
`

const CardItem = styled.div`
  height: 100%;
  border: 2px solid ${({ theme }) => theme.palette?.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.palette?.bg.secondary};
  user-select: none;
  border-radius: 10px;
  transition: all ${({ theme }) => theme.transition};
  &:hover {
    @media screen and (min-width: ${({ theme }) => theme.breakpoints?.lg}) {
      transform: translateY(-20px);
      ${CartButton} {
        background-color: ${({ theme }) => theme.palette?.primary};
        color: #fff;
      }
    }
  }
`

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  svg {
    width: 100%;
    height: 100%;
  }
`

const Services = () => {
  return (
    <StyledServices id='services'>
      <ServicesContainer>
        <HeadingTitle>Наши Услуги</HeadingTitle>
        <StyledSwiper
          pagination={{ clickable: true }}
          navigation
          effect='coverflow'
          coverflowEffect={{
            rotate: 40,
            stretch: 20,
            depth: 1,
            slideShadows: false,
          }}
          wrapperTag='ul'
          loop
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            577: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            993: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1201: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {servicesData.map((item, inx) => (
            <SwiperSlide key={`slide-${inx}`} className='servicesSlide' tag='li'>
              <CardItem key={`card-${inx}`}>
                <CardIcon>{item.icon}</CardIcon>
                <H3 margin={'15px 0'}>{item.title}</H3>
                <P fz={15}>{item.text}</P>
                <RSLink to='form'>
                  <CartButton variant='outlined'>Заказать</CartButton>
                </RSLink>
              </CardItem>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </ServicesContainer>
    </StyledServices>
  )
}

export default Services
