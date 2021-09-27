import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error } from '../styles'
import Modal from './Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Field from './Field'
import { toast } from 'react-toastify'

interface IAuthModal {
  isOpen: boolean
  onClose: () => void
}

interface IAuthInputs {
  email: string
  password: string
}

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Введите Ваш Email'),
  password: yup.string().required('Введите Ваш пароль').trim(),
})

const loginFormState = {
  email: '',
  password: '',
}

const AuthModal: React.FC<IAuthModal> = ({ isOpen, onClose }) => {
  const [loginError, setLoginError] = React.useState<string>('')

  const methods = useForm<IAuthInputs>({
    mode: 'onChange',
    defaultValues: loginFormState,
    resolver: yupResolver(LoginSchema),
  })

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful && loginError === '') {
      methods.reset(loginFormState)
    }
  }, [methods, loginError])

  const onSubmit: SubmitHandler<IAuthInputs> = async (formData) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        return r.json()
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message)
        }
        if (data && data.status) {
          onClose()
          toast.success(data.status)
        }
      })
      .catch((error) => {
        toast.error('Произошла ошибка :(')
        console.error(error)
      })
  }

  return (
    <Modal active={isOpen} onClose={onClose} title='Вход'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {loginError && <Error>{loginError}</Error>}
          <Field name='email' type='email' placeholder='Введите Email' />
          <Field name='password' type='password' placeholder='Введите пароль' />
          <Button float='right' variant='contained' disabled={methods.formState.isSubmitting} type='submit'>
            Войти
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default AuthModal
