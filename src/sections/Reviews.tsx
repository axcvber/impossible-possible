import React from 'react'
import styled from 'styled-components'
import { Button, Container, Error, H3, HeadingTitle, P, Section } from '../styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import UserAvatar from '../../public/user.svg'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import Svg from '../components/Svg'
import Textarea from '../components/Textarea'
import cookie from 'js-cookie'
import AuthModal from '../components/AuthModal'
import RegisterModal from '../components/RegisterModal'
import { toast } from 'react-toastify'
import UserWidger from '../components/UserWidger'
import { IReviews } from '../pages'
SwiperCore.use([Pagination])

const StyledReviews = styled(Section)`
  width: 100%;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    flex-direction: column;
    align-items: center;
  }
`

const ReviewContent = styled.div`
  max-width: 500px;
  width: 500px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    max-width: 400px;
    margin-right: 60px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    max-width: 500px;
    margin-right: 0px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    max-width: 100%;
  }
`

const StyledSwiper = styled(Swiper)`
  user-select: none;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.palette?.bg.secondary};
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  padding: 20px 20px 50px 20px;

  .reviewSlide {
    display: flex;
    justify-content: space-between;
  }

  .swiper-pagination {
    bottom: 20px;
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      margin: 0 5px;
    }
    .swiper-pagination-bullet-active {
      background: ${({ theme }) => theme.palette?.primary};
    }
  }
`

const ReviewBody = styled.div`
  width: 100%;
`

const ReviewAvatar = styled.div`
  margin-right: 20px;
  width: 60px;
  height: 60px;
  svg {
    width: 100%;
    height: 100%;
  }
`

const ReviewText = styled(P)`
  padding-bottom: 10px;
`

const ReviewName = styled.span`
  color: ${({ theme }) => theme.palette?.primary};
`

const ReviewsImage = styled.div`
  width: 100%;
  max-width: 500px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    margin-top: 40px;
  }
`

const ReviewsButton = styled(Button)`
  margin-top: 20px;
`

const AuthLink = styled.span`
  color: ${({ theme }) => theme.palette?.primary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export interface IReviewsInputs {
  review: string
}

export const ReviewsSchema = yup.object().shape({
  review: yup
    .string()
    .required('Введите Ваш Отзыв')
    .min(10, 'Введите Ваш Отзыв')
    .max(250, 'Максимум 250 символов')
    .trim(),
})

const Reviews: React.FC<IReviews> = ({ reviews }) => {
  const [isOpenModal, setOpenModal] = React.useState<'signIn' | 'signUp' | null>(null)
  const [reviewError, setReviewError] = React.useState('')
  const [isAuth, setAuth] = React.useState(false)
  const token = cookie.get('token')
  const [userData, setUserData] = React.useState({
    username: '',
    email: '',
  })

  React.useEffect(() => {
    fetch('/api/me', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.error) {
          console.log(data.error)
        }
        if (data && data.decoded) {
          setUserData(data.decoded)
          setAuth(true)
        }
      })
      .catch((error) => {
        toast.error('Произошла ошибка :(')
        console.log(error)
      })
  }, [token])

  const onLogout = () => {
    setAuth(false)
    cookie.remove('token')
  }

  const methods = useForm<IReviewsInputs>({
    mode: 'onChange',
    defaultValues: { review: '' },
    resolver: yupResolver(ReviewsSchema),
  })

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful && reviewError === '') {
      methods.reset({ review: '' })
    }
  }, [methods, reviewError])

  const onSubmit: SubmitHandler<IReviewsInputs> = async (formData) => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.error) {
          setReviewError(data.message)
        }
        if (data && data.status) {
          setReviewError('')
          toast.success(data.status)
        }
      })
      .catch((error) => {
        toast.error('Произошла ошибка :(')
        console.log(error)
      })
  }

  const onCloseModal = () => {
    setOpenModal(null)
  }

  return (
    <Container>
      <StyledReviews id='reviews'>
        <ReviewContent>
          <HeadingTitle mb='30'>Отзывы</HeadingTitle>
          <StyledSwiper
            autoHeight
            wrapperTag='ul'
            pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 5 }}
            spaceBetween={50}
          >
            {reviews.map((item, inx) => (
              <SwiperSlide key={`slide-${inx}`} className='reviewSlide' tag='li'>
                <ReviewAvatar>
                  <UserAvatar />
                </ReviewAvatar>
                <ReviewBody>
                  <ReviewText>{item.review}</ReviewText>
                  <ReviewName>{item.username}</ReviewName>
                </ReviewBody>
              </SwiperSlide>
            ))}
          </StyledSwiper>

          {isAuth && (
            <>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  {reviewError && <Error style={{ marginBottom: '15px' }}>{reviewError}</Error>}
                  <Textarea name='review' placeholder='Введите отзыв' />
                  <ReviewsButton variant='contained' disabled={methods.formState.isSubmitting} type='submit'>
                    Отправить
                  </ReviewsButton>
                </form>
              </FormProvider>
              <UserWidger username={userData.username} email={userData.email} logout={onLogout} />
            </>
          )}

          {!isAuth && (
            <H3>
              Чтобы оставить отзыв <AuthLink onClick={() => setOpenModal('signIn')}>войдите</AuthLink> или{' '}
              <AuthLink onClick={() => setOpenModal('signUp')}>зарегистрируйтесь</AuthLink>
            </H3>
          )}
          <AuthModal isOpen={isOpenModal === 'signIn'} onClose={onCloseModal} />
          <RegisterModal isOpen={isOpenModal === 'signUp'} onClose={onCloseModal} />
        </ReviewContent>
        <ReviewsImage>
          <Svg type='reviews' />
        </ReviewsImage>
      </StyledReviews>
    </Container>
  )
}

export default Reviews
