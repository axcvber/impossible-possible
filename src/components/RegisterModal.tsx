import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error } from '../styles'
import Modal from './Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Field from './Field'
import { toast } from 'react-toastify'

interface IRegisterModal {
  isOpen: boolean
  onClose: () => void
}

interface IRegisterInputs {
  username: string
  email: string
  password: string
}

export const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .max(20, 'Максимум 20 символов')
    .required('Введите Ваше Имя')
    .matches(/^[a-zA-ZА-Яа-я\s]+$/, 'Введите корректное имя')
    .trim(),
  email: yup.string().email('Некорректный email').required('Введите Ваш Email'),
  password: yup
    .string()
    .required('Введите Ваш пароль')
    .min(8, 'Пароль слишком короткий')
    .max(25, 'Максимум 25 символов')
    .trim(),
})

const registerFormState = {
  username: '',
  email: '',
  password: '',
}

const RegisterModal: React.FC<IRegisterModal> = ({ isOpen, onClose }) => {
  const [signupError, setSignupError] = React.useState<string>('')
  const methods = useForm<IRegisterInputs>({
    mode: 'onChange',
    defaultValues: registerFormState,
    resolver: yupResolver(RegisterSchema),
  })

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful && signupError === '') {
      methods.reset(registerFormState)
    }
  }, [methods, signupError])

  const onSubmit: SubmitHandler<IRegisterInputs> = async (formData) => {
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message)
        }
        if (data && data.status) {
          onClose()
          toast.warn(data.status, { position: 'top-center' })
        }
      })
      .catch((error) => {
        toast.error('Произошла ошибка :(')
        console.error(error)
      })
  }

  return (
    <Modal active={isOpen} onClose={onClose} title='Регистрация'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {signupError && <Error>{signupError}</Error>}
          <Field name='username' placeholder='Введите Имя' />
          <Field name='email' type='email' placeholder='Введите Email' />
          <Field name='password' type='password' placeholder='Придумайте пароль' />
          <Button float='right' variant='contained' disabled={methods.formState.isSubmitting} type='submit'>
            Зарегистрироваться
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default RegisterModal
