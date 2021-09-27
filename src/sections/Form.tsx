import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Container, HeadingTitle, Section, Button } from '../styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Field from '../components/Field'
import { Select } from '../components/Select'
import Textarea from '../components/Textarea'
import Svg from '../components/Svg'
import { FormApi } from '../utils/form-api'
export interface ServicesOptions {
  value: string
  label: string
}

const servicesOptions: ServicesOptions[] = [
  {
    value: 'merchant',
    label: 'МЕРЧАНТ ПОД ЛЮБЫЕ ВБИВЫ',
  },
  {
    value: 'cashout',
    label: 'ПРИЕМ / ОБНАЛ / РАЗНЫХ СРЕДСТВ С ВАШИМ ДОСТУПОМ',
  },
  {
    value: 'software',
    label: 'РАЗРАБОТКА САЙТОВ / СОФТА / БОТОВ',
  },
  {
    value: 'photoshop',
    label: 'ФОТОШОП ( ВЫПИСКИ, СПРАВКИ, ЛОГО )',
  },
  {
    value: 'store',
    label: 'СОЗДАНИЕ МАГАЗИНА + ЛИЧНЫЙ HR-МЕНЕДЖЕР',
  },
]

const FormWrapper = styled(Section)`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  width: 350px;
  background-color: ${({ theme }) => theme.palette?.bg.secondary};
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0px 0px 8px 0px ${({ theme }) => theme.palette?.secondary};
  position: relative;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    max-width: 100%;
  }
`

const FormButton = styled(Button)`
  margin-top: 15px;
  float: right;
`

const FormImage = styled.div`
  width: 100%;
  max-width: 600px;
  margin-right: 60px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    max-width: 450px;
    margin-right: 20px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    align-self: flex-start;
    margin-bottom: 80px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.md}) {
    display: none;
  }
`

const FormContent = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.lg}) {
    flex-direction: column;
  }
`

const FormBlob = styled.div`
  width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.xl}) {
    width: 600px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    display: none;
  }
`

const FormTitle = styled(HeadingTitle)`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.md}) {
    text-align: center;
  }
`

export interface IFormInputs {
  telegram: string
  email: string
  name: string
  services: string
  message: string
}

const state = {
  telegram: '',
  email: '',
  name: '',
  services: '',
  message: '',
}

const FormSchema = yup.object().shape({
  telegram: yup
    .string()
    .required('Введите Ваш никнейм')
    .matches(/^[A-Za-z\d_]{5,32}$/, 'Некорректный никнейм'),
  email: yup.string().email('Некорректный email').required('Введите Ваш Email'),
  name: yup
    .string()
    .max(20, 'Максимум 20 символов')
    .required('Введите Ваше Имя')
    .matches(/^[a-zA-ZА-Яа-я\s]+$/, 'Введите корректное имя')
    .trim(),
  services: yup.string().required('Выбирите услугу'),
  message: yup.string().max(200, 'Максимум 200 символов').trim(),
})

const Form = () => {
  const methods = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: state,
    resolver: yupResolver(FormSchema),
  })

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset(state)
    }
  }, [methods])

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    await FormApi.sendForm(data)
  }

  return (
    <Container>
      <FormWrapper id='form'>
        <FormTitle mb='40'>Мы свяжемся с вами</FormTitle>
        <FormContent>
          <FormImage>
            <Svg type='form' />
          </FormImage>
          <FormProvider {...methods}>
            <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
              <FormBlob>
                <Svg type='blobForm' />
              </FormBlob>
              <Field name='telegram' placeholder='Телеграм' />
              <Field name='email' type='email' placeholder='E-mail' />
              <Field name='name' placeholder='Имя' />
              <Select name='services' options={servicesOptions} placeholder='Тип услуги' />
              <Textarea name='message' placeholder='Сообщение' />
              <FormButton variant='contained' disabled={methods.formState.isSubmitting} type='submit'>
                Отправить
              </FormButton>
            </StyledForm>
          </FormProvider>
        </FormContent>
      </FormWrapper>
    </Container>
  )
}

export default Form
